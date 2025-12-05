import React, {useEffect, useRef, useState} from "react";
import {Plus, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

// 类型安全定义 JSON 值
export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
export interface JsonObject {
    [key: string]: JsonValue
}
export type JsonArray = JsonValue[];

interface JsonTreeProps {
    data: JsonValue;
    level?: number;
    onUpdate?: (newData: JsonValue) => void;
    isRoot?: boolean;
    path?: (string | number)[]; // 用于调试或追踪路径
}

const isObject = (val: JsonValue): val is JsonObject => val !== null && typeof val === "object" && !Array.isArray(val);
const isArray = (val: JsonValue): val is JsonArray => Array.isArray(val);

// 简单的输入组件，用于编辑 Key 或 Value
const EditableInput = ({
                           value,
                           onChange,
                           className,
                           autoFocus = false,
                           placeholder
                       }: {
    value: string;
    onChange: (val: string) => void;
    className?: string;
    autoFocus?: boolean;
    placeholder?: string;
}) => {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (ref.current && ref.current.innerText !== value) {
            ref.current.innerText = value;
        }
    }, [value]);

    return (
        <span
            ref={ref}
            contentEditable
            suppressContentEditableWarning
            className={cn("outline-none border-b border-transparent focus:border-primary/50 transition-colors min-w-[20px] break-all whitespace-pre-wrap inline-block max-w-full align-top", className)}
            onInput={(e) => {
                onChange(e.currentTarget.innerText);
            }}
            autoFocus={autoFocus}
            role="textbox"
            placeholder={placeholder}
        />
    );
};

