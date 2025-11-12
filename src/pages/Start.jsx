import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className="bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_photo-1736178320034-dcb5c2a7ef7f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D)] h-screen w-full flex justify-between flex-col bg-red-400 pt-8">

            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png" alt="Uber Logo" className='w-16 ml-8' />
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                <Link to="/login" className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5">Continue</Link>
            </div>

        </div>
    </div>
  )
}

export default Start