import React, { useState, useEffect } from "react";
import { useMentees } from "../counselor/useMentee.js";
import ChatRoom from "../../components/ui/chatRoom.jsx";
import { Users, MessageCircle, Loader2 } from "lucide-react";

export default function MentorChat() {
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const mentorId = currentUser?._id;
  const mentorName = currentUser?.name || "Counselor";
  const mentorPhoto = currentUser?.photo;

  const mentorFirstName = mentorName.split(" ")[0];

  // Fetch assigned mentees
  const { data, isLoading, isError } = useMentees(mentorId);
  const mentees = data?.data?.mentees || [];

  // State
  const [selectedRoom, setSelectedRoom] = useState("");
  const [chatType, setChatType] = useState(""); // "group" or "private"

  // Group room name
  const groupRoomName = `${mentorFirstName}Group`;

  // Auto-select group chat on first load
  useEffect(() => {
    if (!selectedRoom && mentees.length >= 0) {
      setSelectedRoom(groupRoomName);
      setChatType("group");
    }
  }, [groupRoomName, selectedRoom, mentees.length]);

  // Handle room selection
  const handleSelectRoom = (type, menteeId = null) => {
    if (type === "group") {
      setSelectedRoom(groupRoomName);
      setChatType("group");
    } else if (type === "private" && menteeId) {
      const ids = [mentorId, menteeId].sort((a, b) => a.localeCompare(b));
      const privateRoom = `private_${ids.join("_")}`; // ← MUST match mentee side exactly!
      setSelectedRoom(privateRoom);
      setChatType("private");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading your mentees...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center max-w-md">
          <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Chat Error</h2>
          <p className="text-gray-600">Failed to load your mentees. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Messages</h3>
          <p className="text-sm text-gray-500 mt-1">Chat with your assigned mentees</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-3">
            {/* Group Chat */}
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
              <div>
                <h4 className="font-medium text-gray-900">{groupRoomName}</h4>
                <p className="text-xs text-gray-500">Group chat with all mentees</p>
              </div>
            </div>

            {/* Individual Mentees */}
            <div className="pt-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 px-1">
                Private Chats
              </p>
              {mentees.length === 0 ? (
                <p className="text-center text-gray-500 text-sm py-8">
                  No mentees assigned yet
                </p>
              ) : (
                mentees.map((mentee) => {
                  const privateRoom = `private_${[mentorId, mentee._id].sort().join("_")}`;
                  const isActive = chatType === "private" && selectedRoom === privateRoom;

                  return (
                    <div
                      key={mentee._id}
                      onClick={() => handleSelectRoom("private", mentee._id)}
                      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all
                        ${isActive
                          ? "bg-primary/10 border border-primary"
                          : "bg-gray-50 hover:bg-gray-100 border border-transparent"
                        }`}
                    >
                      <img
                        src={
                          mentee.photo
                            ? `/uploads/${mentee.photo}`
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(mentee.name)}&background=random&color=fff`
                        }
                        alt={mentee.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{mentee.name}</h4>
                        <p className="text-xs text-gray-500">1-on-1 conversation</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Current Counselor Info */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <img
              src={
                mentorPhoto
                  ? `/uploads/${mentorPhoto}`
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(mentorName)}&background=random&color=fff`
              }
              alt={mentorName}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">{mentorName}</p>
              <p className="text-xs text-gray-500">Counselor</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedRoom ? (
          <ChatRoom sender={mentorId} room={selectedRoom} />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500 text-lg">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}