import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUserID } from '../features/userID/userIDSlice';
import { FaChessKing } from 'react-icons/fa';

const LoginRegisterPage = () => {
    const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({


    username: '',
    password: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {

    
    e.preventDefault();
    const DEV = "prod"
    let baseURL;
    DEV === "dev" ? 
       baseURL = "http://localhost:3010/api": 
        baseURL = "https://backend-git-main-hassam-alis-projects-909d02f3.vercel.app/api"
    
        
    const url = isLogin
      ? `${baseURL}/login`
      : `${baseURL}/register`;
    try {
        const response = await axios.post(url, formData);
        console.log(response.data)
        if (response.data.staus === 200) {

          // Show success message
          const { userID, userName } = response.data;
          dispatch(setUserID({userID, userName}));
        toast.success(isLogin ? 'Login successful!' : 'Registration successful!');

        // hit the api baseUrl/setDefault with the userID as post
        if (!isLogin) {
          const response2 = await axios.post(`${baseURL}/setDefault`, {userID: response.data.userID})
          console.log(response2.data)
        }
        // Redirect to home page after successful login/registration
        navigate('/home');
      } else {
        // Show error message
        toast.error(isLogin ? 'Incorrect username or password' : 'User already exists');
      }
    } catch (error) {
      toast.error(error, 'An error occurred, please try again');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out transform hover:ring-blue-500"
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out transform hover:ring-blue-500"
                required
              />
            </div>
          )}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out transform hover:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out transform hover:bg-blue-600"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin((prev) => !prev)}
            className="text-sm text-blue-500 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:underline"
          >
            {isLogin ? 'Create an account' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginRegisterPage;
