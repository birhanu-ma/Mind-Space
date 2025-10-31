import React from "react";
import { ToolDropDownItem } from "./DropDownList";
import { LearnDropDownItem } from "./DropDownList";
import { CommunityDropDownItem } from "./DropDownList";
import { Link } from "react-router-dom";

export function ToolDropDown({ setHover, setIsDropdownOpen }) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-6/7 flex flex-col">
      {ToolDropDownItem.map((list) => (
        <ul className="flex flex-col py-5 cursor-pointer ">
          <Link
            to={`/tool/$list.topic`}
            onClick={() => {
              setHover(false);
              setIsDropdownOpen(false);
            }}
          >
            <li className="text-white">{list.topic}</li>
          </Link>
        </ul>
      ))}
    </div>
  );
}
export function LearnDropDown({ setHover, setIsDropdownOpen }) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-6/7 flex flex-col">
      {LearnDropDownItem.map((list) => (
        <ul className="flex flex-col py-5 cursor-pointer ">
          <Link
            to={`/learn/${list.topic}`}
            onClick={() => {
              setHover(false);
              setIsDropdownOpen(false);
            }}
          >
            <li className="text-white">{list.topic}</li>
          </Link>
        </ul>
      ))}
    </div>
  );
}

function CommunityDropDown({ setHover, setIsDropdownOpen }) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-6/7 flex flex-col">
      {CommunityDropDownItem.map((list) => (
        <ul key={list.id} className="flex flex-col py-5 cursor-pointer ">
          <li className="text-white">
            <Link
              to={`/community/${list.topic}`}
              onClick={() => {
                setHover(false);
                setIsDropdownOpen(false);
              }}
            >
              {list.topic}
            </Link>
          </li>
        </ul>
      ))}
    </div>
  );
}
export default CommunityDropDown;
