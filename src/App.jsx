import "./index.css";

// import { useEffect } from "react";
// import axios from "axios";
import LoginRegisterPage from "./pages/Login";
import { Route, Routes } from "react-router-dom"; // Ensure you are using 'react-router-dom'
import Home from "./pages/Home";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginRegisterPage />} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </>
  );
}

export default App;
