import React from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IconContext } from "react-icons";

function ChatCardRight() {
  return (
    <div className="my-5 ">
      <div className="grid grid-cols-[1fr_10fr] bg-[#FFFF] gap-4 m-5">
        <div className="w-6 h-6 sm:w-50 sm:h-50 bg-[#F0FFFF] rounded-full">
          <IconContext.Provider
            value={{
              size: "text-xl sm:text-6xl md:text-8xl",
              color: "#908686",
            }}
          >
            <IoPersonCircleSharp />
          </IconContext.Provider>
        </div>
        <p className="flex items-center bg-[#E0FFFF] rounded-bl-[25%] rounded-tr-[25%] p-10">
          What's it like for you guys? Do you ever feel anxious about things?
          What triggers it, and how do you usually cope? It would be good to
          hear different perspectives and maybe even some tips on how we can
          support each other when we're feeling anxious. Knowing we're not alone
          in this can sometimes make a big difference.
        </p>
      </div>
    </div>
  );
}

export default ChatCardRight;
