import type {Metadata} from "next";
import ChatClient from "./components/chat-client";

export const metadata: Metadata = {
  title: "Chat",
  description: "AI Elements chat playground demo.",
};

const ChatPage = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex h-full flex-1 flex-col overflow-hidden min-h-0">
        <div className="h-[calc(100vh-64px)] mt-[64px] w-full">
          <ChatClient />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
