import GCChatProvider from "@/components/chat-provider";

export default function Home() {
  return (
    <div
      style={{
        display: "block",
        position: "relative",
        height: "100dvh",
        width: "100%",
      }}
    >
      <GCChatProvider></GCChatProvider>
    </div>
  );
}
