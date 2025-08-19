import React, { useState, useRef, useEffect } from "react";
import olx from "../assets/symbol.png";
import lens from "../assets/search1.svg";
import arrow from "../assets/arrow-down.svg";
import sell from "../assets/addButton.png";
import Login from "./Login";
import Sell from "./Sell";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/Firebase";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const [loginPop, setLoginPop] = useState(false);
  const [modalSell, setModalSell] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const navigate = useNavigate();

  // Close login popup when user is authenticated
  useEffect(() => {
    if (user) {
      setLoginPop(false);
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await signOut();
    setShowDropdown(false);
    navigate("/");
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 shadow-md">
        <img src={olx} alt="OLX Logo" className="w-12 h-10" />

        <div className="flex items-center border-2 border-gray-300 rounded-md px-3 py-2 w-60">
          <img src={lens} alt="search" className="w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="India"
            className="flex-1 outline-none text-sm"
          />
          <img src={arrow} alt="arrow" className="w-5 h-5 ml-2" />
        </div>

        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-[500px] ml-3">
          <input
            type="text"
            placeholder="Find Cars, Mobile Phones and more..."
            className="flex-1 outline-none text-sm"
          />
          <img src={lens} alt="search" className="w-5 h-5 ml-2" />
        </div>

        <div className="flex items-center ml-6 cursor-pointer">
          <span className="text-sm font-semibold mr-1">ENGLISH</span>
          <img src={arrow} alt="arrow" className="w-4 h-4" />
        </div>

        <div className="relative ml-6" ref={dropdownRef}>
          {user ? (
            <div
              className="flex items-center cursor-pointer"
              onClick={toggleDropdown}
            >
              <span className="text-sm font-bold hover:underline">
                {user.displayName || user.email?.split("@")[0] || "User"}
              </span>
              <img src={arrow} alt="arrow" className="w-4 h-4 ml-1" />
            </div>
          ) : (
            <span
              className="text-sm font-bold hover:underline cursor-pointer"
              onClick={() => setLoginPop(true)}
            >
              Login
            </span>
          )}

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <Link
                to="/my-ads"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                My Ads
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="ml-6 cursor-pointer" onClick={() => setModalSell(true)}>
          <img src={sell} alt="Sell" className="w-25 h-10 mr-5" />
        </div>
      </div>
      
      {loginPop && <Login setLoginPop={setLoginPop} user={user} />}
      {modalSell && <Sell setModalSell={setModalSell} user={user} />}

      <div className="bg-white shadow-sm border-t">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center space-x-8 py-2 overflow-x-auto text-sm">
            <li className="flex items-center whitespace-nowrap text-blue-600 font-medium cursor-pointer hover:text-blue-700">
              <span>All Categories</span>
              <img src={arrow} alt="arrow" className="w-3 h-3 ml-1 mt-0.5" />
            </li>
            {[
              "Mobile Phones",
              "Cars",
              "Bikes",
              "Scooters",
              "Houses",
              "Computers & Laptops",
              "Furniture",
              "Electronics",
              "Fashion",
              "Pets",
              "Books",
              "Services",
            ].map((category) => (
              <li
                key={category}
                className="whitespace-nowrap text-gray-600 cursor-pointer hover:text-blue-600 hover:font-medium transition-colors"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
