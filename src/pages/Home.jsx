import {
  FaWater,
  FaFireAlt,
  FaBolt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";


function MainPage() {
const [waterData, setWaterData] = useState(); // Example pressure data for water sensor
const [gasData, setGasData] = useState(); // Example pressure data for gas sensor
const [electricityData, setElectricityData] = useState(); // Example voltage data for electricity sensor

const [waterStatus, setWaterStatus] = useState("ok"); // Example status for water sensor
const [gasStatus, setGasStatus] = useState("warning"); // Example status for gas sensor
const [electricityStatus, setElectricityStatus] = useState("danger"); // Example status for electricity sensor

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [value, setValue] = useState("");
  const [optimalValue, setOptimalValue] = useState("");
  const [status, setStatus] = useState("");
  const [state, setState] = useState("");
  const [sensorToken, setSensorToken] = useState("");

  const DEV = "prod";
  const baseURL =
    DEV === "dev"
      ? "http://localhost:3010/api"
      : "https://backend-git-main-hassam-alis-projects-909d02f3.vercel.app/api";

  const userID = useSelector((state) => state.userID.userID);
// get the waterdata, gasdata, electricitydata, waterStatus, gasStatus, electricStatus from the api/displayData/:userID
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseURL}/displayData/${userID}`);
            // map the response.data.sensors to the respective states
            response.data.sensors.map((sensor) => {
                if (sensor.sensor_type === "water") {
                    setWaterData(sensor.pressure_value);
                    setWaterStatus(sensor.status);
                }
                else if (sensor.sensor_type === "gas") {
                    setGasData(sensor.pressure_value);
                    setGasStatus(sensor.status);
                }
                else if (sensor.sensor_type === "electricity") {
                    setElectricityData(sensor.pressure_value);
                    setElectricityStatus(sensor.status);
                }
            });
        }
        catch(err) {
            console.error(err);
        }
    };
    fetchData();
});

  // Function to get the status icon based on the status
  const getStatusIcon = (status) => {
    switch (status) {
      case "warning":
        return <FaExclamationTriangle className="text-yellow-500" />;
      case "danger":
        return <FaTimesCircle className="text-red-500" />;
      case "ok":
      default:
        return <FaCheckCircle className="text-green-500" />;
    }
  };

  // Handle sensor card click
  const handleCardClick = (type) => {
    setSelectedSensor(type);
    setIsPopupOpen(true);
    setIsAuthorized(false);
    setPassword("");
  };
  // Handle password submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${baseURL}/login/${selectedSensor}`, {
      password,
      userID,
    });
    const token = response.data.token;
    setSensorToken(token);

    if (response.status === 200) {
      setIsAuthorized(true);

      // Fetch sensor information
      const sensorInfoResponse = await axios.post(
        `${baseURL}/getinfo/${selectedSensor}`,
        { userID },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token here
          },
        }
      );
      if (sensorInfoResponse.status === 200) {
        setValue(sensorInfoResponse.data.sensor.pressure_value);
        setState(sensorInfoResponse.data.sensor.status);
        setStatus(sensorInfoResponse.data.sensor.state);
        setOptimalValue(sensorInfoResponse.data.sensor.optimal_value);
      } else {
        alert("Failed to fetch sensor information");
      }
    } else {
      alert("Incorrect password");
    }
  };

  // Close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedSensor(null);
    setPassword("");
    setIsAuthorized(false);
  };
  // hit api/shutdown/:type for shutdown pass token userID
  const shutdownSensor = async () => {
    // Fetch sensor information
    const sensorInfoResponse = await axios.post(
      `${baseURL}/shutdown/${selectedSensor}`,
      { userID },
      {
        headers: {
          Authorization: `Bearer ${sensorToken}`, // Include the token here
        },
      }
    );
    if (sensorInfoResponse.status === 200) {
      if (state === "shutdown") {
        setValue(sensorInfoResponse.data.sensor.pressure_value);
        setState(sensorInfoResponse.data.sensor.status);
        setStatus(sensorInfoResponse.data.sensor.state);
      } else {
        setValue(0);
        setState("shutdown");
        setStatus("");
      }
    } else {
      alert("Failed to fetch sensor information");
    }
  };

  const changePassword = async () => {
    const newPassword = prompt("Enter new password");
    const sensorInfoResponse = await axios.post(
      `${baseURL}/changePassword/${selectedSensor}`,
      { userID, newPassword },
      {
        headers: {
          Authorization: `Bearer ${sensorToken}`, // Include the token here
        },
      }
    );
    if (sensorInfoResponse.status === 200) {
      alert("Password changed successfully");
    } else {
      alert("Failed to change password");
    }
  };
  // change value hit api/changevalue/:type pass token userID
    const changeValue = async () => {
        const newValue = prompt("Enter new value");
        const sensorInfoResponse = await axios.post(
        `${baseURL}/changeValue/${selectedSensor}`,
        { userID, newValue },
        {
            headers: {
            Authorization: `Bearer ${sensorToken}`, // Include the token here
            },
        }
        );
        if (sensorInfoResponse.status === 200) {
        setOptimalValue(newValue);
        } else {
        alert("Failed to change value");
        }
    };
  return (
    <div className="bg-gray-900 min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content section */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold text-center text-white mb-12">
          IoT Management Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Water Sensor */}
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center cursor-pointer"
            onClick={() => handleCardClick("water")}
          >
            <FaWater size={50} className="text-blue-400 mb-4" />
            <h2 className="text-xl font-semibold text-white">Water Sensor</h2>
            <p className="mt-2 text-white">
              Pressure: {waterData ? `${waterData} PSI` : "Loading..."}
            </p>
            <p className="mt-4 flex gap-2 items-center text-white">
              Status: {getStatusIcon(waterStatus)}
            </p>
          </div>

          {/* Gas Sensor */}
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center cursor-pointer"
            onClick={() => handleCardClick("gas")}
          >
            <FaFireAlt size={50} className="text-red-400 mb-4" />
            <h2 className="text-xl font-semibold text-white">Gas Sensor</h2>
            <p className="mt-2 text-white">
              Pressure: {gasData ? `${gasData} PSI` : "Loading..."}
            </p>
            <p className="mt-4 flex gap-2 items-center text-white">
              Status: {getStatusIcon(gasStatus)}
            </p>
          </div>

          {/* Electricity Sensor */}
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center cursor-pointer"
            onClick={() => handleCardClick("electricity")}
          >
            <FaBolt size={50} className="text-yellow-400 mb-4" />
            <h2 className="text-xl font-semibold text-white">
              Electricity Sensor
            </h2>
            <p className="mt-2 text-white">
              Voltage: {electricityData ? `${electricityData} V` : "Loading..."}
            </p>
            <p className="mt-4 flex gap-2 items-center text-white">
              Status: {getStatusIcon(electricityStatus)}
            </p>
          </div>
        </div>
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {isAuthorized ? (
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Sensor Information
                  <span className="ml-12 text-sm text-gray-700">
                    Status: {status}
                  </span>
                </h2>
                <div className="mb-4">
                  <p className="text-gray-700">
                    <strong>Type:</strong> {selectedSensor}
                  </p>
                  {/* Replace with actual data */}
                  <p className="text-gray-700 gap-2">
                    <strong>Value:</strong> {value} <strong>Optimal: {optimalValue}</strong> 
                  </p>
                  <p className="text-gray-700">
                    <strong>State:</strong> {state}
                  </p>
                </div>
                <button
                  className={`w-full ${
                    state !== "shutdown" ? "bg-red-500" : "bg-green-600"
                  } text-white py-2 rounded mb-2`}
                  onClick={shutdownSensor}
                >
                  {state === "shutdown" ? "Turn On" : "Shutdown"}
                </button>
                <button
                  className="w-full bg-yellow-500 text-white py-2 rounded mb-2"
                  onClick={changePassword}
                >
                  Change Password
                </button>
                <button className="w-full bg-green-500 text-white py-2 rounded" onClick={changeValue}>
                  Change Value
                </button>
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit}>
                <h2 className="text-2xl font-semibold mb-4">Enter Password</h2>
                <input
                  type="password"
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded"
                >
                  Submit
                </button>
              </form>
            )}

            <button
              className="mt-4 w-full bg-gray-500 text-white py-2 rounded"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
