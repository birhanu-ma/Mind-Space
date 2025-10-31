import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import CommunityDropDown from "./DropDown";
import { LearnDropDown } from "./DropDown";
import { ToolDropDown } from "./DropDown";

function Navbar() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  return (
    <>
      <div
        className={`bg-[rgba(0,0,0,0.8)] fixed top-0 left-0 w-full transition-[height] duration-10 ease-in-out ${
          isDropdownOpen || isMobileMenuOpen
            ? "h-100 sm:h-96 transition-all duration-100 "
            : "h-15"
        } z-10`}
      ></div>

      <div className=" fixed z-30  top-0 left-0 w-full flex items-center justify-between h-15">
        <Link to="/" onClick={scrollToTop}>
          <h1 className="text-white ml-10">MindSpace</h1>
        </Link>
        {searchClicked ? (
          <MdOutlineCancelPresentation
            onClick={() => setSearchClicked(!searchClicked)}
            className="mr-4 sm:mr-7 cursor-pointer text-red-600"
          />
        ) : (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden absolute top-center left-114 cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <MdOutlineCancelPresentation className="mr-4 text-red-600" />
            ) : (
              <RxHamburgerMenu className="text-white mr-4 hover:text-red-200" />
            )}
          </button>
        )}

        {searchClicked ? (
          <input
            type="text"
            placeholder="search...."
            className="hidden absolute left-40 sm:block w-[80%] h-8 rounded-full bg-white text-black placeholder-gray-500 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <div
            className={`${
              isMobileMenuOpen
                ? "absolute z-50  top-full left-0 w-full transition-opacity duration-300 ease-in-out"
                : "hidden"
            } sm:block  flex flex-row`}
          >
            <ul
              className={`${
                isMobileMenuOpen
                  ? "flex w-full space-y-4 sm:space-y-9 flex-col transition-opacity duration-300 ease-in-out"
                  : "sm:flex-row"
              } flex items-center sm:space-x-9 sm:mr-30`}
            >
              <li className=" text-white hover:text-red-200 cursor-pointer">
                {" "}
                <Link
                  to="/"
                  onClick={() => {
                    scrollToTop();
                    setIsMobileMenuOpen(false);
                    setIsDropdownOpen(false);
                    setHover(false);
                  }}
                >
                  home
                </Link>
              </li>
              <div className="flex flex-row ">
                <li className="text-white hover:text-red-200  cursor-pointer">
                  <Link
                    to="/learn"
                    onClick={() => {
                      scrollToTop();
                      setIsMobileMenuOpen(false);
                      setIsDropdownOpen(false);
                      setHover(false);
                    }}
                  >
                    learn
                  </Link>
                </li>
                <IoMdArrowDropdown
                  onMouseEnter={() => {
                    setHover(true);
                    setHoverIndex(1);
                    setIsDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                    setIsDropdownOpen(false);
                  }}
                  className="text-white cursor-pointer hover:text-red-200"
                  style={{ marginTop: 7 }}
                />
              </div>
              <div className="flex flex-row ">
                <li className=" text-white hover:text-red-200  cursor-pointer">
                  <Link
                    to="/tool"
                    onClick={() => {
                      scrollToTop();
                      setIsMobileMenuOpen(false);
                      setIsDropdownOpen(false);
                      setHover(false);
                    }}
                  >
                    tool
                  </Link>
                </li>
                <IoMdArrowDropdown
                  onMouseEnter={() => {
                    setHover(true);
                    setHoverIndex(2);
                    setIsDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                    setIsDropdownOpen(false);
                  }}
                  className="text-white  cursor-pointer hover:text-red-200"
                  style={{ marginTop: 7 }}
                />
              </div>
              <div className="flex flex-row ">
                <li className="text-white hover:text-red-200  cursor-pointer">
                  <Link
                    to="/community"
                    onClick={() => {
                      scrollToTop();
                      setIsMobileMenuOpen(false);
                      setIsDropdownOpen(false);
                      setHover(false);
                    }}
                  >
                    community
                  </Link>
                </li>
                <IoMdArrowDropdown
                  onMouseEnter={() => {
                    setHover(true);
                    setHoverIndex(3);
                    setIsDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                    setIsDropdownOpen(false);
                  }}
                  className="text-white cursor-pointer hover:text-red-200"
                  style={{ marginTop: 7 }}
                />
              </div>

              <li className=" text-white hover:text-red-200 cursor-pointer">
                <Link
                  to="/support"
                  onClick={() => {
                    scrollToTop();
                    setIsMobileMenuOpen(false);
                    setIsDropdownOpen(false);
                    setHover(false);
                  }}
                >
                  support
                </Link>
              </li>
              <li className=" text-white hover:text-red-200 cursor-pointer">
                <Link
                  to="/aboutus"
                  onClick={() => {
                    scrollToTop();
                    setIsMobileMenuOpen(false);
                    setIsDropdownOpen(false);
                    setHover(false);
                  }}
                >
                  about us
                </Link>
              </li>
              <li className=" text-white hover:text-red-200  cursor-pointer">
                <Link
                  to="/contact"
                  onClick={() => {
                    scrollToTop();
                    setIsMobileMenuOpen(false);
                    setIsDropdownOpen(false);
                    setHover(false);
                  }}
                >
                  contact
                </Link>
              </li>
              <Link
                to="/Register"
                onClick={() => {
                  scrollToTop();
                  setIsMobileMenuOpen(false);
                  setIsDropdownOpen(false);
                  setHover(false);
                }}
              >
                <li className=" text-white hover:text-red-200 bg-blue-500 rounded  cursor-pointer">
                  Register/Login
                </li>
              </Link>
            </ul>
          </div>
        )}
        {searchClicked ? (
          <input
            type="text"
            placeholder="search...."
            className="absolute left-35 sm:block w-[60%] h-8 rounded-full bg-white text-black placeholder-gray-500 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <PiMagnifyingGlassBold
            onClick={() => setSearchClicked(!searchClicked)}
            className="text-white hover:text-red-200 absolute top-center left-60 sm:left-305 sm:top-center cursor-pointer"
          />
        )}

        {hover && (
          <div
            className="hidden sm:block fixed top-10 h-80 w-full shadow-lg z-50 overflow-hidden"
            onMouseEnter={() => {
              setHover(true);
              setIsDropdownOpen(true);
            }}
            onMouseLeave={() => {
              setHover(false);
              setIsDropdownOpen(false);
            }}
          >
            <div
              className={`flex justify-center items-center h-full w-full transition-opacity duration-300 ease-in-out ${
                isDropdownOpen ? "opacity-100 delay-300" : "opacity-0 delay-0"
              }`}
            >
              <div className="w-full max-w-screen-xl px-4">
                {hoverIndex === 1 && (
                  <LearnDropDown
                    setHover={setHover}
                    setIsDropdownOpen={setIsDropdownOpen}
                  />
                )}
                {hoverIndex === 2 && (
                  <ToolDropDown
                    setHover={setHover}
                    setIsDropdownOpen={setIsDropdownOpen}
                  />
                )}
                {hoverIndex === 3 && (
                  <CommunityDropDown
                    setHover={setHover}
                    setIsDropdownOpen={setIsDropdownOpen}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
