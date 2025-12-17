import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../../service/client";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { PiMagnifyingGlassBold } from "react-icons/pi";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.user);

  // UI state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

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
      {/* Background */}
      <div className="bg-[rgba(0,0,0,0.8)] fixed top-0 left-0 w-full h-15 z-10" />

      <div className="fixed z-30 top-0 left-0 w-full flex items-center justify-between h-15 px-4 sm:px-10">
        {/* Logo */}
        <Link to="/" onClick={scrollToTop}>
          <h1 className="text-white">MindSpace</h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-red-200" onClick={scrollToTop}>Home</Link>
          <Link to="/learn" className="text-white hover:text-red-200" onClick={scrollToTop}>Learn</Link>
          <Link to="/tool" className="text-white hover:text-red-200" onClick={scrollToTop}>Tool</Link>
          <Link to="/community" className="text-white hover:text-red-200" onClick={scrollToTop}>Community</Link>
          <Link to="/support" className="text-white hover:text-red-200" onClick={scrollToTop}>Support</Link>
          <Link to="/aboutus" className="text-white hover:text-red-200" onClick={scrollToTop}>About Us</Link>
          <Link to="/contact" className="text-white hover:text-red-200" onClick={scrollToTop}>Contact</Link>
        </div>

        {/* Right Side */}
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
                      className="block px-4 py-2 hover:bg-gray-200"
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
          className="sm:hidden ml-2"
        >
          {isMobileMenuOpen ? (
            <MdOutlineCancelPresentation className="text-red-600" />
          ) : (
            <RxHamburgerMenu className="text-white hover:text-red-200" />
          )}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black flex flex-col items-center sm:hidden z-50 space-y-4 py-4">
            <Link to="/" className="text-white" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/learn" className="text-white" onClick={() => setIsMobileMenuOpen(false)}>Learn</Link>
            <Link to="/tool" className="text-white" onClick={() => setIsMobileMenuOpen(false)}>Tool</Link>
            <Link to="/community" className="text-white" onClick={() => setIsMobileMenuOpen(false)}>Community</Link>
            <Link to="/support" className="text-white" onClick={() => setIsMobileMenuOpen(false)}>Support</Link>
            <Link to="/aboutus" className="text-white" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <Link to="/contact" className="text-white" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
