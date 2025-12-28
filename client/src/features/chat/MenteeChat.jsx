
import React, { useState, useEffect } from "react";
import { useMentor } from "../admin/mentee/useMentor.jsx";
import ChatRoom from "../../components/ui/chatRoom.jsx";

import { MessageCircle, Users, Loader2 } from "lucide-react"; // Optional icons

export default function MenteeChat() {
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const senderId = currentUser?._id;
  const senderName = currentUser?.name || "You";

  const { data, isLoading, isError } = useMentor();

  // Extract mentor data safely
  const counseling = data?.data?.counseling;
  const mentor = counseling?.counselor; // populated User object
  const mentorId = mentor?._id;
  const mentorName = mentor?.name || "Your Mentor";
  const mentorPhoto = mentor?.photo;

  // State for selected chat
  const [selectedRoom, setSelectedRoom] = useState("");
  const [chatType, setChatType] = useState(""); // "group" or "private"

  // Generate room names
  const groupRoomName = mentorName ? `${mentorName.split(" ")[0]}Group` : "Group Chat";
  const privateRoomName = mentorId && senderId
    ? `private_${[mentorId, senderId].sort().join("_")}`
    : "";

  // Auto-select group chat on load if mentor exists
  useEffect(() => {
    if (mentor && !selectedRoom) {
      setSelectedRoom(groupRoomName);
      setChatType("group");
    }
  }, [mentor, groupRoomName, selectedRoom]);

  const handleSelectRoom = (type) => {
    if (type === "group") {
      setSelectedRoom(groupRoomName);
      setChatType("group");
    } else if (type === "private" && privateRoomName) {
      setSelectedRoom(privateRoomName);
      setChatType("private");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading your chat...</p>
        </div>
      </div>
    );
  }

  // Error or no mentor assigned
  if (isError || !mentor) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center max-w-md px-6">
          <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Chat Not Available
          </h2>
          <p className="text-gray-600">
            {isError
              ? "Failed to load mentor information."
              : "You don't have an assigned mentor yet."}
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Once a counselor is assigned, you'll be able to chat here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Chat List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Messages</h3>
          <p className="text-sm text-gray-500 mt-1">Chat with your counselor</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-3">
            {/* Group Chat Option */}
            <div
              onClick={() => handleSelectRoom("group")}
              className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all
                ${chatType === "group"
                  ? "bg-primary/10 border border-primary"
                  : "bg-gray-50 hover:bg-gray-100 border border-transparent"
                }`}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{groupRoomName}</h4>
                <p className="text-xs text-gray-500">Group discussion with all mentees</p>
              </div>
            </div>

            {/* Private Chat with Mentor */}
            <div
              onClick={() => handleSelectRoom("private")}
              className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all
                ${chatType === "private"
                  ? "bg-primary/10 border border-primary"
                  : "bg-gray-50 hover:bg-gray-100 border border-transparent"
                }`}
            >
              <img
                src={
                  mentorPhoto
                    ? `/uploads/${mentorPhoto}`
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(mentorName)}&background=random&color=fff`
                }
                alt={mentorName}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{mentorName}</h4>
                <p className="text-xs text-gray-500">Private 1-on-1 chat</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current User Info */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
              {senderName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{senderName}</p>
              <p className="text-xs text-gray-500">Mentee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedRoom ? (
          <ChatRoom sender={senderId} room={selectedRoom} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400 text-lg">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}