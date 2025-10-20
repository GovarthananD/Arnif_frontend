import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = token
    ? [
        { name: "All Blogs", path: "/blogs" },
        { name: "Create", path: "/create" },
        { name: "My Blogs", path: "/myblogs" },
      ]
    : [
        { name: "Login", path: "/login" },
        { name: "Signup", path: "/signup" },
      ];

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-50 shadow-md backdrop-blur-sm bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Link to="/blogs" className="text-2xl font-bold">
              Mern Blogs
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex space-x-6 items-center">
            {menuItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="hover:text-blue-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {token && (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden px-2 pt-2 pb-4 space-y-1 bg-gray-800">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              {item.name}
            </Link>
          ))}
          {token && (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full bg-red-500 px-3 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
