import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const location = useLocation()
  const { ride } = location.state || {}
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate()

  socket.on("ride-ended", () => {
    navigate('/home')
  })

  return (
    <div className="h-screen h-dvh flex flex-col bg-gray-100 map-page">
      {/* Floating Home Button */}
      <Link
        to={"/home"}
        className="fixed right-4 sm:right-8 top-4 h-10 w-10 bg-white/95 backdrop-blur-sm flex items-center justify-center rounded-full shadow-lg z-20 active:scale-95 transition-transform"
      >
        <i className="ri-home-5-line text-lg" />
      </Link>

      {/* Map Section */}
      <div className="flex-1 relative z-0">
        <LiveTracking />
        <div className="map-gradient-overlay" />
      </div>

      {/* Ride Details Section — centered on wider screens */}
      <div className="bg-white relative z-10 panel-bottom px-5 sm:px-8 py-5 pb-7">
        <div className="max-w-lg mx-auto">
          {/* Driver Info */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
                  alt="Vehicle"
                />
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-bold capitalize text-gray-900 truncate">
                  {ride?.captain.fullname.firstname}
                </h2>
                <p className="text-sm font-semibold text-gray-600 -mt-0.5">{ride?.captain.vehicle.plate}</p>
                <p className="text-xs text-gray-400">Maruti Suzuki Alto</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Total fare</p>
              <p className="text-2xl font-bold text-gray-900">₹{ride?.fare}</p>
              <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-500 font-medium">Cash</span>
            </div>
          </div>

          {/* Destination */}
          <div className="w-full mb-5 bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <i className="ri-map-pin-2-fill text-red-500 text-sm" />
              </div>
              <div className="flex-1 min-w-0">
                <p className='text-[10px] text-gray-400 uppercase tracking-wider font-medium'>Heading to</p>
                <p className='text-sm font-medium text-gray-900 mt-0.5 truncate'>{ride?.destination}</p>
              </div>
            </div>
          </div>

          <button className="w-full bg-black text-white font-semibold py-3.5 rounded-xl hover:bg-gray-900 active:scale-[0.98] transition-all text-[15px] flex items-center justify-center gap-2">
            <i className="ri-wallet-3-line" />
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
