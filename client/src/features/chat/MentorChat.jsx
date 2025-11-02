import React, { useState } from "react";
import { useMentees } from "../Counselor/useMentee.jsx";
import ChatRoom from "../../components/ui/chatRoom.jsx";

export default function MentorChat() {
  const Mentor = JSON.parse(localStorage.getItem("student"));

  const mentorName = Mentor.name;
  const mentorId = Mentor._id;

  const mentorFirstName = mentorName.split(" ")[0];
  const senderId = Mentor._id;
  console.log("this is mentor id", senderId);
  const [query] = useState({ q: "", sort: "name", page: 1, limit: 10 });
  const { data, isLoading, isError } = useMentees(query);
  const menteeList = data?.data?.mentees || [];

  const [selectedRoom, setSelectedRoom] = useState(`${mentorFirstName}Group`);
  const [chatType, setChatType] = useState("group");

  const handleSelectRoom = (type, menteeId = null) => {
    if (type === "group") {
      setSelectedRoom(`${mentorFirstName}Group`);
      setChatType("group");
    } else if (type === "private" && menteeId) {
      const ids = [mentorId, menteeId].sort((a, b) =>
        a.toString().localeCompare(b.toString())
      );
      const roomId = `chat_${ids[0]}_${ids[1]}`;
      setSelectedRoom(roomId);
      setChatType("private");
    }
  };

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

          {/* Individual mentees */}
          {isLoading && <Spinner />}
          {isError && <p className="text-red-500">Failed to load mentees.</p>}
          {menteeList.map((m) => {
            const roomId = `chat_${[mentorId, m._id]
              .sort((a, b) => a.toString().localeCompare(b.toString()))
              .join("_")}`;
            return (
              <div
                key={m._id}
                className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${
                  chatType === "private" && selectedRoom === roomId
                    ? "bg-gray-200 font-medium"
                    : "bg-white"
                }`}
                onClick={() => handleSelectRoom("private", m._id)}
              >
                {m.name}
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Room */}
      <div className="flex-1">
        {selectedRoom && <ChatRoom sender={senderId} room={selectedRoom} />}
      </div>
    </div>
  );
}
