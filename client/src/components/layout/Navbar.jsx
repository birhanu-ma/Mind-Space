import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { Bell, User, Settings, LayoutDashboard, LogOut, Menu, X, ChevronDown } from "lucide-react";
import { logout } from "../../store/userSlice";
import { authAPI } from "../../service/client";

const BASE_NAV_ITEMS = [
  { name: "Home", path: "/home" },
  { name: "Learn", path: "/learn" },
  { name: "Tool", path: "/tool" },
  { name: "Community", path: "/community" },
  { name: "Support", path: "/support" },
  { name: "About Us", path: "/aboutus" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, user } = useSelector((state) => state.user || {});
  const unreadByRoom = useSelector((state) => state.notifications?.unreadByRoom || {});
  const totalUnread = Object.values(unreadByRoom).reduce((a, b) => a + b, 0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Logic to determine the Dashboard Route
  const showDashboard = isLoggedIn && user?.role && user.role.toLowerCase() !== "user";
  const dashboardPath = showDashboard ? `/${user.role.toLowerCase()}` : null;

  // Combine base items with Dashboard if applicable
  const navItems = dashboardPath 
    ? [...BASE_NAV_ITEMS, { name: "Dashboard", path: dashboardPath, isSpecial: true }] 
    : BASE_NAV_ITEMS;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "instant" });

  const { mutate: logoutMutate, isLoading: loggingOut } = useMutation({
    mutationFn: () => authAPI.logout(),
    onSuccess: () => {
      dispatch(logout());
      setProfileMenuOpen(false);
      setIsMobileMenuOpen(false);
      navigate("/loginForm");
    },
  });

  const handleLogout = () => logoutMutate();

  return (
    <>
      <nav className="fixed z-50 top-0 inset-x-0 h-16 bg-slate-900 border-b border-white/10 flex items-center shadow-lg px-4 sm:px-10">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" onClick={scrollToTop} className="flex items-center gap-2">
            <h1 className="text-white font-black text-2xl tracking-tighter cursor-pointer">
              Mind<span className="text-indigo-400">Space</span>
            </h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  px-4 py-2 text-sm font-medium rounded-full transition-all
                  ${isActive 
                    ? "text-white bg-white/10" 
                    : item.isSpecial ? "text-indigo-400 hover:bg-indigo-500/10" : "text-slate-400 hover:text-white hover:bg-white/5"}
                `}
                onClick={scrollToTop}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {isLoggedIn && (
              <Link to="/messages" className="relative p-2 text-slate-400 hover:text-white">
                <Bell size={22} />
                {totalUnread > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-[10px] font-bold text-white h-4 w-4 flex items-center justify-center rounded-full">
                    {totalUnread > 99 ? "99+" : totalUnread}
                  </span>
                )}
              </Link>
            )}

            <div className="relative hidden sm:block" ref={dropdownRef}>
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-800 border border-white/10 hover:border-white/20 transition-all"
              >
                <img
                  src={user?.photo ? `https://mind-space-atfn.onrender.com/img/users/${user.photo}` : "https://i.pravatar.cc/100"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border border-indigo-400/50"
                />
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${profileMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden">
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-3 border-b border-white/5 mb-1">
                        <p className="text-sm font-bold text-white truncate">{user.name}</p>
                        <p className="text-[10px] text-indigo-400 uppercase tracking-widest font-black">{user.role}</p>
                      </div>
                      <DropdownItem to="/profile" icon={<User size={16}/>} label="Profile" onClick={() => setProfileMenuOpen(false)} />
                      <DropdownItem to="/settings" icon={<Settings size={16}/>} label="Settings" onClick={() => setProfileMenuOpen(false)} />
                      {showDashboard && (
                        <DropdownItem to={dashboardPath} icon={<LayoutDashboard size={16}/>} label="Dashboard" onClick={() => setProfileMenuOpen(false)} />
                      )}
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 transition-colors">
                        <LogOut size={16} /> Logout
                      </button>
                    </>
                  ) : (
                    <DropdownItem to="/register" icon={<User size={16}/>} label="Sign Up" onClick={() => setProfileMenuOpen(false)} />
                  )}
                </div>
              )}
            </div>

            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-300 hover:text-white">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-0 z-[60] bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div className={`fixed top-0 right-0 h-full w-[280px] bg-slate-900 z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 bg-slate-800/50 border-b border-white/10">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-white font-bold text-lg">Account</h2>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {isLoggedIn ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={user?.photo ? `https://mind-space-atfn.onrender.com/img/users/${user.photo}` : "https://i.pravatar.cc/100"}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-indigo-500 object-cover"
                  />
                  <div>
                    <p className="text-white font-bold truncate">{user.name}</p>
                    <p className="text-xs text-indigo-400 uppercase font-black tracking-tighter">{user.role}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <MobileActionLink to="/profile" icon={<User size={14}/>} label="Profile" onClick={() => setIsMobileMenuOpen(false)} />
                    <MobileActionLink to="/settings" icon={<Settings size={14}/>} label="Settings" onClick={() => setIsMobileMenuOpen(false)} />
                </div>
              </div>
            ) : (
              <Link to="/register" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <User size={18} /> Sign Up
              </Link>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">Navigation</p>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block py-3 px-4 rounded-xl text-lg font-bold transition-all ${item.isSpecial ? "text-indigo-400 bg-indigo-500/5" : "text-slate-300 hover:text-white hover:bg-white/5"}`}
                onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToTop();
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {isLoggedIn && (
            <div className="p-6 border-t border-white/10">
              <button onClick={handleLogout} disabled={loggingOut} className="w-full py-4 text-red-400 font-bold flex items-center justify-center gap-2 hover:bg-red-500/10 rounded-xl transition-all">
                <LogOut size={20} /> {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="h-16 w-full" />
    </>
  );
}

function DropdownItem({ to, icon, label, onClick }) {
  return (
    <Link to={to} onClick={onClick} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
      {icon} {label}
    </Link>
  );
}

function MobileActionLink({ to, icon, label, onClick }) {
    return (
        <Link to={to} onClick={onClick} className="flex items-center justify-center gap-2 py-2 bg-slate-700/50 rounded-lg text-xs font-bold text-white hover:bg-slate-700">
            {icon} {label}
        </Link>
    )
}