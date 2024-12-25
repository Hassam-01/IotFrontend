import { Link } from 'react-router-dom'; // Import Link for navigation
import { FaWater, FaFireAlt, FaBolt, FaSignOutAlt } from 'react-icons/fa'; // Icons for each sensor
import { useSelector } from 'react-redux';

function Sidebar() {

    const userName = useSelector(state => state.userID.userName)
  return (
    <div className="w-64 bg-gray-800 h-screen text-white flex flex-col">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center p-4 bg-gray-900">
        <h2 className="text-2xl font-semibold">IoT Dashboard</h2>
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
        <Link to="/water" className="flex items-center w-full hover:bg-gray-700 p-2 rounded-md">
          <FaWater size={20} className="mr-2" />
          <span>Water Sensor</span>
        </Link>
        
        <Link to="/gas" className="flex items-center w-full hover:bg-gray-700 p-2 rounded-md">
          <FaFireAlt size={20} className="mr-2" />
          <span>Gas Sensor</span>
        </Link>
        
        <Link to="/electricity" className="flex items-center w-full hover:bg-gray-700 p-2 rounded-md">
          <FaBolt size={20} className="mr-2" />
          <span>Electricity Sensor</span>
        </Link>
      </div>

      {/* Logout Button */}
      <div className="flex items-center justify-start p-4 mt-auto">
        <button className="flex items-center w-full hover:bg-gray-700 p-2 rounded-md text-red-700">
          <FaSignOutAlt size={20} className="mr-2" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
