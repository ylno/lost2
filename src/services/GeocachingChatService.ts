// This IChatService implementation is only an example and has no real business value.
// However, this is good start point to make your own implementation.
// Using this service it's possible to connects two or more chats in the same application for a demonstration purposes

import {
  ChatEvent,
  ChatEventHandler,
  ChatEventType,
  ChatMessage,
  IChatService,
  IStorage,
  MessageContentType,
  MessageDirection,
  MessageStatus,
  SendMessageServiceParams,
  SendTypingServiceParams,
  UpdateState,
  UserTypingEvent,
} from "@chatscope/use-chat";
import { firestoreDb } from "@/lib/frontend/Firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { frontendService } from "@/lib/frontend/FrontendService";
import { nanoid } from "nanoid";
import { StoredChatMessage } from "@/types/types";

type EventHandlers = {
  onMessage: ChatEventHandler<
    ChatEventType.Message,
    ChatEvent<ChatEventType.Message>
  >;
  onConnectionStateChanged: ChatEventHandler<
    ChatEventType.ConnectionStateChanged,
    ChatEvent<ChatEventType.ConnectionStateChanged>
  >;
  onUserConnected: ChatEventHandler<
    ChatEventType.UserConnected,
    ChatEvent<ChatEventType.UserConnected>
  >;
  onUserDisconnected: ChatEventHandler<
    ChatEventType.UserDisconnected,
    ChatEvent<ChatEventType.UserDisconnected>
  >;
  onUserPresenceChanged: ChatEventHandler<
    ChatEventType.UserPresenceChanged,
    ChatEvent<ChatEventType.UserPresenceChanged>
  >;
  onUserTyping: ChatEventHandler<
    ChatEventType.UserTyping,
    ChatEvent<ChatEventType.UserTyping>
  >;
  [key: string]: any;
};

export class GeocachingChatService implements IChatService {
  storage?: IStorage;
  updateState: UpdateState;

  eventHandlers: EventHandlers = {
    onMessage: () => {},
    onConnectionStateChanged: () => {},
    onUserConnected: () => {},
    onUserDisconnected: () => {},
    onUserPresenceChanged: () => {},
    onUserTyping: () => {},
  };

