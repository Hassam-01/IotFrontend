import PropTypes from "prop-types";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

const SensorCard = ({ icon, label, data, unit, state, onClick }) => {
  const getStatusIcon = () => {
    console.log(state)
    switch (state) {
      case "moderate":
        return <FaExclamationTriangle className="text-yellow-500 text-2xl" />;
      case "risk":
        return <FaTimesCircle className="text-red-500 text-2xl" />;
      case "ok":
      default:
        return <FaCheckCircle className="text-green-500 text-2xl" />;
    }
  };

return (
    <div
        className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition duration-200 ease-in-out"
        onClick={onClick}
    >
        <div className="flex items-center justify-between mb-4">
            <div className={`text-white text-3xl`}>{icon}</div>
            {getStatusIcon()}
        </div>
        <h2 className={`text-xl font-bold mb-2 ${label === "water" ? "text-blue-500" : label === "gas" ? "text-orange-500" : label === "electricity" ? "text-green-500" : "text-white"}`}>
            {label}
        </h2>
        <p className="text-gray-300 text-lg">
            {data !== undefined ? `${data} ${unit}` : "Loading..."}
        </p>
    </div>
);
};

SensorCard.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unit: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SensorCard;
