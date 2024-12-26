import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUserID } from '../features/userID/userIDSlice';

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
    const DEV = "prod";
    const baseURL = DEV === "dev"
      ? "http://localhost:3010/api"
      : "https://backend-git-main-hassam-alis-projects-909d02f3.vercel.app/api";

    const url = isLogin
      ? `${baseURL}/login`
      : `${baseURL}/register`;
    try {
      const response = await axios.post(url, formData);
      if (response.data.status === 200) {
        const { userID, userName } = response.data;
        dispatch(setUserID({ userID, userName }));
        toast.success(isLogin ? 'Login successful!' : 'Registration successful!');

        if (!isLogin) {
          await axios.post(`${baseURL}/setDefault`, { userID: response.data.userID });
        }
        navigate('/home');
      } else {
        toast.error(isLogin ? 'Incorrect username or password' : 'User already exists');
      }
    } catch (error) {
      toast.error(isLogin ? 'Incorrect username or password' : 'User already exists');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 px-4">
      <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 text-center">
        IoT Device Management System
      </h1>
      <div className="w-full max-w-sm bg-gray-800 p-6 rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-sm"
              required
            />
          </div>
          {!isLogin && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-sm"
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg hover:shadow-teal-400 transition-all"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin((prev) => !prev)}
            className="text-sm font-medium text-blue-400 hover:text-teal-400 transition-all hover:underline"
          >
            {isLogin ? 'Create an account' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
      <ToastContainer theme="dark" position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default LoginRegisterPage;
