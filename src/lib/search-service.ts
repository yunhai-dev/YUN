import MiniSearch from "minisearch";
import {getAllTools} from "@/data/tools";
import {mediaItems} from "@/data/media";

type SearchDoc = {
  id: string;
  title: string;
  content: string;
  type: string;
};

let searchIndex: MiniSearch | null = null;
let searchIndexPromise: Promise<MiniSearch | null> | null = null;

const buildSearchIndex = (data: SearchDoc[]) => {
  const tools = getAllTools().map((tool) => ({
    id: tool.href,
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

  const ms = new MiniSearch({
    fields: ["title", "content"],
    storeFields: ["id", "title", "content", "type"],
  });
  ms.addAll([...data, ...tools, ...medias]);
  return ms;
};

export const getSearchIndex = async () => {
  if (searchIndex) return searchIndex;
  if (searchIndexPromise) return searchIndexPromise;

  // Deduplicate concurrent fetches so /index.json only loads once.
  searchIndexPromise = (async () => {
    try {
      const response = await fetch("/index.json", {cache: "force-cache"});
      if (!response.ok) throw new Error(`Fetch failed with ${response.status}`);

      const data = (await response.json()) as SearchDoc[];
      searchIndex = buildSearchIndex(data);
      return searchIndex;
    } catch (error) {
      console.error("Failed to load search index:", error);
      searchIndex = null;
      return null;
    }
  })();

  return searchIndexPromise;
};