  constructor(storage: IStorage, update: UpdateState) {
    this.storage = storage;
    this.updateState = update;
    console.log("GeocachingChatService", this.storage, this.updateState);

    try {
      const cachesession = frontendService.getCachesession();
      const conversationId = cachesession;
      if (!cachesession) {
        throw new Error("no cachesession");
      }
      const collectionReference = collection(
        firestoreDb,
        `/cache-sessions/${cachesession}/chat`,
      );
      const queryRef = query(collectionReference, orderBy("created"));

      getDocs(queryRef).then((snapshot) => {
        snapshot.docs.map((doc) => {
          console.log(doc.data());
          const storedChatMessage = doc.data() as StoredChatMessage;
          this.storage?.addMessage(
            new ChatMessage({
              id: nanoid(),
              direction:
                storedChatMessage.sender == "You"
                  ? MessageDirection.Outgoing
                  : MessageDirection.Incoming,
              status: MessageStatus.Sent,
              senderId: storedChatMessage.sender,
              contentType: MessageContentType.TextHtml,
              content: storedChatMessage.message as any,
            }),
            cachesession,
            false,
          );
          this.updateState();

          // const message1 = new ChatMessage({
          //   id: nanoid(),
          //   direction: MessageDirection.Incoming,
          //   status: MessageStatus.Sent,
          //   senderId: storedChatMessage.sender,
          //   contentType: MessageContentType.TextHtml,
          //   content: storedChatMessage.message as any,
          // });
          // console.log("message111", message1);
          // this.eventHandlers.onMessage(
          //   // @ts-ignore
          //   new MessageEvent({ message: message1, conversationId }),
          // );
        });
      });

      onSnapshot(queryRef, (snapshot) => {
        console.log("snapshot", queryRef);
        snapshot.docChanges().forEach((change) => {
          console.log("changetype", change.type);
          if (change.type === "added") {
            console.log("Neues Dokument: ", change.doc.data());
            const storedChatMessage = change.doc.data() as StoredChatMessage;
            this.storage?.addMessage(
              new ChatMessage({
                id: nanoid(),
                direction:
                  storedChatMessage.sender == "You"
                    ? MessageDirection.Outgoing
                    : MessageDirection.Incoming,
                status: MessageStatus.Sent,
                senderId: storedChatMessage.sender,
                contentType: MessageContentType.TextHtml,
                content: storedChatMessage.message as any,
              }),
              cachesession,
              false,
            );
            this.updateState();
          }
        });
      });
    } catch (e) {
      console.log("error", e);
    }
    // For communication we use CustomEvent dispatched to the window object.
    // It allows you to simulate sending and receiving data from the server.
    // In a real application, instead of adding a listener to the window,
    // you will implement here receiving data from your chat server.

    console.log("constructor", window);
    if (typeof window !== "undefined") {
      // Client-side-only code

      window.addEventListener("chat-protocol", (evt: Event) => {
        const event = evt as CustomEvent;
        console.log("event", event);

        const {
          detail: { type },
          detail,
        } = event;

        if (type === "message") {
          const message =
            detail.message as ChatMessage<MessageContentType.TextHtml>;

          message.direction = MessageDirection.Incoming;
          const { conversationId } = detail as { conversationId: string };
          console.log("sender", detail.sender);
          if (this.eventHandlers.onMessage && detail.sender !== this) {
            // Running the onMessage callback registered by ChatProvider will cause:
            // 1. Add a message to the conversation to which the message was sent
            // 2. If a conversation with the given id exists and is not active,
            //    its unreadCounter will be incremented
            // 3. Remove information about the sender who is writing from the conversation
            // 4. Re-render
            //
            // Note!
            // If a conversation with such id does not exist,
            // the message will be added, but the conversation object will not be created.
            // You have to take care of such a case yourself.
            // You can check here if there is already a conversation in storage.
            // If it is not there, you can create it before calling onMessage.
            // After adding a conversation to the list, you don't need to manually run updateState
            // because ChatProvider in onMessage will do it.
            this.eventHandlers.onMessage(
              // @ts-ignore
              new MessageEvent({ message, conversationId }),
            );
          }
        } else if (type === "typing") {
          const { userId, isTyping, conversationId, content, sender } = detail;

          if (this.eventHandlers.onUserTyping && sender !== this) {
            // Running the onUserTyping callback registered by ChatProvider will cause:
            // 1. Add the user to the list of users who are typing in the conversation
            // 2. Debounce
            // 3. Re-render
            this.eventHandlers.onUserTyping(
              new UserTypingEvent({
                userId,
                isTyping,
                conversationId,
                content,
              }),
            );
          }
        }
      });
    }
  }

  sendMessage({ message, conversationId }: SendMessageServiceParams) {
    // We send messages using a CustomEvent dispatched to the window object.
    // They are received in the callback assigned in the constructor.
    // In a real application, instead of dispatching the event here,
    // you will implement sending messages to your chat server.
    const stringMessage = message.content as unknown as string;
    console.log("message", stringMessage);

    frontendService.sendChatMessage(stringMessage);
    return message;
  }

  sendTyping({
    isTyping,
    content,
    conversationId,
    userId,
  }: SendTypingServiceParams) {
    // We send the "typing" signalization using a CustomEvent dispatched to the window object.
    // It is received in the callback assigned in the constructor
    // In a real application, instead of dispatching the event here,
    // you will implement sending signalization to your chat server.
    const typingEvent = new CustomEvent("chat-protocol", {
      detail: {
        type: "typing",
        isTyping,
        content,
        conversationId,
        userId,
        sender: this,
      },
    });

    window.dispatchEvent(typingEvent);
  }

  // The ChatProvider registers callbacks with the service.
  // These callbacks are necessary to notify the provider of the changes.
  // For example, when your service receives a message, you need to run an onMessage callback,
  // because the provider must know that the new message arrived.
  // Here you need to implement callback registration in your service.
  // You can do it in any way you like. It's important that you will have access to it elsewhere in the service.
  on<T extends ChatEventType, H extends ChatEvent<T>>(
    evtType: T,
    evtHandler: ChatEventHandler<T, H>,
  ) {
    const key = `on${evtType.charAt(0).toUpperCase()}${evtType.substring(1)}`;

    if (key in this.eventHandlers) {
      this.eventHandlers[key] = evtHandler;
    }
  }

  // The ChatProvider can unregister the callback.
  // In this case remove it from your service to keep it clean.
  off<T extends ChatEventType, H extends ChatEvent<T>>(
    evtType: T,
    eventHandler: ChatEventHandler<T, H>,
  ) {
    const key = `on${evtType.charAt(0).toUpperCase()}${evtType.substring(1)}`;
    if (key in this.eventHandlers) {
      this.eventHandlers[key] = () => {};
    }
  }
}
