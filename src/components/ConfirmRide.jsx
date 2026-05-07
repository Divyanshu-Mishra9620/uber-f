import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div>
      {/* Panel Handle */}
      <div
        onClick={() => props.setConfirmRidePanel(false)}
        className="flex justify-center mb-4 cursor-pointer"
      >
        <div className="panel-handle !mb-0" />
      </div>

      <h3 className="font-bold text-xl mb-5 tracking-tight">Confirm your ride</h3>

      <div className='flex flex-col items-center'>
        <div className="w-full bg-gray-50 rounded-2xl p-4 mb-4">
          <img
            className='h-24 mx-auto object-contain'
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt="Vehicle"
          />
        </div>

        <div className='w-full'>
          {/* Pickup */}
          <div className='ride-info-row'>
            <div className="ride-info-icon bg-emerald-50 text-emerald-600">
              <i className="ri-map-pin-user-fill" />
            </div>
            <div className="flex-1 min-w-0">
              <p className='text-xs text-gray-500 uppercase tracking-wide font-medium'>Pickup</p>
              <p className='text-sm font-medium text-gray-900 mt-0.5 truncate'>{props.pickup}</p>
            </div>
          </div>

          {/* Destination */}
          <div className='ride-info-row'>
            <div className="ride-info-icon bg-red-50 text-red-500">
              <i className="ri-map-pin-2-fill" />
            </div>
            <div className="flex-1 min-w-0">
              <p className='text-xs text-gray-500 uppercase tracking-wide font-medium'>Destination</p>
              <p className='text-sm font-medium text-gray-900 mt-0.5 truncate'>{props.destination}</p>
            </div>
          </div>

          {/* Fare */}
          <div className='ride-info-row'>
            <div className="ride-info-icon bg-amber-50 text-amber-600">
              <i className="ri-money-rupee-circle-line" />
            </div>
            <div className="flex-1">
              <p className='text-xs text-gray-500 uppercase tracking-wide font-medium'>Fare</p>
              <p className='text-sm font-medium text-gray-900 mt-0.5'>₹{props.fare[props.vehicleType]}</p>
            </div>
            <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full text-gray-600 font-medium">Cash</span>
          </div>
        </div>

        <button
          id="confirm-ride-btn"
          onClick={() => {
            props.setVehicleFound(true)
            props.setConfirmRidePanel(false)
            props.createRide()
          }}
          className='w-full mt-4 bg-black text-white font-semibold py-3.5 rounded-xl hover:bg-gray-900 active:scale-[0.98] transition-all text-[15px]'
        >
          Confirm Ride
        </button>
      </div>
    </div>
  )
}

export default ConfirmRide