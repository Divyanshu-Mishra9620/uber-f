import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {
     const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { captain, setCaptain } = useContext(CaptainDataContext)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()

        const captainData = {
            email: email,
            password: password,
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)

        if (response.status === 201) {
            const data = response.data

            setCaptain(data.captain)

            localStorage.setItem('token', data.token)

            navigate('/captain-home')
        }

        setEmail("")
        setPassword("")
    }
  return (
    <div className='p-7 flex flex-col h-screen justify-between'>
        <div>
            <img src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Emblem.png" alt="Uber Logo" className='w-20 mb-8' />
        <form action="" onSubmit={(e)=>{submitHandler(e)}}>  

            <h3 className='text-lg font-medium mb-2'>Captain Login</h3>

            <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email@emaple.com'
            className='bg-[#eeeeee] mb-7 px-4 rounded py-2 w-full text-lg placeholder:text-sm'
            />

            <h3 className='text-lg font-medium mb-2'>Enter password</h3>

            <input 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password' 
            className='bg-[#eeeeee] mb-7 px-4 rounded py-2 w-full text-lg placeholder:text-sm'
            />

            <button type="submit" className='bg-[#111] text-white font-semibold mb-3 px-4 rounded py-2 w-full text-lg placeholder:text-base'>Login</button>

        </form>

        <p className='text-center'>Join a fleet? <Link className="text-blue-600" to="/captain-signup">Register as a captain</Link></p>

        </div>
        <div>
            <Link to="/login" className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 px-4 rounded py-2 w-full text-lg placeholder:text-base'>Sign in as User</Link>
        </div>
    </div>
  )
}

export default CaptainLogin