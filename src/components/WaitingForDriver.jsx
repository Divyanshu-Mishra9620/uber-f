import React from "react";

const WaitingForDriver = (props) => {
  return (
    <div>
      {/* Panel Handle */}
      <div
        onClick={() => props.setWaitingForDriver(false)}
        className="flex justify-center mb-4 cursor-pointer"
      >
        <div className="panel-handle !mb-0" />
      </div>

      {/* Driver Info Card */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              className='h-14 w-14 rounded-full object-cover border-2 border-gray-200'
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
              alt="Driver"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <i className="ri-check-line text-white text-[10px]" />
            </div>
          </div>
          <div>
            <h2 className="text-base font-semibold capitalize">{props.ride?.captain.fullname.firstname}</h2>
            <p className="text-xs text-gray-500">{props.ride?.captain.vehicle.plate}</p>
          </div>
        </div>

        {/* OTP Badge */}
        <div className="text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-1">OTP</p>
          <div className="bg-black text-white px-4 py-2 rounded-xl">
            <p className="text-lg font-bold tracking-[4px] font-mono">{props.ride?.otp}</p>
          </div>
        </div>
      </div>

      {/* Ride Details */}
      <div className="w-full">
        <div className='ride-info-row'>
          <div className="ride-info-icon bg-emerald-50 text-emerald-600">
            <i className="ri-map-pin-user-fill" />
          </div>
          <div className="flex-1 min-w-0">
            <p className='text-xs text-gray-500 uppercase tracking-wide font-medium'>Pickup</p>
            <p className='text-sm font-medium text-gray-900 mt-0.5 truncate'>{props.ride?.pickup}</p>
          </div>
        </div>

        <div className='ride-info-row'>
          <div className="ride-info-icon bg-red-50 text-red-500">
            <i className="ri-map-pin-2-fill" />
          </div>
          <div className="flex-1 min-w-0">
            <p className='text-xs text-gray-500 uppercase tracking-wide font-medium'>Destination</p>
            <p className='text-sm font-medium text-gray-900 mt-0.5 truncate'>{props.ride?.destination}</p>
          </div>
        </div>

        <div className='ride-info-row'>
          <div className="ride-info-icon bg-amber-50 text-amber-600">
            <i className="ri-money-rupee-circle-line" />
          </div>
          <div className="flex-1">
            <p className='text-xs text-gray-500 uppercase tracking-wide font-medium'>Fare</p>
            <p className='text-sm font-medium text-gray-900 mt-0.5'>₹{props.ride?.fare}</p>
          </div>
          <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full text-gray-600 font-medium">Cash</span>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
