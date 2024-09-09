import { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, UseDispatch } from 'react-redux';
import { setToken } from '../store/Auth';


const Login: React.FC = () => {

  const [email,setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async () => {
    if( !email.trim() || !password.trim()) {
      setError('email and password required');
      return 
    }

    try {
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password
      },{
        withCredentials: true
      })

      if(response.status === 200) {
        console.log(response.data.token,"restknnnnnnnnnnnnnn")
        dispatch(setToken(response.data.token))
        navigate('/')
      } else{
        setError('Failed to sign in. please try again later')
      }

      setError('Failed to sign in. please try again later')
    } catch (error) {
      console.error("login failed:", error);
      setError("Failed to sign up. Please try again later.");
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <h2 className="absolute top-14 left-1/2 transform -translate-x-1/2 text-4xl font-bold mb-6 text-center text-white cursor-default hover:text-color-gradient-to-r from-blue-500 via-green-500 to-yellow-500">Mini Cart App</h2>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Welcome Back!</h2>
        <p className="text-center text-gray-600 mb-8">Login to your account</p>
        {error && <div className='text-red-600 mb-4'>{error}</div>}
        <form>
          <div className="mb-4 relative">
            <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              className="pl-10 pr-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6 relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              className="pl-10 pr-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account? 
            <a href="/signup" className="text-indigo-500 hover:text-indigo-700 font-semibold"> Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
