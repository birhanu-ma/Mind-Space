
import React, { useState } from "react";
import { useMentor } from "../mentee/useMentor.jsx";
import ChatRoom from "../../components/ui/chatRoom.jsx";

export default function MenteeChat() {
  const Mentee = JSON.parse(localStorage.getItem("student"));
  const senderId = Mentee?._id;

  const { data, isLoading, isError } = useMentor();
  const mentorFullName = data?.data?.mentor?.name || "";
  const mentorId = data?.data?.mentor?._id || "";
  const mentorFirstName = mentorFullName.split(" ")[0] || "Mentor";

  const [selectedRoom, setSelectedRoom] = useState(`${mentorFirstName}Group`);
  const [chatType, setChatType] = useState("group");

  const handleSelectRoom = (type) => {
    if (type === "group") {
      setSelectedRoom(`${mentorFirstName}Group`);
      setChatType("group");
    } else if (type === "private") {
      const ids = [mentorId, senderId].sort((a, b) =>
        a.toString().localeCompare(b.toString())
      );
      const roomId = `chat_${ids[0]}_${ids[1]}`;
      setSelectedRoom(roomId);
      setChatType("private");
    }
  };

  if (isLoading) return <Spinner />;
  if (isError)
    return <p className="text-red-500 p-4">Failed to load mentor.</p>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-300 p-4">
        <h4 className="text-lg font-semibold mb-4">Chats</h4>

        <div className="flex flex-col space-y-2">
          {/* Group chat */}
          <div
            className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${
              chatType === "group" ? "bg-gray-200 font-medium" : "bg-white"
            }`}
            onClick={() => handleSelectRoom("group")}
          >
            {`${mentorFirstName}Group`}
          </div>

          {/* Private chat with mentor */}
          <div
            className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${
              chatType === "private" ? "bg-gray-200 font-medium" : "bg-white"
            }`}
            onClick={() => handleSelectRoom("private")}
          >
            {mentorFullName}
          </div>
        </div>
      </div>

      {/* Chat Room */}
      <div className="flex-1">
        {selectedRoom && <ChatRoom sender={senderId} room={selectedRoom} />}
      </div>
    </div>
  );
}
