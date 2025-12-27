// components/community/ForumChatPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MessageCircle, Users, Loader2 } from "lucide-react";
import { forumAPI } from "../../service/client";
import { forumChatAPI } from "../../service/client"; // updated API
import { socket } from "../../socket"; // your global or forum-specific socket instance

const FORUM_ROOM_PREFIX = "forum_";

export default function ForumChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = currentUser?._id;

  const roomName = `${FORUM_ROOM_PREFIX}${id}`;

  // Redirect if not logged in
  useEffect(() => {
    if (!userId) {
      navigate("/login", { state: { from: `/forum-chat/${id}` } });
    }
  }, [userId, id, navigate]);

  // Fetch forum details
  const {
    data: forumData,
    isLoading: forumLoading,
    error: forumError,
  } = useQuery({
    queryKey: ["forum", id],
    queryFn: () => forumAPI.getForum(id),
    enabled: !!id && !!userId,
    select: (res) => res.data?.data || res.data,
  });
  console.log("this is forum detail ", forumData);

  // Fetch chat history with React Query
  const {
    data: chatData,
    isLoading: chatLoading,
    error: chatError,
    refetch: refetchChat,
  } = useQuery({
    queryKey: ["forumChat", id],
    queryFn: () => forumChatAPI.getForumChatHistory(id),
    enabled: !!id && !!userId && !!forumData, // Only run after forum is confirmed to exist
    select: (res) => res.data?.messages || [],
    staleTime: 1000 * 30, // 30 seconds
    cacheTime: 1000 * 60 * 5, // 5 minutes
  });

  const [messages, setMessages] = useState([]);

  // Sync React Query data → local state
  useEffect(() => {
    if (chatData) {
      setMessages(chatData);
    }
  }, [chatData]);

  // Socket.IO: Join room & listen for new messages
  useEffect(() => {
    if (!userId || !id) return;

    socket.emit("join_room", roomName);

    const handleNewMessage = (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("receive_message", handleNewMessage);

    return () => {
      socket.emit("leave_room", roomName);
      socket.off("receive_message", handleNewMessage);
    };
  }, [roomName, userId]);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Loading state
  if (forumLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading forum...</p>
        </div>
      </div>
    );
  }

  // Forum not found (404)
  if (forumError || !forumData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center max-w-md px-4">
          <MessageCircle className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Forum Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            This forum may have been removed or is not available.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const forum = forumData;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Forums</span>
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {forum.header}
                </h3>
                {forum.subHeader && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {forum.subHeader}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              {forum.category && (
                <div>
                  <span className="font-medium text-gray-800">Category:</span>{" "}
                  {forum.category}
                </div>
              )}
              {forum.tags?.length > 0 && (
                <div>
                  <span className="font-medium text-gray-800">Tags:</span>{" "}
                  {forum.tags.join(", ")}
                </div>
              )}
            </div>

            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm font-medium text-amber-900">
                Anonymous Chat
              </p>
              <p className="text-xs text-amber-800 mt-1">
                Your identity is hidden. Be respectful.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">You</p>
              <p className="text-xs text-gray-500">Anonymous Participant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <MessageCircle className="w-16 h-16 text-gray-300 mb-6" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No messages yet
              </h3>
              <p className="text-gray-500 max-w-md">
                Be the first to start the conversation in{" "}
                <span className="font-semibold text-gray-700">
                  {forum.header}
                </span>
                . Everyone here is anonymous.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg._id} className="flex flex-col">
                <div className="flex items-baseline gap-3">
                  <span className="font-medium text-gray-900">
                    {msg.displayName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-gray-800 mt-1">{msg.message}</p>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.target.elements.message;
            const text = input.value.trim();
            if (!text) return;

            socket.emit("send_message", {
              room: roomName,
              message: text,
              sender: userId,
            });

            input.value = "";
          }}
          className="p-4 border-t border-gray-200"
        >
          <input
            name="message"
            type="text"
            placeholder="Type your message..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}
