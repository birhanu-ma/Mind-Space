import React, { useEffect, useState, useRef } from "react";
import { socket } from "../../socket.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { conversationAPI } from "../../service/client.jsx";
import { useDispatch } from "react-redux";
import { incrementUnread, clearUnread } from "../../store/notificationSlice";

export default function ChatRoom({ sender, room }) {
  const [message, setMessage] = useState("");
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const chatContainerRef = useRef(null);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {
    data: chat = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["conversation", room],
    queryFn: () => conversationAPI.getConversation(room),
    enabled: !!room,
  });

  const messages = chat?.data?.chat || [];

  // Helper to check if user is scrolled to bottom
  const isScrolledToBottom = () => {
    const container = chatContainerRef.current;
    if (!container) return true;
    return (
      container.scrollHeight - container.scrollTop - container.clientHeight < 50
    );
  };

  // Socket: receive messages
  useEffect(() => {
    if (!room || !sender) return;

    socket.emit("join_room", room);

    // Clear unread for current room
    dispatch(clearUnread(room));

    const handleMessage = (msg) => {
      if (!msg || !msg.sender || !msg.message) return;

      const senderId = msg.sender?._id || msg.sender;
      if (String(senderId) === String(sender)) return;

      const atBottom = isScrolledToBottom();

      // Update chat in React Query
      queryClient.setQueryData(["conversation", room], (oldData) => {
        const oldChat = oldData?.data?.chat || [];
        return { data: { ...oldData?.data, chat: [...oldChat, msg] } };
      });

      if (atBottom) {
        // Auto-scroll if user is at bottom
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      } else {
        // Show "new messages" banner
        setHasNewMessage(true);
      }

      // Increment unread count in Redux (header bell)
      dispatch(incrementUnread(msg.room));
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.emit("leave_room", room);
      socket.off("receive_message", handleMessage);
    };
  }, [room, sender, queryClient, dispatch]);

  // Scroll listener to hide banner if user scrolls to bottom manually
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrolledToBottom()) {
        setHasNewMessage(false);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Send message
  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !room || !sender) return;

    const msgData = { room, sender, message };
    console.log("this is a data to pass chats database", msgData);
    socket.emit("send_message", msgData);

    // Optimistic update
    queryClient.setQueryData(["conversation", room], (oldData) => {
      const oldChat = oldData?.data?.chat || [];
      return { data: { ...oldData?.data, chat: [...oldChat, msgData] } };
    });

    // Clear unread for this room
    dispatch(clearUnread(room));
    setMessage("");
  };

  if (isLoading)
    return <div className="p-4 text-gray-500">Loading messages...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Failed to load messages.</div>;

  return (
    <div className="relative flex flex-col h-full border border-gray-300 rounded overflow-hidden">
      {/* Chat messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-50"
      >
        {messages.map((msg, idx) => {
          const senderId = msg.sender?._id || msg.sender;
          const isMine = String(senderId) === String(sender);
          const senderName =
            (typeof msg.sender === "object" && msg.sender?.name) ||
            msg.senderName ||
            String(senderId);

          return (
            <div
              key={idx}
              className={`flex mb-2 ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-2xl max-w-[65%] shadow break-words whitespace-pre-wrap ${
                  isMine ? "bg-indigo-600 text-white" : "bg-blue-100 text-black"
                }`}
              >
                {!isMine && <div className="font-bold mb-1">{senderName}</div>}
                {msg.message}
              </div>
            </div>
          );
        })}
      </div>

      {/* New messages banner */}
      {hasNewMessage && (
        <div
          onClick={() => {
            chatContainerRef.current.scrollTop =
              chatContainerRef.current.scrollHeight;
            setHasNewMessage(false);
            dispatch(clearUnread(room));
          }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-2 rounded-full cursor-pointer shadow-md text-sm"
        >
          New messages ↓
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="flex-none flex p-4 border-t border-gray-300 bg-white"
      >
        <input
          type="text"
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="ml-4 px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          ➤
        </button>
      </form>
    </div>
  );
}
