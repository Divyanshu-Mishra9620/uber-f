import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FinishRidePopUp = (props) => {
  const navigate = useNavigate();

  async function endRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: props.ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      navigate("/captain-home");
    }
  }

  return (
    <div>
      {/* Panel Handle */}
      <div
        onClick={() => props.setFinishRidePanel(false)}
        className="flex justify-center mb-4 cursor-pointer"
      >
        <div className="panel-handle !mb-0" />
      </div>

      <h3 className="font-bold text-xl mb-4 tracking-tight">Finish this ride</h3>

      {/* Rider Info */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-200 mb-5">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
            alt="Rider"
          />
          <div>
            <h2 className="text-base font-semibold capitalize">
              {props.ride?.userId.fullname.firstname}
            </h2>
            <p className="text-xs text-gray-500">Rider</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Distance</p>
          <h5 className="text-base font-bold">2.2 KM</h5>
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

      {/* Actions */}
      <div className="mt-6">
        <button
          id="finish-ride-btn"
          onClick={endRide}
          className="w-full bg-black text-white font-semibold py-3.5 rounded-xl hover:bg-gray-900 active:scale-[0.98] transition-all text-[15px] flex items-center justify-center gap-2"
        >
          <i className="ri-check-double-line text-lg" />
          Finish Ride
        </button>

        <p className="text-xs mt-4 text-center text-gray-400">
          Click finish ride after payment has been collected
        </p>
      </div>
    </div>
  );
};

export default FinishRidePopUp;
