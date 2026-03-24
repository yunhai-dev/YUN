---
title: "LangChain 快速入门"
description: "全面掌握 LangChain 核心组件，构建生产级 AI 智能体"
keywords: ["LangChain", "AI智能体", "LLM应用开发", "RAG", "Python AI框架", "大模型集成"]
---

LangChain 是构建 LLM 应用的主流框架，让你能快速将大模型能力集成到应用中。LangGraph 作为 Agent 运行时，提供状态管理、持久化和流式输出等高级功能。

详细内容参考：[LangChain](https://docs.langchain.com/oss/python/langchain)

## 准备工作

```bash
pip install langchain langgraph
export OPENAI_API_KEY="your-api-key"      # OpenAI
export ANTHROPIC_API_KEY="your-api-key"   # Anthropic Claude
export GOOGLE_API_KEY="your-api-key"      # Google Gemini
```

## 核心概念速览

| 概念                    | 作用                                       |
|-----------------------|------------------------------------------|
| **Agent**             | 自主决策、调用工具完成任务的智能体                        |
| **Model**             | 执行推理的大语言模型（支持 OpenAI/Anthropic/Google 等） |
| **Tools**             | 让模型调用外部函数/API 的接口                        |
| **Messages**          | 对话上下文的载体，包含角色、内容、元数据                     |
| **Memory**            | 保持对话上下文，实现多轮交互                           |
| **Streaming**         | 实时输出，提升用户体验                              |
| **Structured Output** | 让模型返回结构化数据                               |

## 最简示例

```python
from langchain.agents import create_agent
from langchain.tools import tool

@tool
def search(query: str) -> str:
    """搜索信息"""
    return f"关于 {query} 的搜索结果..."

agent = create_agent(
    model="claude-sonnet-4-5-20250929",
    tools=[search],
    system_prompt="你是一个智能助手"
)

result = agent.invoke({"messages": [{"role": "user", "content": "帮我搜索 LangChain"}]})
print(result["messages"][-1].content)
```

## 进阶：带记忆的智能体

实际场景中，智能体通常需要：工具调用、上下文感知、结构化输出、对话记忆。

```python
from dataclasses import dataclass
from langchain.agents import create_agent
from langchain.chat_models import init_chat_model
from langchain.tools import tool, ToolRuntime
from langgraph.checkpoint.memory import InMemorySaver

# 1. 定义上下文（可携带用户信息等运行时数据）
@dataclass
class Context:
    user_id: str

# 2. 定义工具
@tool
def get_weather(city: str) -> str:
    """查询城市天气"""
    return f"{city}：晴，25°C"

@tool
def get_location(runtime: ToolRuntime[Context]) -> str:
    """根据用户 ID 获取位置"""
    locations = {"001": "深圳", "002": "北京"}
    return locations.get(runtime.context.user_id, "未知")

# 3. 定义结构化输出
@dataclass
class WeatherResponse:
    summary: str           # 天气摘要
    suggestion: str | None # 出行建议

# 4. 组装智能体
agent = create_agent(
    model=init_chat_model("claude-sonnet-4-5-20250929", temperature=0),
    tools=[get_weather, get_location],
    system_prompt="你是天气助手，回答要简洁实用",
    context_schema=Context,
    response_format=WeatherResponse,  # 结构化输出
    checkpointer=InMemorySaver()      # 对话记忆
)

# 5. 运行
response = agent.invoke(
    {"messages": [{"role": "user", "content": "我这里天气怎么样？"}]},
    config={"configurable": {"thread_id": "chat-001"}},
    context=Context(user_id="001")
)
print(response["structured_response"])
# WeatherResponse(summary="深圳：晴，25°C", suggestion="适合户外活动")
```

**关键点：**

- `@tool` 装饰器自动提取函数签名作为工具描述
- `ToolRuntime` 可注入运行时上下文（state、context、store 等）
- `thread_id` 标识对话，实现多轮记忆
- 生产环境建议用 `PostgresSaver` 替代 `InMemorySaver`

---

## 核心组件详解

### 1. Agents（智能体）

智能体将模型与工具结合，能推理任务、选择工具、迭代执行直到完成目标。运行流程遵循 **ReAct 模式**：

```
输入 → 模型推理 → [调用工具 → 观察结果 → 继续推理]* → 输出答案
```

#### 创建智能体

```python
from langchain.agents import create_agent

# 方式1：模型标识符（自动推断 provider）
agent = create_agent("gpt-4o", tools=[search, calculator])

# 方式2：provider:model 格式
agent = create_agent("anthropic:claude-sonnet-4-5-20250929", tools=tools)

# 方式3：模型实例（更多控制）
from langchain.chat_models import init_chat_model
model = init_chat_model("gpt-4o", temperature=0.1, max_tokens=1000)
agent = create_agent(model, tools=tools)
```

#### 系统提示词

**静态提示词：**

```python
agent = create_agent(
    model,
    tools,
    system_prompt="你是一个专业助手，回答要简洁准确。"
)
```

**动态提示词**（根据运行时上下文调整）：

```python
from langchain.agents.middleware import dynamic_prompt, ModelRequest

@dynamic_prompt
def role_based_prompt(request: ModelRequest) -> str:
    role = request.runtime.context.get("user_role", "user")
    if role == "expert":
        return "提供详细技术响应，包含代码示例。"
    return "用简单易懂的语言解释。"

agent = create_agent(model, tools, middleware=[role_based_prompt])
```

#### 调用智能体

```python
# 单次调用
result = agent.invoke(
    {"messages": [{"role": "user", "content": "深圳天气如何？"}]}
)
print(result["messages"][-1].content)

# 带配置调用（thread_id 用于记忆）
result = agent.invoke(
    {"messages": [...]},
    config={"configurable": {"thread_id": "user-001"}}
)

# 流式调用（显示中间步骤）
for chunk in agent.stream(
    {"messages": [{"role": "user", "content": "搜索 AI 新闻并总结"}]},
    stream_mode="updates"
):
    for step, data in chunk.items():
        print(f"步骤: {step}, 内容: {data['messages'][-1].content_blocks}")
```

---

### 2. Models（模型）

模型是智能体的推理引擎。LangChain 提供统一接口支持多个 provider。

#### 初始化模型

```python
from langchain.chat_models import init_chat_model

# 各 provider 示例
model = init_chat_model("gpt-4o")                           # OpenAI
model = init_chat_model("anthropic:claude-sonnet-4-5-20250929")  # Anthropic
model = init_chat_model("google_genai:gemini-2.5-flash")    # Google
model = init_chat_model("azure_openai:gpt-4o")              # Azure OpenAI
model = init_chat_model("bedrock:anthropic.claude-3-sonnet")# AWS Bedrock
```

#### 关键参数

| 参数            | 说明                   | 示例         |
|---------------|----------------------|------------|
| `model`       | 模型名称                 | `"gpt-4o"` |
| `api_key`     | API 密钥（可选，默认从环境变量读取） | `"sk-..."` |
| `temperature` | 输出随机性 (0-1)          | `0.7`      |
| `max_tokens`  | 最大响应 token 数         | `4096`     |
| `timeout`     | 超时秒数                 | `30`       |
| `max_retries` | 最大重试次数               | `3`        |

#### 调用方法

```python
# 单次调用
response = model.invoke("你好")
print(response.content)  # 文本内容

# 流式调用
for chunk in model.stream("讲一个故事"):
    print(chunk.text, end="", flush=True)

# 批量调用
responses = model.batch(["问题1", "问题2", "问题3"])
```

#### 工具绑定

```python
def get_weather(location: str) -> str:
    """获取天气信息"""
    return f"{location}: 晴天，25°C"

# 绑定工具
model_with_tools = model.bind_tools([get_weather])
response = model_with_tools.invoke("北京天气如何？")

# 并行工具调用
response = model_with_tools.invoke("北京和上海天气分别怎样？")
for tool_call in response.tool_calls:
    print(f"工具: {tool_call['name']}, 参数: {tool_call['args']}")
```

#### 高级功能

**多模态输入：**

```python
message = {
    "role": "user",
    "content": [
        {"type": "text", "text": "描述这张图片"},
        {"type": "image", "url": "https://example.com/image.jpg"}
        # 也支持 base64: {"type": "image", "base64": "...", "mime_type": "image/jpeg"}
    ]
}
response = model.invoke([message])
```

**本地模型（Ollama）：**

```python
from langchain_ollama import ChatOllama
model = ChatOllama(model="llama3.2")
```

---

### 3. Messages（消息）

消息是模型交互的基本单位，包含角色、内容、元数据。

#### 消息类型

| 类型              | 用途     | 示例      |
|-----------------|--------|---------|
| `SystemMessage` | 设定模型行为 | 系统指令、人设 |
| `HumanMessage`  | 用户输入   | 问题、指令   |
| `AIMessage`     | 模型响应   | 回答、工具调用 |
| `ToolMessage`   | 工具执行结果 | 函数返回值   |

#### 基本用法

```python
from langchain.messages import SystemMessage, HumanMessage, AIMessage

messages = [
    SystemMessage("你是翻译助手，将英文翻译成中文"),
    HumanMessage("Hello, world!"),
]
response = model.invoke(messages)  # 返回 AIMessage
```

**字典格式（OpenAI 兼容）：**

```python
messages = [
    {"role": "system", "content": "你是翻译助手"},
    {"role": "user", "content": "Hello, world!"},
    {"role": "assistant", "content": "你好，世界！"}
]
response = model.invoke(messages)
```

#### AIMessage 属性

```python
response = model.invoke("你好")

# 基本属性
response.content        # 文本内容
response.text           # 纯文本（content_blocks 的文本部分）
response.tool_calls     # 工具调用列表
response.content_blocks # 标准化内容块列表

# 元数据
response.usage_metadata  # Token 使用量
# {'input_tokens': 10, 'output_tokens': 50, 'total_tokens': 60}

response.response_metadata  # Provider 特定元数据
```

#### 多模态内容

```python
# 图片输入
message = HumanMessage(content=[
    {"type": "text", "text": "这张图片里有什么？"},
    {"type": "image", "url": "https://example.com/photo.jpg"}
])

# PDF 文档输入（部分模型支持）
message = HumanMessage(content=[
    {"type": "text", "text": "总结这份文档"},
    {"type": "file", "url": "https://example.com/doc.pdf", "mime_type": "application/pdf"}
])

# 音频输入
message = HumanMessage(content=[
    {"type": "text", "text": "转录这段音频"},
    {"type": "audio", "base64": "...", "mime_type": "audio/wav"}
])
```

#### 流式消息

```python
chunks = []
full_message = None
for chunk in model.stream("你好"):
    chunks.append(chunk)
    full_message = chunk if full_message is None else full_message + chunk
    print(chunk.text, end="")

# 聚合后获得完整消息
print(full_message.content)
```

---

### 4. Tools（工具）

工具让智能体能执行外部操作：API 调用、数据库查询、代码执行等。

#### 基本定义

```python
from langchain.tools import tool

@tool
def search_database(query: str, limit: int = 10) -> str:
    """搜索客户数据库中匹配的记录。
    
    Args:
        query: 搜索关键词
        limit: 最大返回条数
    """
    return f"找到 {limit} 条关于 '{query}' 的记录"

# 类型提示是必需的，docstring 会成为工具描述
```

#### 自定义工具属性

```python
# 自定义工具名
@tool("web_search")
def search(query: str) -> str:
    """搜索网页信息"""
    return f"Results for: {query}"

# 自定义工具描述
@tool("calculator", description="执行数学计算。用于解决任何数学问题。")
def calc(expression: str) -> str:
    """计算数学表达式"""
    return str(eval(expression))
```

#### 高级 Schema（Pydantic）

```python
from pydantic import BaseModel, Field
from typing import Literal

class WeatherInput(BaseModel):
    """天气查询参数"""
    location: str = Field(description="城市名称或坐标")
    units: Literal["celsius", "fahrenheit"] = Field(
        default="celsius",
        description="温度单位"
    )
    include_forecast: bool = Field(
        default=False,
        description="是否包含 5 日预报"
    )

@tool(args_schema=WeatherInput)
def get_weather(location: str, units: str = "celsius", include_forecast: bool = False) -> str:
    """获取当前天气和可选预报"""
    temp = 22 if units == "celsius" else 72
    result = f"{location}: {temp}°{units[0].upper()}"
    if include_forecast:
        result += "\n未来5天: 晴朗"
    return result
```

#### 访问运行时上下文

工具可以通过 `ToolRuntime` 访问 state、context、store 等运行时信息：

```python
from langchain.tools import tool, ToolRuntime

@tool
def get_user_preference(
    pref_name: str,
    runtime: ToolRuntime  # 自动注入，对模型不可见
) -> str:
    """获取用户偏好设置"""
    # 访问 state
    preferences = runtime.state.get("user_preferences", {})
    return preferences.get(pref_name, "未设置")

@tool
def get_account_info(runtime: ToolRuntime) -> str:
    """获取当前用户账户信息"""
    # 访问 context（不可变配置）
    user_id = runtime.context.user_id
    return f"用户 {user_id} 的账户信息..."

@tool  
def lookup_history(user_id: str, runtime: ToolRuntime) -> str:
    """查询用户历史记录"""
    # 访问 store（持久化存储）
    store = runtime.store
    history = store.get(("users", user_id), "history")
    return str(history.value) if history else "无记录"
```

#### 工具更新状态

工具可以通过返回 `Command` 来更新智能体状态：

```python
from langgraph.types import Command
from langchain.messages import ToolMessage

@tool
def update_user_name(new_name: str, runtime: ToolRuntime) -> Command:
    """更新用户名"""
    return Command(
        update={
            "user_name": new_name,
            "messages": [
                ToolMessage("用户名已更新", tool_call_id=runtime.tool_call_id)
            ]
        }
    )
```

#### 流式工具输出

```python
from langchain.tools import tool, ToolRuntime

@tool
def long_running_task(query: str, runtime: ToolRuntime) -> str:
    """执行长时间运行的任务"""
    writer = runtime.stream_writer
    writer("正在初始化...")
    writer(f"正在处理: {query}")
    writer("处理完成!")
    return f"任务完成: {query}"

# 使用 stream_mode="custom" 获取自定义流
for chunk in agent.stream(
    {"messages": [...]},
    stream_mode="custom"
):
    print(chunk)  # 显示进度更新
```

---

### 5. Short-term Memory（短期记忆）

短期记忆让智能体在单个对话线程中保持上下文。

#### 基本用法

```python
from langchain.agents import create_agent
from langgraph.checkpoint.memory import InMemorySaver

agent = create_agent(
    "gpt-4o",
    tools=[get_weather],
    checkpointer=InMemorySaver()
)

# 同一 thread_id = 同一对话
config = {"configurable": {"thread_id": "user-001"}}

agent.invoke({"messages": [{"role": "user", "content": "我叫小明"}]}, config)
agent.invoke({"messages": [{"role": "user", "content": "我叫什么？"}]}, config)
# 输出: 你叫小明
```

#### 生产环境持久化

```bash
pip install langgraph-checkpoint-postgres
```

```python
from langgraph.checkpoint.postgres import PostgresSaver

DB_URI = "postgresql://user:pass@localhost:5432/mydb"

with PostgresSaver.from_conn_string(DB_URI) as checkpointer:
    checkpointer.setup()  # 自动创建表
    agent = create_agent("gpt-4o", tools=tools, checkpointer=checkpointer)
```

#### 自定义状态

```python
from langchain.agents import create_agent, AgentState

class CustomState(AgentState):
    user_id: str
    preferences: dict
    
agent = create_agent(
    "gpt-4o",
    tools=tools,
    state_schema=CustomState,
    checkpointer=InMemorySaver()
)

result = agent.invoke({
    "messages": [{"role": "user", "content": "你好"}],
    "user_id": "user_123",
    "preferences": {"theme": "dark"}
}, config)
```

#### 消息管理策略

**裁剪消息**（保持上下文窗口）：

```python
from langchain.messages import RemoveMessage
from langgraph.graph.message import REMOVE_ALL_MESSAGES
from langchain.agents.middleware import before_model

@before_model
def trim_messages(state, runtime):
    """只保留最近几条消息"""
    messages = state["messages"]
    if len(messages) <= 5:
        return None  # 不修改
    
    first_msg = messages[0]  # 保留系统消息
    recent = messages[-4:]    # 保留最近4条
    
    return {
        "messages": [
            RemoveMessage(id=REMOVE_ALL_MESSAGES),
            first_msg,
            *recent
        ]
    }

agent = create_agent(model, tools, middleware=[trim_messages], checkpointer=checkpointer)
```

**摘要中间件**（内置）：

```python
from langchain.agents.middleware import SummarizationMiddleware

agent = create_agent(
    model="gpt-4o",
    tools=tools,
    middleware=[
        SummarizationMiddleware(
            model="gpt-4o-mini",        # 用于摘要的模型
            trigger=("tokens", 4000),   # 超过 4000 tokens 触发
            keep=("messages", 20)       # 保留最近 20 条消息
        )
    ],
    checkpointer=checkpointer
)
```

---

### 6. Streaming（流式输出）

流式输出实时展示结果，显著提升用户体验。

#### 流式模式

| 模式         | 说明                      |
|------------|-------------------------|
| `updates`  | 每个 Agent 步骤后发送状态更新      |
| `messages` | 流式 LLM token + 元数据      |
| `custom`   | 自定义数据（通过 stream_writer） |

#### Agent 步骤流

```python
for chunk in agent.stream(
    {"messages": [{"role": "user", "content": "北京天气如何？"}]},
    stream_mode="updates"
):
    for step, data in chunk.items():
        print(f"步骤: {step}")
        print(f"内容: {data['messages'][-1].content_blocks}")
```

输出示例：

```
步骤: model
内容: [{'type': 'tool_call', 'name': 'get_weather', 'args': {'city': '北京'}}]
步骤: tools
内容: [{'type': 'text', 'text': '北京：晴，25°C'}]
步骤: model
内容: [{'type': 'text', 'text': '北京现在天气晴朗，温度25°C'}]
```

#### LLM Token 流

```python
for token, metadata in agent.stream(
    {"messages": [{"role": "user", "content": "北京天气如何？"}]},
    stream_mode="messages"
):
    if token.text:
        print(token.text, end="", flush=True)
    if token.tool_call_chunks:
        print(f"[工具调用] {token.tool_call_chunks}")
```

#### 自定义流

```python
from langgraph.config import get_stream_writer

@tool
def process_data(query: str) -> str:
    """处理数据"""
    writer = get_stream_writer()
    writer(f"开始处理: {query}")
    writer("处理中...")
    writer("处理完成!")
    return f"结果: {query}"

for chunk in agent.stream(
    {"messages": [...]},
    stream_mode="custom"
):
    print(chunk)  # 依次输出进度信息
```

#### 多模式组合

```python
for stream_mode, chunk in agent.stream(
    {"messages": [...]},
    stream_mode=["updates", "messages", "custom"]
):
    if stream_mode == "updates":
        print(f"[步骤] {chunk}")
    elif stream_mode == "messages":
        token, meta = chunk
        print(f"[Token] {token.text}")
    elif stream_mode == "custom":
        print(f"[自定义] {chunk}")
```

#### 禁用流式

某些场景下可能需要禁用特定模型的流式输出：

```python
from langchain_openai import ChatOpenAI

model = ChatOpenAI(
    model="gpt-4o",
    streaming=False  # 禁用流式
)
```

---

### 7. Structured Output（结构化输出）

让模型返回结构化数据，便于程序处理。

#### 两种策略

| 策略                 | 说明                  | 适用场景                         |
|--------------------|---------------------|------------------------------|
| `ProviderStrategy` | 使用 provider 原生结构化输出 | OpenAI、Anthropic、Google（更可靠） |
| `ToolStrategy`     | 通过工具调用实现            | 所有支持工具调用的模型（兼容性好）            |

#### ProviderStrategy（推荐）

```python
from pydantic import BaseModel, Field
from langchain.agents import create_agent

class ContactInfo(BaseModel):
    """联系人信息"""
    name: str = Field(description="姓名")
    email: str = Field(description="邮箱")
    phone: str = Field(description="电话")

agent = create_agent(
    model="gpt-4o",
    response_format=ContactInfo  # 自动选择 ProviderStrategy
)

result = agent.invoke({
    "messages": [{"role": "user", "content": "提取: 张三, zhangsan@example.com, 13800138000"}]
})
print(result["structured_response"])
# ContactInfo(name='张三', email='zhangsan@example.com', phone='13800138000')
```

#### ToolStrategy

```python
from langchain.agents.structured_output import ToolStrategy
from typing import Literal

class ProductReview(BaseModel):
    """产品评价分析"""
    rating: int | None = Field(description="评分 1-5", ge=1, le=5)
    sentiment: Literal["positive", "negative"] = Field(description="情感倾向")
    key_points: list[str] = Field(description="关键点，1-3个词")

agent = create_agent(
    model="gpt-4o-mini",
    tools=[search],  # 可以同时有工具
    response_format=ToolStrategy(ProductReview)
)

result = agent.invoke({
    "messages": [{"role": "user", "content": "分析: 很棒的产品，5星好评，发货快但有点贵"}]
})
print(result["structured_response"])
# ProductReview(rating=5, sentiment='positive', key_points=['发货快', '有点贵'])
```

#### Union 类型（多 Schema 选择）

```python
from typing import Union

class ContactInfo(BaseModel):
    name: str
    email: str

class EventDetails(BaseModel):
    event_name: str
    date: str

agent = create_agent(
    model="gpt-4o",
    response_format=ToolStrategy(Union[ContactInfo, EventDetails])
)

# 模型会根据输入选择合适的 Schema
```

#### 错误处理

```python
# 默认自动重试验证错误
response_format = ToolStrategy(ProductReview)  # handle_errors=True

# 自定义错误消息
response_format = ToolStrategy(
    schema=ProductReview,
    handle_errors="请提供 1-5 的评分和评价内容"
)

# 只处理特定异常
response_format = ToolStrategy(
    schema=ProductReview,
    handle_errors=ValueError
)

# 自定义错误处理函数
def custom_error_handler(error: Exception) -> str:
    if isinstance(error, ValidationError):
        return "格式错误，请重试"
    return f"发生错误: {error}"

response_format = ToolStrategy(
    schema=ProductReview,
    handle_errors=custom_error_handler
)

# 禁用错误处理（直接抛出异常）
response_format = ToolStrategy(
    schema=ProductReview,
    handle_errors=False
)
```

---

## 延伸阅读

- [支持的模型](https://docs.langchain.com/oss/python/integrations/providers/overview) - OpenAI / Anthropic / Google /
  AWS / 本地模型
- [中间件](https://docs.langchain.com/oss/python/langchain/middleware/overview) - 自定义 Agent 行为
- [人机协作](https://docs.langchain.com/oss/python/langchain/human-in-the-loop) - 工具审批、中断恢复
- [长期记忆](https://docs.langchain.com/oss/python/langchain/long-term-memory) - 跨对话持久化
- [LangSmith](https://docs.langchain.com/langsmith/home) - 调试、测试、监控
