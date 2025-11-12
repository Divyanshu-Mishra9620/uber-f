import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CaptainSignup = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [firstName, setFirstName] = useState('')
        const [lastName, setLastName] = useState('')
        const [userData, setUserData] = useState({})

        
        const [ vehicleColor, setVehicleColor ] = useState('')
        const [ vehiclePlate, setVehiclePlate ] = useState('')
        const [ vehicleCapacity, setVehicleCapacity ] = useState('')
        const [ vehicleType, setVehicleType ] = useState('')

        const {captain,setCaptain} = useContext(CaptainDataContext)
    
        const submitHandler = async (e) => {
            e.preventDefault()

            const captainData={
                fullname:{
                    firstname: firstName, lastname: lastName,
                },
                email: email,
                password: password,
                vehicle: {
                    color: vehicleColor,
                    plate: vehiclePlate,
                    capacity: vehicleCapacity,
                    vehicleType: vehicleType,
                }
            }

            // axios will take this data to backend

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

            if(response.status === 201){
                const data = response.data
                
                setCaptain(data.captain)

                localStorage.setItem('token', data.token)

                navigate('/captain-home')
            }

            setEmail("")
            setPassword("")
            setFirstName("")
            setLastName("")
            setVehicleColor('')
            setVehiclePlate('')
            setVehicleCapacity('')
            setVehicleType('')
        }

  return (
    <div className='p-7 flex flex-col h-screen justify-between'>
        <div>
            <img src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Emblem.png" alt="Uber Logo" className='w-20 mb-8' />
        <form action="" onSubmit={(e)=>{submitHandler(e)}}>  

            <h3 className='text-base font-medium mb-2'>What's your name</h3>
            <div className='flex gap-4 mb-5'>
                <input 
            type="text" 
            required 
            placeholder='First name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='bg-[#eeeeee] w-1/2 px-4 rounded py-2 text-base placeholder:text-sm'
            />

            <input 
            type="text" 
            required 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last name'
            className='bg-[#eeeeee] w-1/2 px-4 rounded py-2 text-base placeholder:text-sm'
            />
            </div>

            <h3 className='text-base font-medium mb-2'>Enter Email</h3>

            <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email@emaple.com'
            className='bg-[#eeeeee] mb-5 px-4 rounded py-2 w-full text-lg placeholder:text-sm'
            />

            <h3 className='text-base font-medium mb-2'>Enter password</h3>

            <input 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password' 
            className='bg-[#eeeeee] mb-5 px-4 rounded py-2 w-full text-lg placeholder:text-sm'
            />

            <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Moto</option>
            </select>
          </div>

            <button type="submit" className='bg-[#111] text-white font-semibold mb-3 px-4 rounded py-2 w-full text-lg placeholder:text-base'>Create Captain Account</button>

        </form>

        <p className='text-center'>Already have a account? <Link className="text-blue-600" to="/captain-login">Login Here</Link></p>

        </div>
        <div>
            <p className='text-[10px] leading-tight mt-6'>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
        </div>
    </div>
  )
}

export default CaptainSignup