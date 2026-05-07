import React, { useContext } from 'react'
import { CaptainDataContext } from "../context/CaptainContext"

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext)

  return (
    <div>
      {/* Captain Profile Card */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-3'>
          <div className="relative">
            <img
              className='h-12 w-12 rounded-full object-cover border-2 border-gray-200'
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
              alt="Captain"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          <div>
            <h4 className='text-base font-semibold capitalize'>
              {captain.fullname.firstname + " " + captain.fullname.lastname}
            </h4>
            <span className="status-badge online text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Online
            </span>
          </div>
        </div>

        <div className="text-right">
          <h4 className='text-xl font-bold text-gray-900'>₹295.20</h4>
          <p className='text-xs text-gray-500'>Today's earnings</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-3 gap-3'>
        <div className='bg-gray-50 rounded-2xl p-4 text-center'>
          <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-blue-50 flex items-center justify-center">
            <i className="ri-timer-2-line text-lg text-blue-500" />
          </div>
          <h5 className='text-lg font-bold'>10.2</h5>
          <p className='text-[11px] text-gray-500 mt-0.5'>Hours Online</p>
        </div>

        <div className='bg-gray-50 rounded-2xl p-4 text-center'>
          <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-amber-50 flex items-center justify-center">
            <i className="ri-speed-up-line text-lg text-amber-500" />
          </div>
          <h5 className='text-lg font-bold'>30 km</h5>
          <p className='text-[11px] text-gray-500 mt-0.5'>Total Distance</p>
        </div>

        <div className='bg-gray-50 rounded-2xl p-4 text-center'>
          <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-emerald-50 flex items-center justify-center">
            <i className="ri-booklet-line text-lg text-emerald-500" />
          </div>
          <h5 className='text-lg font-bold'>8</h5>
          <p className='text-[11px] text-gray-500 mt-0.5'>Trips Done</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails