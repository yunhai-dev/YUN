---
title: "ChromaDB 向量数据库入门"
description: "ChromaDB 开源向量数据库使用指南，支持语义搜索、RAG 应用、LLM 知识库构建"
keywords: ["ChromaDB", "向量数据库", "RAG", "语义搜索", "LLM", "嵌入向量", "AI应用"]
---

在人工智能和机器学习领域，向量数据库已成为处理高维嵌入数据的重要工具。ChromaDB 是一个开源的 AI 原生向量数据库，专为构建 LLM（大型语言模型）应用而设计。它让知识、事实和技能可以轻松“插拔”到 LLM 中，支持快速存储、检索和相似性搜索。 无论你是开发语义搜索、推荐系统还是 RAG（Retrieval-Augmented Generation）应用，ChromaDB 都能提供高效、易用的解决方案。

本文将从 ChromaDB 的介绍入手，逐步指导你使用 Python 进行安装和基本操作。通过简单代码示例，你可以快速上手，并在本地构建一个向量搜索原型。

---

## 什么是 ChromaDB？

ChromaDB 是由 Chroma 团队开发的开源嵌入数据库，专注于 AI 应用。它支持内存中运行、持久化存储，并内置嵌入生成功能，让你无需额外依赖即可处理文本和图像。

### 关键特性
- **简单易用**：Python SDK 提供直观的 API，支持快速原型开发。
- **内置嵌入**：默认使用 Sentence Transformers 等模型生成向量，无需手动集成。
- **持久化和服务器模式**：从内存客户端到 Docker 部署，一应俱全。
- **多模态支持**：处理文本、图像等数据，适用于多媒体搜索。
- **高性能**：优化了相似性搜索，适合大规模 LLM 应用。

为什么选择 ChromaDB？与其他向量数据库（如 Pinecone 或 FAISS）相比，它更轻量级、免费开源，且无缝集成 LangChain 等框架。 如果你想在本地快速测试 AI 想法，ChromaDB 是绝佳起点。

---

## 安装 ChromaDB

安装非常简单，只需一个 pip 命令。确保你的 Python 版本 >= 3.8，且 SQLite >= 3.35（如果遇到问题，可升级到 Python 3.11）。

```bash
pip install chromadb
```

可选：如果你想使用 OpenAI 嵌入模型，还需安装 `openai` 并设置 API 密钥。

```bash
pip install openai
```

安装完成后，即可导入并使用。

---

## 基本使用：从零开始构建向量数据库

让我们通过一个简单示例来创建客户端、添加数据并查询。假设我们有一个小型文档集，用于模拟语义搜索。

### 1. 创建客户端和集合

首先，导入库并初始化客户端（默认内存模式，便于原型测试）。

```python
import chromadb

# 创建内存客户端
client = chromadb.Client()
```

然后，创建集合（Collection），类似于数据库中的表，用于存储嵌入。

```python
# 创建集合（如果已存在，可用 get_or_create_collection）
collection = client.create_collection(name="my_documents")
```

### 2. 添加数据

ChromaDB 支持添加文档、元数据和 ID。内置嵌入函数会自动将文本转换为向量。

```python
# 添加文档
collection.add(
    documents=[
        "ChromaDB 是一个开源向量数据库。",
        "它支持 Python 和 JavaScript 客户端。",
        "用于 AI 应用中的相似性搜索。"
    ],
    metadatas=[
        {"source": "doc1", "category": "intro"},
        {"source": "doc2", "category": "features"},
        {"source": "doc3", "category": "use_cases"}
    ],
    ids=["id1", "id2", "id3"]
)
```

这里，`documents` 是要嵌入的文本，`metadatas` 可用于过滤，`ids` 确保唯一性。

### 3. 查询数据

使用 `query` 方法进行相似性搜索，返回最相关的结果。

```python
# 查询相似文档
results = collection.query(
    query_texts=["什么是 ChromaDB 的优势？"],
    n_results=2  # 返回前 2 个结果
)

print(results)
```

输出示例：
```
{
  'ids': [['id2', 'id1']],
  'distances': [[0.123, 0.456]],
  'metadatas': [[{'source': 'doc2', 'category': 'features'}, {'source': 'doc1', 'category': 'intro'}]],
  'documents': [['它支持 Python 和 JavaScript 客户端。', 'ChromaDB 是一个开源向量数据库。']]
}
```

距离值越小，表示相似度越高。你还可以添加过滤器，如 `where={"category": "features"}`。

---

## 高级用法：持久化和集成

### 持久化存储
默认客户端是临时的，重启丢失数据。使用持久化路径保存到磁盘。

```python
# 持久化客户端
client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection(name="persistent_docs")
```

### 集成嵌入模型
默认使用内置模型，但你可以自定义，如 OpenAI。

```python
from chromadb.utils import embedding_functions

openai_ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key="your-openai-api-key",
    model_name="text-embedding-ada-002"
)

collection = client.create_collection(
    name="openai_docs",
    embedding_function=openai_ef
)
```

### 与 LangChain 集成
ChromaDB 完美兼容 LangChain，用于 RAG 管道。

```python
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_texts(
    texts=["示例文本"],
    embedding=embeddings,
    persist_directory="./langchain_chroma"
)
```

更多细节，可参考官方文档或 GitHub 示例。

---

## 总结与最佳实践

ChromaDB 以其简洁 API 和强大功能，极大降低了构建 AI 向量的门槛。通过本文，你已掌握从安装到查询的全流程。建议从内存模式开始测试，逐步迁移到服务器部署（如 Docker）。

最佳实践：
- 使用唯一 ID 避免冲突。
- 对于生产环境，启用持久化和备份。
- 监控查询性能，必要时调整 `n_results` 或嵌入维度。
