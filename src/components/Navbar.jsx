import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AppContext } from "../AppContext";

const navLinks = [
  { to: "/", label: "Home", exact: true },
  { to: "/rooms", label: "Rooms" },
  { to: "/dining", label: "Dining" },
  { to: "/amenities", label: "Spa & Amenities" },
  { to: "/explorer", label: "Floor Map" },
  { to: "/admin", label: "Admin Portal" },
];

export default function Navbar() {
  const { requests } = useContext(AppContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const isAdmin = location.pathname.startsWith("/admin");
  const isHomePage = location.pathname === "/";

  // On home page, navbar starts transparent; elsewhere it's always solid
  const alwaysSolid = !isHomePage;
  const showSolidBg = alwaysSolid || isScrolled || isMobileOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          showSolidBg
            ? "bg-surface/95 backdrop-blur-md shadow-sm border-outline-variant/60"
            : "bg-transparent border-transparent"
        }`}
      >
        <nav className="flex justify-between items-center w-full px-6 md:px-16 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className={`font-serif text-xl md:text-2xl font-bold tracking-tighter transition-colors duration-150 uppercase ${
              showSolidBg ? "text-primary" : "text-white"
            }`}
          >
            LUXE RESERVE
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                className={({ isActive }) =>
                  `font-sans text-xs font-semibold tracking-wider uppercase pb-1 transition-colors duration-150 border-b-2 hover:text-secondary ${
                    isActive
                      ? "border-secondary text-primary"
                      : `border-transparent ${showSolidBg ? "text-on-surface-variant" : "text-white/80 hover:text-white"}`
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Link
              to="/admin"
              className={`relative flex items-center transition-colors ${
                showSolidBg ? "text-primary" : "text-white hover:text-secondary"
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              {requests.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                  {requests.length}
                </span>
              )}
            </Link>

            {/* Account */}
            <div className="hidden md:flex items-center space-x-2">
              <span className={`material-symbols-outlined text-[22px] ${showSolidBg ? "text-primary" : "text-white"}`}>
                account_circle
              </span>
              <span className={`hidden xl:inline text-xs font-semibold tracking-widest uppercase ${showSolidBg ? "text-primary" : "text-white"}`}>
                {isAdmin ? "Staff Concierge" : "Suite 402"}
              </span>
            </div>

            {/* Book Now CTA (desktop) */}
            <Link
              to="/rooms"
              className="hidden lg:inline-flex items-center bg-secondary text-white px-5 py-2.5 font-sans text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all rounded-sm"
            >
              Book Now
            </Link>

            {/* Hamburger Button (mobile) */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 transition-colors ${
                showSolidBg ? "text-primary" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMobileOpen ? "w-5 rotate-45 translate-y-2" : "w-5"
                }`}
              />
              <span
                className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMobileOpen ? "opacity-0 w-0" : "w-4"
                }`}
              />
              <span
                className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMobileOpen ? "w-5 -rotate-45 -translate-y-2" : "w-5"
                }`}
              />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 bg-surface/98 backdrop-blur-lg border-t border-outline-variant ${
            isMobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-6 flex flex-col gap-1 max-w-7xl mx-auto">
            {navLinks.map((link, i) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                className={({ isActive }) =>
                  `py-3 px-4 font-sans text-sm font-semibold tracking-wider uppercase transition-all duration-200 border-l-2 ${
                    isActive
                      ? "border-secondary text-primary bg-surface-container"
                      : "border-transparent text-on-surface-variant hover:text-primary hover:border-secondary hover:bg-surface-container"
                  }`
                }
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-4 pt-4 border-t border-outline-variant">
              <Link
                to="/rooms"
                className="block w-full bg-primary text-on-primary py-4 text-center font-sans text-xs font-bold uppercase tracking-widest rounded-sm"
              >
                Reserve a Suite
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
