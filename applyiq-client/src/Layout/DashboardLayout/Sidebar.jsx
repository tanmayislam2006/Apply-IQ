import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaTimes,
  FaAngleRight,
  FaAngleLeft,
} from "react-icons/fa";
import { Link, NavLink } from "react-router";
import classNames from "classnames";
import ApplyIQ from "../../Components/ApplyIQ/ApplyIQ";
import Logo from "../../assets/logo.png";

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const routes = [
    { path: "/dashboard", label: "Home", icon: <FaHome />, end: true },
    { path: "/dashboard/profile", label: "Profile", icon: <FaUser /> },
  ];

  const linkBaseStyle =
    "flex items-center gap-3 px-3 py-2 rounded-md transition-all";
  const linkCollapsedStyle = "justify-center text-xl";
  const linkExpandedStyle = "text-base";

  return (
    <>
      {/* 🔹 Mobile Sidebar - visible only on small screens */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 bg-opacity-40 md:hidden">
          <div className="fixed top-0 left-0 h-full w-64 bg-white p-4 z-50 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={() => setIsMobileOpen(false)}>
                <FaTimes size={18} />
              </button>
            </div>
            <ul className="space-y-2">
              {routes.map((route) => (
                <li key={route.path}>
                  <NavLink
                    to={route.path}
                    onClick={() => setIsMobileOpen(false)} // 👈 Closes sidebar after clicking link
                    className={({ isActive }) =>
                      classNames(
                        linkBaseStyle,
                        "text-gray-700 hover:bg-gray-100",
                        {
                          "bg-primary/10 text-primary font-medium": isActive,
                        }
                      )
                    }
                  >
                    <span className="text-lg">{route.icon}</span>
                    <span>{route.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 🔹 Desktop Sidebar - collapsible on medium and large screens */}
      <aside
        className={classNames(
          "hidden md:flex flex-col h-full bg-white shadow transition-all duration-300 overflow-y-auto",
          {
            "w-20": isCollapsed, // 👈 Collapsed width
            "w-64": !isCollapsed, // 👈 Expanded width
          }
        )}
      >
        {/* 🔸 Logo or App Name */}
        <div className="flex items-center justify-center h-16 border-b">
          {isCollapsed ? (
            // Logo only when collapsed
            <Link to={"/"} className="flex items-center">
              <img src={Logo} className="w-10 h-10" alt="Logo" />
            </Link>
          ) : (
            // Show brand text or component when expanded
            <ApplyIQ />
          )}
        </div>

        {/* 🔸 Collapse Toggle Button */}
        <div className="flex justify-end px-2 py-3 text-black">
          <button
            className="text-xl cursor-pointer px-2 py-1 rounded hover:bg-gray-300 transition"
            onClick={() => setIsCollapsed((prev) => !prev)} // 👈 Toggles collapse state
          >
            {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
          </button>
        </div>

        {/* 🔸 Navigation Links */}
        <nav className="flex-1 px-2 space-y-2">
          {routes.map((route) => (
            <NavLink
              key={route.path}
              end={route.end} // 👈 Ensures only exact match for Home
              to={route.path}
              className={({ isActive }) =>
                classNames(
                  linkBaseStyle,
                  isCollapsed ? linkCollapsedStyle : linkExpandedStyle,
                  "text-gray-700 bg-gray-100 hover:bg-gray-300",
                  {
                    "bg-primary/10 text-primary font-semibold": isActive, // 👈 Active link styling
                  }
                )
              }
            >
              <span className="text-lg">{route.icon}</span>
              {!isCollapsed && <span>{route.label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
