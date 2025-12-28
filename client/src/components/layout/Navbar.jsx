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

  // Close profile dropdown when clicking outside
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

  // Determine if Dashboard should be shown: logged in AND role !== "user"
  const showDashboard = isLoggedIn && user?.role && user.role.toLowerCase() !== "user";

  return (
    <>
      <div className="fixed z-30 top-0 left-0 w-full bg-gray-800 shadow-md flex items-center justify-between h-16 px-4 sm:px-10">
        {/* Logo */}
        <Link to="/home" onClick={scrollToTop}>
          <h1 className="text-white font-bold text-xl cursor-pointer">MindSpace</h1>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden sm:flex items-center space-x-6">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item}
              to={`/${item.toLowerCase().replace(/\s+/g, "")}`}
              className="text-white hover:text-red-200 transition"
              onClick={scrollToTop}
            >
              {item}
            </NavLink>
          ))}

          {/* Dashboard Link - only for non-"user" roles */}
          {showDashboard && (
            <NavLink
              to={`/${user.role.toLowerCase()}`}
              className="text-white hover:text-red-200 transition font-medium"
              onClick={scrollToTop}
            >
              Dashboard
            </NavLink>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          {searchClicked ? (
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              className="w-60 h-8 rounded-full bg-white text-black placeholder-gray-500 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <PiMagnifyingGlassBold
              onClick={() => setSearchClicked(true)}
              className="text-white hover:text-red-200 cursor-pointer text-xl"
            />
          )}

          {/* Notification Bell */}
          {isLoggedIn && (
            <div className="relative">
              <Link to="/messages" onClick={scrollToTop}>
                <Bell className="h-6 w-6 text-white hover:text-indigo-300" />
                {totalUnread > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                    {totalUnread > 99 ? "99+" : totalUnread}
                  </span>
                )}
              </Link>
            </div>
          )}

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <img
              src={
                user?.photo
                  ? `http://localhost:5000/img/users/${user.photo}`
                  : "https://i.pravatar.cc/40"
              }
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-white object-cover"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            />

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                {isLoggedIn && user ? (
                  <>
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
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
                      {showDashboard && (
                        <li>
                          <Link
                            to={`/${user.role.toLowerCase()}`}
                            className="block px-4 py-2 hover:bg-gray-200"
                            onClick={() => setProfileMenuOpen(false)}
                          >
                            Dashboard
                          </Link>
                        </li>
                      )}
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
            <MdOutlineCancelPresentation className="text-red-600" size={28} />
          ) : (
            <RxHamburgerMenu className="text-white" size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-center sm:hidden z-50 space-y-4 py-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(/\s+/g, "")}`}
              className="text-white text-lg hover:text-red-200"
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToTop();
              }}
            >
              {item}
            </Link>
          ))}

          {/* Dashboard in Mobile Menu */}
          {showDashboard && (
            <Link
              to={`/${user.role.toLowerCase()}`}
              className="text-white text-lg font-medium hover:text-red-200 border-t border-gray-600 pt-4 w-full text-center"
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToTop();
              }}
            >
              Dashboard
            </Link>
          )}

          {/* Login/Signup if not logged in */}
          {!isLoggedIn && (
            <>
              <Link
                to="/loginForm"
                className="text-white text-lg hover:text-red-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white text-lg hover:text-red-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}