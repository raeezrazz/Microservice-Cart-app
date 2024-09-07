import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {FaUserAlt,FaEnvelope,FaLock} from 'react-icons/fa'

function Signup() {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')

    const navigate = useNavigate()

    const handleSignup = async () =>{
        if(!name.trim() || !password.trim()){
            setError('Name and Password are required')
            return
        }
        try{
            const response = await axios.post('http://localhost:4000/signup',{
                name,email,password
            },{
                withCredentials:true
            })

            console.log(response,"here is the response")

            if(response.status == 200){
                navigate('/login')
                return null
            }

            setError('Failed to sign up. Please try again later.')

        }catch(error){
            console.log(error,"siignup error")
        }

    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
    <h2 className="absolute top-14 left-1/2 transform -translate-x-1/2 text-4xl font-bold mb-6 text-center text-white cursor-default hover:text-color-gradient-to-r from-blue-500 via-green-500 to-yellow-500">Mini Cart App</h2>
    <div className="bg-white p-4 rounded-2xl shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Create Your Account</h2>
      <p className="text-center text-gray-600 mb-8">Sign up to get started</p>
      {error && <div className='text-red-600 mb-4'>{error}</div>}
      <form>
        <div className="mb-4 relative">
          <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
          <input
            className="pl-10 pr-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4 relative">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            className="pl-10 pr-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
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
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">Already have an account? 
          <a href="/login" className="text-indigo-500 hover:text-indigo-700 font-semibold"> Log in</a>
        </p>
      </div>
    </div>
  </div>
);
}

export default Signup
