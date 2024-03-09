import MyChatProvider from "@/components/chat-provider";

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
      <MyChatProvider></MyChatProvider>
    </div>
  );
}
