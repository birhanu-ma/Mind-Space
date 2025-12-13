import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom"; // ✅ import useNavigate
import { authAPI } from "../../service/client";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { IoMdArrowDropdown } from "react-icons/io";
import CommunityDropDown from "./DropDown";
import { LearnDropDown, ToolDropDown } from "./DropDown";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ useNavigate hook
  const { isLoggedIn, user } = useSelector((state) => state.user);

  // Local UI state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "instant" });

  // React Query mutation for logout
  const { mutate: logoutMutate, isLoading: loggingOut } = useMutation({
    mutationFn: () => authAPI.logout(),
    onSuccess: () => {
      dispatch(logout());
      setProfileMenuOpen(false);
      navigate("/loginForm"); // ✅ redirect to login after logout
    },
    onError: (err) => {
      console.error("Logout failed:", err);
      alert(err.response?.data?.message || "Logout failed");
    },
  });

  const handleLogout = () => {
    logoutMutate();
  };

  return (
    <>
      {/* Background overlay */}
      <div
        className={`bg-[rgba(0,0,0,0.8)] fixed top-0 left-0 w-full transition-[height] duration-10 ease-in-out ${
          isDropdownOpen || isMobileMenuOpen ? "h-100 sm:h-96 transition-all duration-100" : "h-15"
        } z-10`}
      ></div>

      <div className="fixed z-30 top-0 left-0 w-full flex items-center justify-between h-15 px-4 sm:px-10">
        {/* Logo */}
        <Link to="/" onClick={scrollToTop}>
          <h1 className="text-white">MindSpace</h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-red-200" onClick={scrollToTop}>Home</Link>

          {/* Learn Dropdown */}
          <div
            className="relative flex items-center cursor-pointer text-white hover:text-red-200"
            onMouseEnter={() => { setHover(true); setHoverIndex(1); setIsDropdownOpen(true); }}
            onMouseLeave={() => { setHover(false); setIsDropdownOpen(false); }}
          >
            <Link to="/learn" onClick={scrollToTop}>Learn</Link>
            <IoMdArrowDropdown className="ml-1" />
          </div>

          {/* Tool Dropdown */}
          <div
            className="relative flex items-center cursor-pointer text-white hover:text-red-200"
            onMouseEnter={() => { setHover(true); setHoverIndex(2); setIsDropdownOpen(true); }}
            onMouseLeave={() => { setHover(false); setIsDropdownOpen(false); }}
          >
            <Link to="/tool" onClick={scrollToTop}>Tool</Link>
            <IoMdArrowDropdown className="ml-1" />
          </div>

          {/* Community Dropdown */}
          <div
            className="relative flex items-center cursor-pointer text-white hover:text-red-200"
            onMouseEnter={() => { setHover(true); setHoverIndex(3); setIsDropdownOpen(true); }}
            onMouseLeave={() => { setHover(false); setIsDropdownOpen(false); }}
          >
            <Link to="/community" onClick={scrollToTop}>Community</Link>
            <IoMdArrowDropdown className="ml-1" />
          </div>

          <Link to="/support" className="text-white hover:text-red-200" onClick={scrollToTop}>Support</Link>
          <Link to="/aboutus" className="text-white hover:text-red-200" onClick={scrollToTop}>About Us</Link>
          <Link to="/contact" className="text-white hover:text-red-200" onClick={scrollToTop}>Contact</Link>
        </div>

        {/* Right side: Search + Profile */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          {searchClicked ? (
            <input
              type="text"
              placeholder="Search..."
              className="w-60 h-8 rounded-full bg-white text-black placeholder-gray-500 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <PiMagnifyingGlassBold
              onClick={() => setSearchClicked(!searchClicked)}
              className="text-white hover:text-red-200 cursor-pointer"
            />
          )}

          {/* Profile */}
          <div className="relative">
            <img
              src={user?.avatar || "https://i.pravatar.cc/40"}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            />
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/settings"
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                      onClick={handleLogout}
                      disabled={loggingOut}
                    >
                      {loggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </>
                ) : (
                  <Link
                    to="/Register"
                    className="block w-full px-4 py-2 hover:bg-gray-200"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Sign Up 
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="sm:hidden ml-2 cursor-pointer"
        >
          {isMobileMenuOpen ? (
            <MdOutlineCancelPresentation className="text-red-600" />
          ) : (
            <RxHamburgerMenu className="text-white hover:text-red-200" />
          )}
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black flex flex-col items-center sm:hidden z-50 space-y-4 py-4">
            <Link to="/" className="text-white hover:text-red-200" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/learn" className="text-white hover:text-red-200" onClick={() => setIsMobileMenuOpen(false)}>Learn</Link>
            <Link to="/tool" className="text-white hover:text-red-200" onClick={() => setIsMobileMenuOpen(false)}>Tool</Link>
            <Link to="/community" className="text-white hover:text-red-200" onClick={() => setIsMobileMenuOpen(false)}>Community</Link>
            <Link to="/support" className="text-white hover:text-red-200" onClick={() => setIsMobileMenuOpen(false)}>Support</Link>
            <Link to="/aboutus" className="text-white hover:text-red-200" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <Link to="/contact" className="text-white hover:text-red-200" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          </div>
        )}

        {/* Desktop dropdown panels */}
        {hover && (
          <div
            className="hidden sm:block fixed top-10 h-80 w-full shadow-lg z-50 overflow-hidden"
            onMouseEnter={() => { setHover(true); setIsDropdownOpen(true); }}
            onMouseLeave={() => { setHover(false); setIsDropdownOpen(false); }}
          >
            <div className={`flex justify-center items-center h-full w-full transition-opacity duration-300 ease-in-out ${isDropdownOpen ? "opacity-100 delay-300" : "opacity-0 delay-0"}`}>
              <div className="w-full max-w-screen-xl px-4">
                {hoverIndex === 1 && <LearnDropDown setHover={setHover} setIsDropdownOpen={setIsDropdownOpen} />}
                {hoverIndex === 2 && <ToolDropDown setHover={setHover} setIsDropdownOpen={setIsDropdownOpen} />}
                {hoverIndex === 3 && <CommunityDropDown setHover={setHover} setIsDropdownOpen={setIsDropdownOpen} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