const JsonTree: React.FC<JsonTreeProps> = ({data, level = 0, onUpdate, path = []}) => {
    const [collapsed, setCollapsed] = useState(false);

    // 处理基本类型值的更新
    const handlePrimitiveChange = (newValStr: string) => {
        if (!onUpdate) return;
        
        // 尝试智能转换类型
        let newVal: JsonValue = newValStr;
        if (newValStr === 'true') newVal = true;
        else if (newValStr === 'false') newVal = false;
        else if (newValStr === 'null') newVal = null;
        else if (!isNaN(Number(newValStr)) && newValStr.trim() !== '') {
             // 只有当它看起来完全像数字时才转换，避免 "123." 这种中间状态被强制转换
             // 这里简单处理：如果用户输入的是数字格式，尝试转数字
             // 但为了编辑体验，可能需要允许字符串形式的数字。
             // 策略：如果原值是数字，尝试保持数字；如果原值是字符串，保持字符串
             if (typeof data === 'number') {
                 newVal = Number(newValStr);
             } else {
                 // 如果原值不是数字，但输入了数字，是否转？
                 // 暂时保持字符串，除非用户明确想要数字（通常编辑器会有类型选择，这里简化）
                 // 或者：如果输入完全匹配数字，就转数字
                 newVal = Number(newValStr);
             }
        }
        
        // 如果转换后是 NaN，回退到字符串
        if (typeof newVal === 'number' && isNaN(newVal)) {
            newVal = newValStr;
        }

        onUpdate(newVal);
    };

    // 渲染基本类型
    if (!isObject(data) && !isArray(data)) {
        const displayValue = String(data);
        let colorClass = "text-green-600 dark:text-green-400"; // String
        if (typeof data === 'number') colorClass = "text-orange-600 dark:text-orange-400";
        if (typeof data === 'boolean') colorClass = "text-blue-600 dark:text-blue-400";
        if (data === null) colorClass = "text-gray-500";

        // 如果是字符串，显示时带引号？编辑时不带？
        // 为了编辑方便，编辑时不带引号，显示时带引号
        // 这里简化：直接编辑原始值字符串
        
        return (
            <div className="flex items-start group">
                {typeof data === 'string' && <span className="text-green-600 dark:text-green-400 shrink-0">"</span>}
                <EditableInput
                    value={displayValue}
                    onChange={handlePrimitiveChange}
                    className={colorClass}
                />
                {typeof data === 'string' && <span className="text-green-600 dark:text-green-400 shrink-0">"</span>}
            </div>
        );
    }

    // 处理对象/数组的子项更新
    const handleChildUpdate = (key: string | number, newValue: JsonValue) => {
        if (!onUpdate) return;
        if (isArray(data)) {
            const newData = [...data];
            newData[key as number] = newValue;
            onUpdate(newData);
        } else {
            const newData = {...(data as JsonObject), [key]: newValue};
            onUpdate(newData);
        }
    };

    const handleChildDelete = (key: string | number) => {
        if (!onUpdate) return;
        if (isArray(data)) {
            const newData = [...data];
            newData.splice(key as number, 1);
            onUpdate(newData);
        } else {
            const newData = {...(data as JsonObject)};
            delete newData[key as string];
            onUpdate(newData);
        }
    };

    const handleChildRename = (oldKey: string, newKey: string) => {
        if (!onUpdate || isArray(data)) return;
        if (oldKey === newKey) return;
        
        const obj = data as JsonObject;
        // 保持顺序：创建一个新对象
        const newData: JsonObject = {};
        Object.keys(obj).forEach(k => {
            if (k === oldKey) {
                newData[newKey] = obj[oldKey];
            } else {
                newData[k] = obj[k];
            }
        });
        onUpdate(newData);
    };

    const handleAddChild = () => {
        if (!onUpdate) return;

        // 辅助函数：深拷贝 JSON 值
        const cloneValue = (val: JsonValue): JsonValue => {
            try {
                return JSON.parse(JSON.stringify(val));
            } catch {
                return null;
            }
        };

        if (isArray(data)) {
            let newValue: JsonValue = null;
            if (data.length > 0) {
                newValue = cloneValue(data[data.length - 1]);
            }
            const newData = [...data, newValue];
            onUpdate(newData);
        } else {
            const obj = data as JsonObject;
            const keys = Object.keys(obj);
            let newValue: JsonValue = null;
            
            if (keys.length > 0) {
                const lastKey = keys[keys.length - 1];
                newValue = cloneValue(obj[lastKey]);
            }

            const newData = {...obj};
            // 寻找一个不重复的 key
            let newKey = "newKey";
            let counter = 1;
            while (newKey in newData) {
                newKey = `newKey${counter++}`;
            }
            newData[newKey] = newValue;
            onUpdate(newData);
        }
        setCollapsed(false); // 自动展开
    };

    const entries: [string | number, JsonValue][] = isArray(data)
        ? (data as JsonArray).map((v, i) => [i, v])
        : Object.entries(data as JsonObject);

    return (
        <div className="inline-block align-top">
            <div className="inline-flex items-center">
                <button
                    className="mr-1 text-[10px] text-muted-foreground hover:text-primary w-4 h-4 flex items-center justify-center"
                    onClick={() => setCollapsed((c) => !c)}
                    aria-label={collapsed ? "展开" : "折叠"}
                    type="button"
                >
                    {entries.length > 0 && (collapsed ? "▶" : "▼")}
                </button>

                <span className="text-muted-foreground">{isArray(data) ? "[" : "{"}</span>
                
                {collapsed && (
                    <span className="text-muted-foreground text-xs mx-1 cursor-pointer" onClick={() => setCollapsed(false)}>
                        ... {entries.length} items
                    </span>
                )}

                {!collapsed && entries.length === 0 && (
                    <span className="text-muted-foreground text-xs mx-1">empty</span>
                )}

                {/* 添加按钮 (仅在展开且非空时显示在括号旁，或者空的时候) */}
                {!collapsed && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={handleAddChild}
                        title={isArray(data) ? "添加项" : "添加属性"}
                    >
                        <Plus className="h-3 w-3"/>
                    </Button>
                )}
                
                {collapsed && <span className="text-muted-foreground">{isArray(data) ? "]" : "}"}</span>}
            </div>

            {!collapsed && (
                <div className="pl-4 border-l border-muted/20 ml-2 flex flex-col">
                    {entries.map(([key, value], idx) => (
                        <div key={idx} className="group/line flex items-start hover:bg-muted/10 -ml-2 pl-2 rounded-sm">
                            {/* 键 / 索引 */}
                            <div className="mr-1 flex items-start">
                                {isArray(data) ? (
                                    <span className="text-muted-foreground/50 text-xs w-4 text-right mr-1 select-none shrink-0">{key}</span>
                                ) : (
                                    <div className="flex items-start">
                                        <span className="text-blue-600 dark:text-blue-400 shrink-0">"</span>
                                        <EditableInput
                                            value={String(key)}
                                            onChange={(newKey) => handleChildRename(String(key), newKey)}
                                            className="text-blue-600 dark:text-blue-400 font-medium"
                                        />
                                        <span className="text-blue-600 dark:text-blue-400 shrink-0">"</span>
                                    </div>
                                )}
                                <span className="text-muted-foreground mx-1 shrink-0">:</span>
                            </div>

                            {/* 值 */}
                            <div className="flex-1">
                                <JsonTree 
                                    data={value} 
                                    level={level + 1} 
                                    onUpdate={(newVal) => handleChildUpdate(key, newVal)}
                                    path={[...path, key]}
                                />
                            </div>

                            {/* 行尾逗号 */}
                            {idx < entries.length - 1 && <span className="text-muted-foreground mr-1">,</span>}

                            {/* 删除按钮 */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 opacity-0 group-hover/line:opacity-100 transition-opacity text-muted-foreground hover:text-destructive ml-2"
                                onClick={() => handleChildDelete(key)}
                                title="删除"
                            >
                                <X className="h-3 w-3"/>
                            </Button>
                        </div>
                    ))}
                    
                    {/* 底部添加按钮 (如果列表很长，方便在底部添加) */}
                    {entries.length > 0 && (
                         <div className="flex items-center opacity-0 hover:opacity-100 transition-opacity -ml-2 pl-2">
                             <Button
                                 variant="ghost"
                                 size="sm"
                                 className="h-5 text-xs text-muted-foreground hover:text-primary px-1"
                                 onClick={handleAddChild}
                             >
                                 <Plus className="h-3 w-3 mr-1"/> 添加{isArray(data) ? "项" : "属性"}
                             </Button>
                         </div>
                    )}
                </div>
            )}

            {!collapsed && (
                <div className="text-muted-foreground">{isArray(data) ? "]" : "}"}</div>
            )}
        </div>
    );
};

export default JsonTree;
