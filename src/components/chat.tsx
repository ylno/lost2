"use client";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  Avatar,
  ChatContainer,
  Conversation,
  ConversationHeader,
  ConversationList,
  MainContainer,
  Message,
  MessageGroup,
  MessageInput,
  MessageList,
  Sidebar,
} from "@chatscope/chat-ui-kit-react";
import {
  ChatMessage,
  MessageContentType,
  MessageDirection,
  MessageStatus,
  useChat,
} from "@chatscope/use-chat";
import { useMemo, useState } from "react";
import { nanoid } from "nanoid";

export default function Chat({}) {
  const [value, setValue] = useState("");

  // Get all chat related values and methods from useChat hook
  const {
    currentMessages,
    conversations,
    activeConversation,
    setActiveConversation,
    sendMessage,
    getUser,
  } = useChat();

  const [currentUserAvatar, currentUserName] = useMemo(() => {
    if (activeConversation) {
      const participant =
        activeConversation.participants.length > 0
          ? activeConversation.participants[0]
          : undefined;

      if (participant) {
        const user = getUser(participant.id);
        if (user) {
          return [<Avatar src={user.avatar} />, user.username];
        }
      }
    }
    return [undefined, undefined];
  }, [activeConversation]);

  const handleSend = (text) => {
    console.log("send", text);

    // Logger user (sender)
    const currentUserId = "You";

    const message = new ChatMessage({
      id: nanoid(),
      content: text,
      contentType: MessageContentType.TextHtml,
      senderId: currentUserId,
      direction: MessageDirection.Outgoing,
      status: MessageStatus.Sent,
    });

    sendMessage({
      message,
      conversationId: activeConversation.id,
      senderId: currentUserId,
    });
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <MainContainer>
        <Sidebar position="left">
          <ConversationList>
            {conversations.map((c, idx) => {
              // Helper for getting the data of the first participant
              const [avatar, name] = (() => {
                const participant =
                  c.participants.length > 0 ? c.participants[0] : undefined;
                if (participant) {
                  const user = getUser(participant.id);
                  if (user) {
                    return [<Avatar src={user.avatar} />, user.username];
                  }
                }

                return [undefined, undefined];
              })();

              return (
                <Conversation
                  key={c.id}
                  name={name}
                  active={activeConversation?.id === c.id}
                  unreadCnt={c.unreadCounter}
                  onClick={(e) => setActiveConversation(c.id)}
                >
                  {avatar}
                </Conversation>
              );
            })}
          </ConversationList>
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            {currentUserAvatar}
            <ConversationHeader.Content userName={currentUserName} />
          </ConversationHeader>

          <MessageList>
            {currentMessages.map((g) => (
              <MessageGroup key={g.id} direction={g.direction}>
                <MessageGroup.Messages>
                  {g.messages.map((m) => (
                    <Message
                      key={m.id}
                      model={{
                        type: "text",
                        payload: m.content,
                        direction: "incoming",
                        position: "normal",
                      }}
                    />
                  ))}
                </MessageGroup.Messages>
              </MessageGroup>
            ))}
          </MessageList>

          <MessageInput onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
