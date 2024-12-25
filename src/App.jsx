import "./index.css";

// import { useEffect } from "react";
// import axios from "axios";
import LoginRegisterPage from "./pages/Login";
import { Route, Routes } from "react-router-dom"; // Ensure you are using 'react-router-dom'
import Home from "./pages/Home";


function App() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // console.log(process.env.REACT_APP_BACKEND, "/test")
  //       const response = await axios.get(
  //         `https://backend-git-main-hassam-alis-projects-909d02f3.vercel.app/api/test`
  //       );
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);
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
