import {Tool} from "@/types/tools";
import { aiLLMs } from "@/data/tools/aiLLMs";
import { aiApps } from "@/data/tools/aiApps";
import { aiExt } from "@/data/tools/aiExt";
import { devTools } from "@/data/tools/devTools";
import { systemTools } from "@/data/tools/systemTools";
import { otherTools } from "@/data/tools/otherTools";

const allToolDataMap = new Map<string, Tool>();

[
    ...aiLLMs,
    ...aiApps,
    ...aiExt,
    ...devTools,
    ...systemTools,
    ...otherTools
].forEach(tool => {
    if (!allToolDataMap.has(tool.id)) {
        allToolDataMap.set(tool.id, tool);
    }
});

const allToolsArray = Array.from(allToolDataMap.values());

function sortTools(tools: Tool[]): Tool[] {
    return tools.sort((a, b) => {
        const aIsLocal = a.href.startsWith('/');
        const bIsLocal = b.href.startsWith('/');
        if (aIsLocal && !bIsLocal) return -1;
        if (!aIsLocal && bIsLocal) return 1;
        return 0;
    });
}

export function getAllTools(): Tool[] {
    return sortTools(allToolsArray);
}