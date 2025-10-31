// ChatCardLeft.jsx
import React from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IconContext } from "react-icons";

function ChatCardLeft({ chat }) {
  return (
    <div className="sm:m-5 flex justify-end">
      <div className="grid grid-cols-[10fr_1fr] bg-[#FFFF] gap-4 sm:m-5">
        <p className="flex items-center bg-[#E0FFFF] rounded-br-[25%] rounded-tl-[25%] p-5 sm:p-10">
          {chat.text}
        </p>
        <div className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#F0FFFF] rounded-full flex items-center justify-center">
          <IconContext.Provider
            value={{
              size: "text-xl sm:text-3xl md:text-4xl",
              color: "#908686",
            }}
          >
            <IoPersonCircleSharp />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default ChatCardLeft;