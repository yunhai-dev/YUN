/**
 * JSON to Programming Language Code Generator
 * 支持将 JSON 转换为 Python、TypeScript、Java、Go、Rust 等语言的实体类
 */

export type SupportedLanguage = 'python' | 'typescript' | 'java' | 'go' | 'rust';

interface FieldDefinition {
    key: string;           // 原始 JSON key
    name: string;          // 转换后的字段名（如 camelCase）
    type: string;          // 目标语言的类型
    rawType: InferredType; // 推断出的中间类型
    isOptional: boolean;
}

interface ClassDefinition {
    name: string;
    fields: FieldDefinition[];
}

// 中间类型表示
type InferredType =
    | { kind: 'primitive'; type: 'string' | 'number' | 'boolean' | 'null' }
    | { kind: 'array'; elementType: InferredType }
    | { kind: 'object'; className: string }
    | { kind: 'any' }
    | { kind: 'union'; types: InferredType[] };

// ==================== 工具函数 ====================

function toPascalCase(str: string): string {
    return str
        .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
        .replace(/^./, c => c.toUpperCase());
}

function toCamelCase(str: string): string {
    const pascal = toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function toSnakeCase(str: string): string {
    return str
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .replace(/^_/, '')
        .replace(/[-]/g, '_');
}

// ==================== 类型推断 ====================

class TypeAnalyzer {
    private classes: Map<string, ClassDefinition> = new Map();
    private classNameCounter: Map<string, number> = new Map();

    analyze(json: any, rootName: string = 'Root'): ClassDefinition[] {
        this.classes.clear();
        this.classNameCounter.clear();

        this.inferType(json, rootName);

        // 返回所有类定义，Root 放在最后（符合某些语言的依赖顺序）
        const result: ClassDefinition[] = [];
        const rootClass = this.classes.get(rootName);

        this.classes.forEach((cls, name) => {
            if (name !== rootName) {
                result.push(cls);
            }
        });

        if (rootClass) {
            result.push(rootClass);
        }

        return result;
    }

    private getUniqueClassName(baseName: string): string {
        const count = this.classNameCounter.get(baseName) || 0;
        this.classNameCounter.set(baseName, count + 1);

        if (count === 0) {
            return baseName;
        }
        return `${baseName}${count + 1}`;
    }

    private inferType(value: any, suggestedClassName: string): InferredType {
        if (value === null) {
            return {kind: 'primitive', type: 'null'};
        }

        if (Array.isArray(value)) {
            if (value.length === 0) {
                return {kind: 'array', elementType: {kind: 'any'}};
            }

            // 推断数组元素类型（取第一个元素的类型，或者尝试合并所有元素类型）
            const elementTypes = value.map((item, idx) =>
                this.inferType(item, suggestedClassName + 'Item')
            );

            // 简化处理：取第一个非 null 元素的类型
            const firstNonNull = elementTypes.find(t =>
                !(t.kind === 'primitive' && t.type === 'null')
            );

            return {
                kind: 'array',
                elementType: firstNonNull || elementTypes[0]
            };
        }

        if (typeof value === 'object') {
            // 对象类型，创建一个新的类定义
            const className = this.getUniqueClassName(toPascalCase(suggestedClassName));
            const fields: FieldDefinition[] = [];

            for (const key of Object.keys(value)) {
                const fieldValue = value[key];
                // 对于嵌套对象，使用 key 作为子类名的建议
                const childClassName = toPascalCase(key);
                const rawType = this.inferType(fieldValue, childClassName);

                fields.push({
                    key,
                    name: toCamelCase(key),
                    type: '', // 将在代码生成阶段填充
                    rawType,
                    isOptional: fieldValue === null || fieldValue === undefined
                });
            }

            this.classes.set(className, {name: className, fields});

            return {kind: 'object', className};
        }

        // 基本类型
        if (typeof value === 'string') {
            return {kind: 'primitive', type: 'string'};
        }
        if (typeof value === 'number') {
            return {kind: 'primitive', type: 'number'};
        }
        if (typeof value === 'boolean') {
            return {kind: 'primitive', type: 'boolean'};
        }

        return {kind: 'any'};
    }
}

// ==================== 代码生成器 ====================

abstract class CodeGenerator {
    protected classes: ClassDefinition[];

    constructor(classes: ClassDefinition[]) {
        this.classes = classes;
    }

    abstract generate(): string;

    protected abstract mapType(rawType: InferredType): string;
}

// ---------- Python Generator ----------
class PythonGenerator extends CodeGenerator {
    generate(): string {
        const lines: string[] = [];

        // Imports
        lines.push('from typing import List, Optional, Any');
        lines.push('from dataclasses import dataclass');
        lines.push('from dataclasses_json import dataclass_json');
        lines.push('');

        // Classes
        for (const cls of this.classes) {
            lines.push('@dataclass_json');
            lines.push('@dataclass');
            lines.push(`class ${cls.name}:`);

            if (cls.fields.length === 0) {
                lines.push('    pass');
            } else {
                for (const field of cls.fields) {
                    const pyType = this.mapType(field.rawType);
                    const fieldType = field.isOptional ? `Optional[${pyType}]` : pyType;
                    lines.push(`    ${toSnakeCase(field.key)}: ${fieldType}`);
                }
            }

            lines.push('');
        }

        return lines.join('\n');
    }

    protected mapType(rawType: InferredType): string {
        switch (rawType.kind) {
            case 'primitive':
                switch (rawType.type) {
                    case 'string':
                        return 'str';
                    case 'number':
                        return 'float';  // Python 中使用 float 更通用
                    case 'boolean':
                        return 'bool';
                    case 'null':
                        return 'None';
                }
                break;
            case 'array':
                return `List[${this.mapType(rawType.elementType)}]`;
            case 'object':
                return rawType.className;
            case 'any':
                return 'Any';
            case 'union':
                // 简化处理
                return 'Any';
        }
        return 'Any';
    }
}

// ---------- TypeScript Generator ----------
class TypeScriptGenerator extends CodeGenerator {
    generate(): string {
        const lines: string[] = [];

        for (const cls of this.classes) {
            lines.push(`export interface ${cls.name} {`);

            for (const field of cls.fields) {
                const tsType = this.mapType(field.rawType);
                const optional = field.isOptional ? '?' : '';
                lines.push(`    ${field.key}${optional}: ${tsType};`);
            }

            lines.push('}');
            lines.push('');
        }

        return lines.join('\n');
    }

    protected mapType(rawType: InferredType): string {
        switch (rawType.kind) {
            case 'primitive':
                switch (rawType.type) {
                    case 'string':
                        return 'string';
                    case 'number':
                        return 'number';
                    case 'boolean':
                        return 'boolean';
                    case 'null':
                        return 'null';
                }
                break;
            case 'array':
                return `${this.mapType(rawType.elementType)}[]`;
            case 'object':
                return rawType.className;
            case 'any':
                return 'any';
            case 'union':
                return 'any';
        }
        return 'any';
    }
}

// ---------- Java Generator ----------
class JavaGenerator extends CodeGenerator {
    generate(): string {
        const lines: string[] = [];

        lines.push('import java.util.List;');
        lines.push('import lombok.Data;');
        lines.push('import com.fasterxml.jackson.annotation.JsonProperty;');
        lines.push('');

        for (const cls of this.classes) {
            lines.push('@Data');
            lines.push(`public class ${cls.name} {`);

            for (const field of cls.fields) {
                const javaType = this.mapType(field.rawType);
                const camelName = toCamelCase(field.key);

                // 如果 key 和 camelName 不同，添加 @JsonProperty
                if (field.key !== camelName) {
                    lines.push(`    @JsonProperty("${field.key}")`);
                }
                lines.push(`    private ${javaType} ${camelName};`);
                lines.push('');
            }

            lines.push('}');
            lines.push('');
        }

        return lines.join('\n');
    }

    protected mapType(rawType: InferredType): string {
        switch (rawType.kind) {
            case 'primitive':
                switch (rawType.type) {
                    case 'string':
                        return 'String';
                    case 'number':
                        return 'Double';
                    case 'boolean':
                        return 'Boolean';
                    case 'null':
                        return 'Object';
                }
                break;
            case 'array':
                return `List<${this.mapType(rawType.elementType)}>`;
            case 'object':
                return rawType.className;
            case 'any':
                return 'Object';
            case 'union':
                return 'Object';
        }
        return 'Object';
    }
}

// ---------- Go Generator ----------
class GoGenerator extends CodeGenerator {
    generate(): string {
        const lines: string[] = [];

        lines.push('package main');
        lines.push('');

        for (const cls of this.classes) {
            lines.push(`type ${cls.name} struct {`);

            for (const field of cls.fields) {
                const goType = this.mapType(field.rawType);
                const fieldName = toPascalCase(field.key); // Go 导出字段需要大写开头
                const jsonTag = `\`json:"${field.key}"\``;

                lines.push(`\t${fieldName} ${goType} ${jsonTag}`);
            }

            lines.push('}');
            lines.push('');
        }

        return lines.join('\n');
    }

    protected mapType(rawType: InferredType): string {
        switch (rawType.kind) {
            case 'primitive':
                switch (rawType.type) {
                    case 'string':
                        return 'string';
                    case 'number':
                        return 'float64';
                    case 'boolean':
                        return 'bool';
                    case 'null':
                        return 'interface{}';
                }
                break;
            case 'array':
                return `[]${this.mapType(rawType.elementType)}`;
            case 'object':
                return rawType.className;
            case 'any':
                return 'interface{}';
            case 'union':
                return 'interface{}';
        }
        return 'interface{}';
    }
}

// ---------- Rust Generator ----------
class RustGenerator extends CodeGenerator {
    generate(): string {
        const lines: string[] = [];

        lines.push('use serde::{Deserialize, Serialize};');
        lines.push('');

        for (const cls of this.classes) {
            lines.push('#[derive(Debug, Clone, Serialize, Deserialize)]');
            lines.push(`pub struct ${cls.name} {`);

            for (const field of cls.fields) {
                const rustType = this.mapType(field.rawType);
                const fieldName = toSnakeCase(field.key);
                const finalType = field.isOptional ? `Option<${rustType}>` : rustType;

                // 如果字段名与原始 key 不同，添加 serde rename
                if (fieldName !== field.key) {
                    lines.push(`    #[serde(rename = "${field.key}")]`);
                }
                lines.push(`    pub ${fieldName}: ${finalType},`);
            }

            lines.push('}');
            lines.push('');
        }

        return lines.join('\n');
    }

    protected mapType(rawType: InferredType): string {
        switch (rawType.kind) {
            case 'primitive':
                switch (rawType.type) {
                    case 'string':
                        return 'String';
                    case 'number':
                        return 'f64';
                    case 'boolean':
                        return 'bool';
                    case 'null':
                        return 'Option<serde_json::Value>';
                }
                break;
            case 'array':
                return `Vec<${this.mapType(rawType.elementType)}>`;
            case 'object':
                return rawType.className;
            case 'any':
                return 'serde_json::Value';
            case 'union':
                return 'serde_json::Value';
        }
        return 'serde_json::Value';
    }
}

// ==================== 主入口 ====================

export function jsonToCode(json: any, language: SupportedLanguage, rootClassName: string = 'Root'): string {
    const analyzer = new TypeAnalyzer();
    const classes = analyzer.analyze(json, rootClassName);

    let generator: CodeGenerator;

    switch (language) {
        case 'python':
            generator = new PythonGenerator(classes);
            break;
        case 'typescript':
            generator = new TypeScriptGenerator(classes);
            break;
        case 'java':
            generator = new JavaGenerator(classes);
            break;
        case 'go':
            generator = new GoGenerator(classes);
            break;
        case 'rust':
            generator = new RustGenerator(classes);
            break;
        default:
            throw new Error(`Unsupported language: ${language}`);
    }

    return generator.generate();
}

// 获取支持的语言列表
export const SUPPORTED_LANGUAGES: { value: SupportedLanguage; label: string }[] = [
    {value: 'python', label: 'Python'},
    {value: 'typescript', label: 'TypeScript'},
    {value: 'java', label: 'Java'},
    {value: 'go', label: 'Go'},
    {value: 'rust', label: 'Rust'},
];
