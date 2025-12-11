import MiniSearch from "minisearch";
import {getAllTools} from "@/data/tools";
import {mediaItems} from "@/data/media";

let searchIndex: MiniSearch | null = null;

export const getSearchIndex = async () => {
  if (searchIndex) return searchIndex;

  try {
    const response = await fetch("/index.json");
    if (response.ok) {
      const data = await response.json();

      const tools = getAllTools().map((tool) => ({
        id: tool.id,
        title: tool.name,
        content: tool.description,
        type: "tools",
      }));

      const medias = mediaItems.map((media) => ({
        id: media.id,
        title: media.title,
        content: media.author,
        type: "media",
      }));

      searchIndex = new MiniSearch({
        fields: ["title", "content"],
        storeFields: ["id", "title", "content", "type"],
      });
      searchIndex.addAll([...data, ...tools, ...medias]);
      return searchIndex;
    }
  } catch (error) {
    console.error("Failed to load search index:", error);
  }
  return null;
};
