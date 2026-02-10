import {Tool} from "@/types/tools";
import {localTools} from "@/data/tools/localTools";
import {devTools} from "@/data/tools/devTools";
import {mcpTools} from "@/data/tools/mcpTools";
import {aiCommunityTools} from "@/data/tools/aiCommunityTools";
import {llmProviderTools} from "@/data/tools/llmProviderTools";
import {aiTools} from "@/data/tools/aiTools";
import {designTools} from "@/data/tools/designTools";
import {serverTools} from "@/data/tools/serverTools";
import {otherTools} from "@/data/tools/otherTools";
import {netTools} from "@/data/tools/netTools";
import {skillsTools} from "@/data/tools/skillsTools";


const allToolDataMap = new Map<string, Tool>();

[
    ...localTools,
    ...devTools,
    ...mcpTools,
    ...aiCommunityTools,
    ...llmProviderTools,
    ...aiTools,
    ...designTools,
    ...serverTools,
    ...otherTools,
    ...netTools,
    ...skillsTools
].forEach(tool => {
    if (!allToolDataMap.has(tool.id)) {
        allToolDataMap.set(tool.id, tool); // 添加唯一工具到 Map
    }
});

const allToolsArray = Array.from(allToolDataMap.values());

export function getAllTools(): Tool[] {
    return allToolsArray; // 返回包含所有唯一工具的数组
}
