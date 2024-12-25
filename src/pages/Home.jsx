import { FaWater, FaFireAlt, FaBolt, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';

function MainPage() {
  // Example data for each sensor
  const waterData = 45; // Example pressure data for water sensor
  const gasData = 80; // Example pressure data for gas sensor
  const electricityData = 210; // Example voltage data for electricity sensor

  const waterStatus = 'ok'; // Example status for water sensor
  const gasStatus = 'warning'; // Example status for gas sensor
  const electricityStatus = 'danger'; // Example status for electricity sensor

  // Function to get the status icon based on the status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'danger':
        return <FaTimesCircle className="text-red-500" />;
      case 'ok':
      default:
        return <FaCheckCircle className="text-green-500" />;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content section */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold text-center text-white mb-12">IoT Management Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Water Sensor */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center">
            <FaWater size={50} className="text-blue-400 mb-4" />
            <h2 className="text-xl font-semibold text-white">Water Sensor</h2>
            <p className="mt-2 text-white">Pressure: {waterData ? `${waterData} PSI` : 'Loading...'}</p>
            <p className="mt-4 flex gap-2 items-center text-white">
              Status: {getStatusIcon(waterStatus)}
            </p>
          </div>

          {/* Gas Sensor */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center">
            <FaFireAlt size={50} className="text-red-400 mb-4" />
            <h2 className="text-xl font-semibold text-white">Gas Sensor</h2>
            <p className="mt-2 text-white">Pressure: {gasData ? `${gasData} PSI` : 'Loading...'}</p>
            <p className="mt-4 flex gap-2 items-center text-white">
              Status: {getStatusIcon(gasStatus)}
            </p>
          </div>

          {/* Electricity Sensor */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center">
            <FaBolt size={50} className="text-yellow-400 mb-4" />
            <h2 className="text-xl font-semibold text-white">Electricity Sensor</h2>
            <p className="mt-2 text-white">Voltage: {electricityData ? `${electricityData} V` : 'Loading...'}</p>
            <p className="mt-4 flex gap-2 items-center text-white">
              Status: {getStatusIcon(electricityStatus)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
