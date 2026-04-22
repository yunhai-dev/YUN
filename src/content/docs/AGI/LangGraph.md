---
title: "LangGraph 核心概念笔记"
description: "整理 LangGraph 的状态流转、节点编排与多智能体工作流等核心概念"
keywords: ["LangGraph", "状态管理", "工作流", "多智能体", "LangChain", "节点编排", "AI 应用"]
---

LangGraph 是构建长期运行、有状态智能体的低级编排框架。它专注于**编排**能力：持久化执行、流式输出、人机协作等，不抽象提示词或架构设计。

详细内容参考：[LangGraph](https://docs.langchain.com/oss/python/langgraph)

## 准备工作

```bash
pip install -U langgraph
```

## 核心优势

| 能力        | 说明                   |
|-----------|----------------------|
| **持久化执行** | 智能体可跨故障恢复，支持长时间运行    |
| **人机协作**  | 任意节点暂停，人工审查、编辑后继续    |
| **状态管理**  | 短期记忆（对话内）+ 长期记忆（跨对话） |
| **流式输出**  | 实时返回中间步骤、Token、自定义数据 |
| **时间旅行**  | 回溯历史状态，调试与分支执行       |

## 最简示例

```python
from langgraph.graph import StateGraph, MessagesState, START, END

def mock_llm(state: MessagesState):
    return {"messages": [{"role": "ai", "content": "hello world"}]}

graph = StateGraph(MessagesState)
graph.add_node(mock_llm)
graph.add_edge(START, "mock_llm")
graph.add_edge("mock_llm", END)
graph = graph.compile()

graph.invoke({"messages": [{"role": "user", "content": "hi!"}]})
```

---

## Graph API 详解

LangGraph 将智能体工作流建模为**图**，由三个核心组件构成：

### 1. State（状态）

状态是图执行过程中共享的数据快照。所有节点读取和更新同一状态。

```python
from typing import Annotated
from typing_extensions import TypedDict
from operator import add

class State(TypedDict):
    foo: str                              # 普通字段，更新时覆盖
    bar: Annotated[list[str], add]        # 带 reducer，更新时追加
```

**Reducer 机制：**

- 无 reducer：新值覆盖旧值
- 有 reducer（如 `operator.add`）：新值与旧值合并

**内置消息状态：**

```python
from langgraph.graph import MessagesState

class State(MessagesState):
    documents: list[str]  # 扩展额外字段
```

`MessagesState` 自带 `messages: list[AnyMessage]` 字段，使用 `add_messages` reducer 自动处理消息追加和更新。

### 2. Nodes（节点）

节点是执行逻辑的 Python 函数，接收状态并返回状态更新：

```python
from langgraph.graph import StateGraph
from langgraph.runtime import Runtime
from langchain_core.runnables import RunnableConfig
from dataclasses import dataclass

class State(TypedDict):
    input: str
    results: str

@dataclass
class Context:
    user_id: str

builder = StateGraph(State)

# 基础节点：只接收 state
def plain_node(state: State):
    return {"results": f"处理: {state['input']}"}

# 带运行时上下文的节点
def node_with_runtime(state: State, runtime: Runtime[Context]):
    print(f"用户: {runtime.context.user_id}")
    return {"results": f"Hello, {state['input']}!"}

# 带配置的节点
def node_with_config(state: State, config: RunnableConfig):
    thread_id = config["configurable"]["thread_id"]
    return {"results": f"Thread: {thread_id}"}

builder.add_node("plain_node", plain_node)
builder.add_node("node_with_runtime", node_with_runtime)
builder.add_node("node_with_config", node_with_config)
```

**特殊节点：**

- `START`：图的入口点
- `END`：图的终止点

### 3. Edges（边）

边定义节点之间的执行流程：

**普通边**（固定流转）：

```python
from langgraph.graph import START, END

graph.add_edge(START, "node_a")
graph.add_edge("node_a", "node_b")
graph.add_edge("node_b", END)
```

**条件边**（动态路由）：

```python
from typing import Literal

def should_continue(state: State) -> Literal["tool_node", "__end__"]:
    if state["messages"][-1].tool_calls:
        return "tool_node"
    return "__end__"

graph.add_conditional_edges("llm_call", should_continue)
```

### 4. Command（命令）

`Command` 允许在单个节点中同时更新状态和控制流：

```python
from langgraph.types import Command

def my_node(state: State) -> Command[Literal["next_node"]]:
    return Command(
        update={"foo": "bar"},      # 状态更新
        goto="next_node"            # 控制流
    )
```

**适用场景：**

- 多智能体切换（handoff）
- 条件路由 + 状态更新
- 子图导航到父图节点

### 5. 编译图

```python
from langgraph.checkpoint.memory import InMemorySaver

checkpointer = InMemorySaver()
graph = builder.compile(
    checkpointer=checkpointer,           # 启用持久化
    interrupt_before=["human_review"],   # 调试断点
)
```

---

## 持久化（Persistence）

持久化通过 **Checkpointer** 实现，在每个超级步骤（super-step）保存图状态快照。

### Thread（线程）

线程是检查点的逻辑分组，用 `thread_id` 标识：

```python
config = {"configurable": {"thread_id": "user-001"}}
graph.invoke({"messages": [...]}, config)
```

同一 `thread_id` = 同一对话线程，保持上下文连续。

### Checkpointer 实现

| 实现              | 用途       |
|-----------------|----------|
| `InMemorySaver` | 开发测试（内存） |
| `SqliteSaver`   | 本地持久化    |
| `PostgresSaver` | 生产环境     |

```python
# 生产环境示例
from langgraph.checkpoint.postgres import PostgresSaver

with PostgresSaver.from_conn_string("postgresql://...") as checkpointer:
    checkpointer.setup()  # 创建表
    graph = builder.compile(checkpointer=checkpointer)
```

### 状态操作

**获取当前状态：**

```python
state = graph.get_state(config)
print(state.values)  # 当前状态值
print(state.next)    # 下一步要执行的节点
```

**获取历史状态：**

```python
for state in graph.get_state_history(config):
    print(f"Step {state.metadata['step']}: {state.values}")
```

**更新状态：**

```python
graph.update_state(
    config,
    values={"foo": "new_value"},
    as_node="node_a"  # 模拟从哪个节点更新
)
```

**时间旅行（回放）：**

```python
# 从特定检查点恢复执行
config = {
    "configurable": {
        "thread_id": "1",
        "checkpoint_id": "abc123"
    }
}
graph.invoke(None, config=config)
```

### Memory Store（长期记忆）

Checkpointer 保存线程内状态，Store 保存**跨线程**数据：

```python
from langgraph.store.memory import InMemoryStore

store = InMemoryStore()

# 保存记忆（按命名空间组织）
namespace = (user_id, "memories")
store.put(namespace, memory_id, {"preference": "喜欢简洁回答"})

# 搜索记忆
memories = store.search(namespace)

# 语义搜索（需配置 embedding）
store = InMemoryStore(
    index={
        "embed": init_embeddings("openai:text-embedding-3-small"),
        "dims": 1536,
        "fields": ["$"]
    }
)
memories = store.search(namespace, query="用户喜欢什么", limit=3)
```

在图中使用：

```python
def call_model(state, config, *, store):
    user_id = config["configurable"]["user_id"]
    memories = store.search((user_id, "memories"), query=state["messages"][-1].content)
    # 将记忆注入提示词...
```

---

## 中断（Interrupts）

中断允许暂停图执行，等待外部输入后继续。这是实现**人机协作**的核心机制。

### 基本用法

```python
from langgraph.types import interrupt, Command

def approval_node(state: State):
    # 暂停执行，返回问题给调用者
    approved = interrupt("是否批准此操作？")
    # resume 的值成为 interrupt() 的返回值
    return {"approved": approved}

# 初次调用 - 遇到 interrupt 暂停
config = {"configurable": {"thread_id": "thread-1"}}
result = graph.invoke({"input": "data"}, config=config)
print(result["__interrupt__"])  # [Interrupt(value='是否批准此操作？')]

# 恢复执行 - 传入用户响应
graph.invoke(Command(resume=True), config=config)
```

### 常见模式

**审批流程：**

```python
def approval_node(state: State) -> Command[Literal["proceed", "cancel"]]:
    is_approved = interrupt({
        "question": "是否继续执行？",
        "details": state["action_details"]
    })
    if is_approved:
        return Command(goto="proceed")
    else:
        return Command(goto="cancel")
```

**审查编辑：**

```python
def review_node(state: State):
    edited = interrupt({
        "instruction": "请审查并编辑内容",
        "content": state["generated_text"]
    })
    return {"generated_text": edited}
```

**工具内中断：**

```python
@tool
def send_email(to: str, subject: str, body: str):
    """发送邮件"""
    response = interrupt({
        "action": "send_email",
        "to": to,
        "subject": subject,
        "body": body,
        "message": "确认发送此邮件？"
    })
    if response.get("action") == "approve":
        return f"邮件已发送至 {response.get('to', to)}"
    return "邮件已取消"
```

### 中断规则

1. **不要用 try/except 包裹 interrupt**（它通过异常实现暂停）
2. **保持 interrupt 调用顺序一致**（恢复时按索引匹配）
3. **只传递 JSON 可序列化值**
4. **interrupt 前的代码会重复执行**（确保幂等性）

---

## 流式输出（Streaming）

### 流式模式

| 模式         | 说明                         |
|------------|----------------------------|
| `updates`  | 每个节点执行后输出状态更新              |
| `messages` | 流式 LLM token               |
| `custom`   | 通过 `stream_writer` 输出自定义数据 |

**节点更新流：**

```python
for chunk in graph.stream(
    {"messages": [{"role": "user", "content": "你好"}]},
    stream_mode="updates"
):
    for node, data in chunk.items():
        print(f"节点: {node}, 输出: {data}")
```

**LLM Token 流：**

```python
for token, metadata in graph.stream(
    {"messages": [...]},
    stream_mode="messages"
):
    if token.text:
        print(token.text, end="", flush=True)
```

**自定义流：**

```python
from langgraph.config import get_stream_writer

@tool
def process_data(query: str) -> str:
    writer = get_stream_writer()
    writer("开始处理...")
    writer(f"处理: {query}")
    writer("完成!")
    return f"结果: {query}"

for chunk in graph.stream(..., stream_mode="custom"):
    print(chunk)
```

**多模式组合：**

```python
for mode, chunk in graph.stream(..., stream_mode=["updates", "messages"]):
    if mode == "updates":
        print(f"[节点更新] {chunk}")
    elif mode == "messages":
        token, meta = chunk
        print(f"[Token] {token.text}")
```

---

## 运行时配置

### Context（上下文）

传递不属于状态但节点需要的信息：

```python
from dataclasses import dataclass

@dataclass
class Context:
    llm_provider: str = "openai"
    user_role: str = "user"

builder = StateGraph(State, context_schema=Context)

# 调用时传入
graph.invoke(inputs, context=Context(llm_provider="anthropic"))
```

### Recursion Limit（递归限制）

防止图无限循环：

```python
# 默认 25 步
graph.invoke(inputs, config={"recursion_limit": 10})
```

**主动处理递归：**

```python
from langgraph.managed import RemainingSteps

class State(TypedDict):
    messages: list
    remaining_steps: RemainingSteps  # 自动追踪剩余步数

def agent_node(state: State):
    if state["remaining_steps"] <= 2:
        return {"messages": ["接近限制，返回部分结果"]}
    # 正常处理...
```

---

## 子图（Subgraphs）

将复杂逻辑拆分为独立子图：

```python
# 定义子图
subgraph_builder = StateGraph(SubState)
# ... 添加节点和边
subgraph = subgraph_builder.compile()

# 在父图中使用
parent_builder = StateGraph(ParentState)
parent_builder.add_node("sub_agent", subgraph)
```

**从子图导航到父图：**

```python
def subgraph_node(state: State) -> Command[Literal["other_agent"]]:
    return Command(
        update={"result": "done"},
        goto="other_agent",
        graph=Command.PARENT  # 导航到父图
    )
```

---

## 完整示例：计算器智能体

```python
from langchain.tools import tool
from langchain.chat_models import init_chat_model
from langchain.messages import SystemMessage, HumanMessage, ToolMessage
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import InMemorySaver
from typing import Annotated, Literal
from typing_extensions import TypedDict
import operator

# 1. 定义工具
@tool
def add(a: int, b: int) -> int:
    """加法"""
    return a + b

@tool
def multiply(a: int, b: int) -> int:
    """乘法"""
    return a * b

# 2. 初始化模型
model = init_chat_model("claude-sonnet-4-5-20250929", temperature=0)
tools = [add, multiply]
tools_by_name = {t.name: t for t in tools}
model_with_tools = model.bind_tools(tools)

# 3. 定义状态
class State(TypedDict):
    messages: Annotated[list, operator.add]
    llm_calls: int

# 4. 定义节点
def llm_node(state: State):
    response = model_with_tools.invoke([
        SystemMessage("你是数学助手，使用工具执行计算。")
    ] + state["messages"])
    return {
        "messages": [response],
        "llm_calls": state.get("llm_calls", 0) + 1
    }

def tool_node(state: State):
    results = []
    for tool_call in state["messages"][-1].tool_calls:
        tool = tools_by_name[tool_call["name"]]
        result = tool.invoke(tool_call["args"])
        results.append(ToolMessage(content=str(result), tool_call_id=tool_call["id"]))
    return {"messages": results}

# 5. 定义路由
def should_continue(state: State) -> Literal["tool_node", "__end__"]:
    if state["messages"][-1].tool_calls:
        return "tool_node"
    return "__end__"

# 6. 构建图
builder = StateGraph(State)
builder.add_node("llm", llm_node)
builder.add_node("tool_node", tool_node)
builder.add_edge(START, "llm")
builder.add_conditional_edges("llm", should_continue)
builder.add_edge("tool_node", "llm")

# 7. 编译（启用持久化）
graph = builder.compile(checkpointer=InMemorySaver())

# 8. 运行
config = {"configurable": {"thread_id": "calc-001"}}
result = graph.invoke(
    {"messages": [HumanMessage("计算 3 + 4，然后乘以 2")]},
    config
)
print(result["messages"][-1].content)
```

---

## 延伸阅读

- [Functional API](https://docs.langchain.com/oss/python/langgraph/functional-api) - 函数式 API（单函数定义智能体）
- [Durable Execution](https://docs.langchain.com/oss/python/langgraph/durable-execution) - 持久化执行详解
- [Time Travel](https://docs.langchain.com/oss/python/langgraph/use-time-travel) - 时间旅行调试
- [LangSmith Studio](https://docs.langchain.com/oss/python/langgraph/studio) - 可视化调试工具
- [LangSmith Deployment](https://docs.langchain.com/oss/python/langgraph/deploy) - 生产部署
