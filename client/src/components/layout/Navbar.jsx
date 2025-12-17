import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { logout } from "../../store/userSlice";
import { authAPI } from "../../service/client";

const NAV_ITEMS = ["Home", "Learn", "Tool", "Community", "Support", "About Us", "Contact"];

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, user } = useSelector((state) => state.user || {});
  const unreadByRoom = useSelector((state) => state.notifications?.unreadByRoom || {});
  const totalUnread = Object.values(unreadByRoom).reduce((a, b) => a + b, 0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "instant" });

  // Logout mutation
  const { mutate: logoutMutate, isLoading: loggingOut } = useMutation({
    mutationFn: () => authAPI.logout(),
    onSuccess: () => {
      dispatch(logout());
      setProfileMenuOpen(false);
      navigate("/loginForm");
    },
    onError: (err) => {
      console.error("Logout failed:", err);
      alert(err.response?.data?.message || "Logout failed");
    },
  });

  const handleLogout = () => logoutMutate();

  return (
    <>
      <div className="fixed z-30 top-0 left-0 w-full bg-gray-800 shadow-md flex items-center justify-between h-16 px-4 sm:px-10">
        {/* Logo */}
        <Link to="/" onClick={scrollToTop}>
          <h1 className="text-white font-bold text-xl cursor-pointer">MindSpace</h1>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden sm:flex items-center space-x-6">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item}
              to={`/${item.toLowerCase().replace(/\s+/g, "")}`}
              className="text-white hover:text-red-200"
              onClick={scrollToTop}
            >
              {item}
            </NavLink>
          ))}
        </div>

        {/* Right side */}
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
              onClick={() => setSearchClicked(true)}
              className="text-white hover:text-red-200 cursor-pointer"
            />
          )}

          {/* Notification Bell */}
          {isLoggedIn && (
            <div className="relative">
              <Link to="/messages">
                <Bell className="h-6 w-6 text-white hover:text-indigo-300" />
                {totalUnread > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                    {totalUnread}
                  </span>
                )}
              </Link>
            </div>
          )}

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            {console.log("this is the user profile photo", user.photo)}
            <img

              src={
                user?.photo
                  ? `http://localhost:5000/img/users/${user.photo}`
                  : "https://i.pravatar.cc/40"
              }
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            />

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                {isLoggedIn && user ? (
                  <>
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                    <ul>
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-200"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 hover:bg-gray-200"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          Settings
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          disabled={loggingOut}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                        >
                          {loggingOut ? "Logging out..." : "Logout"}
                        </button>
                      </li>
                    </ul>
                  </>
                ) : (
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="sm:hidden ml-2 text-white"
        >
          {isMobileMenuOpen ? (
            <MdOutlineCancelPresentation className="text-red-600" size={24} />
          ) : (
            <RxHamburgerMenu className="text-white" size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-center sm:hidden z-50 space-y-4 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(/\s+/g, "")}`}
              className="text-white text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
