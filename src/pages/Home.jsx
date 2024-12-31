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
  import SensorCard from "../components/SensorCard";
  
  function MainPage() {
    const [waterData, setWaterData] = useState();
    const [gasData, setGasData] = useState();
    const [electricityData, setElectricityData] = useState();
  
    const [waterStatus, setWaterStatus] = useState("ok");
    const [gasStatus, setGasStatus] = useState("moderate");
    const [electricityStatus, setElectricityStatus] = useState("risk");
  
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedSensor, setSelectedSensor] = useState(null);
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [value, setValue] = useState("");
    const [status, setStatus] = useState("");
    const [state, setState] = useState("");
    const [sensorToken, setSensorToken] = useState("");
    const [optimalValue, setOptimalValue] = useState("");
  
    const DEV = "prod";
    const baseURL =
      DEV === "dev"
        ? "http://localhost:3010/api"
        : "https://backend-git-main-hassam-alis-projects-909d02f3.vercel.app/api";
  
    const userID = useSelector((state) => state.userID.userID);
  
    // Fetch data for sensors
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${baseURL}/displayData/${userID}`);
          response.data.sensors.forEach((sensor) => {
            if (sensor.sensor_type.toLowerCase() === "water") {
              setWaterData(sensor.pressure_value);
              setWaterStatus(sensor.state.toLowerCase());
            } else if (sensor.sensor_type.toLowerCase() === "gas") {
              setGasData(sensor.pressure_value);
              setGasStatus(sensor.state.toLowerCase());
            } else if (sensor.sensor_type.toLowerCase() === "electricity") {
              setElectricityData(sensor.pressure_value);
              setElectricityStatus(sensor.state.toLowerCase());
            }
          });
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }, [userID]);
  
    const handleCardClick = (type) => {
      setSelectedSensor(type);
      setIsPopupOpen(true);
      setIsAuthorized(false);
      setPassword("");
    };
  
    const closePopup = () => {
      setIsPopupOpen(false);
      setSelectedSensor(null);
      setPassword("");
      setIsAuthorized(false);
    };
  
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
  
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(
            `${baseURL}/login/${selectedSensor}`,
            { password, userID }
          );
          
          if (response.status === 200) {
            const token = response.data.token;
            setSensorToken(token);
            setIsAuthorized(true);
      
            // Fetch sensor information
            const sensorInfoResponse = await axios.post(
              `${baseURL}/getinfo/${selectedSensor}`,
              { userID },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
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
          }
        } catch (err) {
             if (err.status === 400) {
                alert("Invalid credentials");
              } else {
                alert("Unexpected response status: " + err.status);
              }
        }
      };
      
  
    // Shutdown sensor
    const shutdownSensor = async () => {
      try {
        const response = await axios.post(
          `${baseURL}/shutdown/${selectedSensor}`,
          { userID },
          {
            headers: {
              Authorization: `Bearer ${sensorToken}`,
            },
          }
        );
        if (response.status === 200) {
          if (state === "shutdown") {
            setValue(response.data.sensor.pressure_value);
            setState(response.data.sensor.status);
            setStatus(response.data.sensor.state);
          } else {
            setValue(0);
            setState("shutdown");
            setStatus("");
          }
        } else {
          alert("Failed to change sensor state");
        }
      } catch (err) {
        console.error("Error in shutdown sensor:", err);
      }
    };
  
    // Change password
    const changePassword = async () => {
      const newPassword = prompt("Enter new password");
      try {
        const response = await axios.post(
          `${baseURL}/changePassword/${selectedSensor}`,
          { userID, newPassword },
          {
            headers: {
              Authorization: `Bearer ${sensorToken}`,
            },
          }
        );
        if (response.status === 200) {
          alert("Password changed successfully");
        } else {
          alert("Failed to change password");
        }
      } catch (err) {
        console.error("Error in password change:", err);
      }
    };
  
    // Change value
    const changeValue = async () => {
    let newValue;
    do {
      newValue = prompt("Enter new value");
      if (isNaN(newValue) || newValue > 250) {
        alert("Please enter a valid number less than or equal to 250");
      }
    } while (isNaN(newValue) || newValue > 250);
      
      try {
        const response = await axios.post(
          `${baseURL}/changeValue/${selectedSensor}`,
          { userID, newValue },
          {
            headers: {
              Authorization: `Bearer ${sensorToken}`,
            },
          }
        );
        if (response.status === 200) {
          setOptimalValue(newValue);
        } else {
          alert("Failed to change value");
        }
      } catch (err) {
        console.error("Error in changing value:", err);
      }
    };
  
    return (
      <div className="bg-gray-900 min-h-screen flex flex-col sm:flex-row">
        <Sidebar />
        <div className="flex-1 p-4 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-6 sm:mb-12">
            IoT Management Dashboard
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SensorCard
              icon={<FaWater />}
              label="Water Sensor"
              data={waterData}
              unit="PSI"
              state={waterStatus}
              onClick={() => handleCardClick("water")}
            />
            <SensorCard
              icon={<FaFireAlt />}
              label="Gas Sensor"
              data={gasData}
              unit="PSI"
              state={gasStatus}
              onClick={() => handleCardClick("gas")}
            />
            <SensorCard
              icon={<FaBolt />}
              label="Electricity Sensor"
              data={electricityData}
              unit="V"
              state={electricityStatus}
              onClick={() => handleCardClick("electricity")}
            />
          </div>
        </div>
  
        {/* Popup Modal */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-11/12 sm:w-1/2 lg:w-1/3">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {selectedSensor.toUpperCase()} Module Details
                </h2>
                <button
                  onClick={closePopup}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✖
                </button>
              </div>
              {!isAuthorized ? (
                <form
                  onSubmit={handlePasswordSubmit}
                  className="flex flex-col"
                >
                  <label className="text-gray-700 mb-2">Enter Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border rounded mb-4"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <div>
                  <p>
                    <strong>Pressure Value:</strong> {value} {selectedSensor}
                  </p>
                  <p>
                    <strong>Status:</strong> {state}
                  </p>
                  <p className="flex gap-2 items-center"> 
                    <strong>State:</strong> {status} {getStatusIcon(state)}
                  </p>
                  <p>
                    <strong>Optimal Value:</strong> {optimalValue}
                    </p>

                  <button
                    onClick={shutdownSensor}
                    className={`${state === "shutdown"? "bg-green-600":"bg-red-500"}  text-white p-2 rounded mt-4`}
                  >
                    {state ==="shutdown" ? "Turn On" :"Shutdown Sensor"}
                  </button>
                  <button
                    onClick={changePassword}
                    className="bg-yellow-500 text-white p-2 rounded mt-4 ml-4"
                  >
                    Change Password
                  </button>
                  <button
                    onClick={changeValue}
                    className="bg-green-500 text-white p-2 rounded mt-4 ml-4"
                  >
                    Change Value
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default MainPage;

  
