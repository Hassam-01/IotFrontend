import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaWater, FaFireAlt, FaBolt, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import logo from "../assets/logo.jpg";
import axios from "axios";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar
  const userName = useSelector((state) => state.userID.userName);
  const navigate = useNavigate();

  const logOut = async () => {
    delete axios.defaults.headers["Authorization"];
    navigate("/");
    window.location.reload();
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Header with Hamburger Menu */}
      <div className="lg:hidden bg-gray-800 p-4 flex justify-between items-center text-white">
        {/* logo from  public */}
        <img src={logo} alt="logo" className="rounded-full w-12 h-12" />
        <button onClick={toggleSidebar}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0 lg:relative lg:w-64 z-20`}
      >
        {/* Sidebar Header */}
        <div className="flex p-4 bg-gray-800">
        <img src={logo} alt="logo" className="rounded-full w-12 h-12" />
        </div>

        {/* User Section */}
        <div className="flex flex-col items-center p-4 space-y-4 mt-6">
          <img
            src="https://randomuser.me/api/port"
            alt="user"
            className="w-16 h-16 rounded-full border-2 border-white"
          />
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold">{userName}</h3>
            <p className="text-sm text-gray-400">Admin</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-start p-4 space-y-4 mt-6">
          <Link
            to="/water"
            className="flex items-center w-full hover:bg-gray-700 p-2 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            <FaWater size={20} className="mr-2" />
            <span>Water Sensor</span>
          </Link>

          <Link
            to="/gas"
            className="flex items-center w-full hover:bg-gray-700 p-2 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            <FaFireAlt size={20} className="mr-2" />
            <span>Gas Sensor</span>
          </Link>

          <Link
            to="/electricity"
            className="flex items-center w-full hover:bg-gray-700 p-2 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            <FaBolt size={20} className="mr-2" />
            <span>Electricity Sensor</span>
          </Link>
        </div>

        {/* Logout Button */}
        <div className="flex items-center justify-start p-4 mt-auto">
          <button
            className="flex items-center w-full hover:bg-gray-700 p-2 rounded-md text-red-700"
            onClick={logOut}
          >
            <FaSignOutAlt size={20} className="mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-10"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
