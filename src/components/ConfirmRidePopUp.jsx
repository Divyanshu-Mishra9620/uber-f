import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopup = (props) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Axios interceptor will automatically add the token from localStorage
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          params: {
            rideId: props.ride._id,
            otp: otp,
          },
        }
      );

      if (response.status === 200) {
        props.setConfirmRidePopupPanel(false);
        props.setRidePopupPanel(false);
        navigate("/captain-riding", { state: { ride: response.data } });
      }
    } catch (err) {
      console.error("Error starting ride:", err);
      const errorMessage =
        err.response?.data?.error || err.response?.data?.message || err.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Panel Handle */}
      <div
        onClick={() => props.setConfirmRidePopupPanel(false)}
        className="flex justify-center mb-4 cursor-pointer"
      >
        <div className="panel-handle !mb-0" />
      </div>

      <h3 className="font-bold text-xl mb-4 tracking-tight">
        Confirm ride to start
      </h3>

      {/* Rider Info */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-50 border border-amber-200 mb-5">
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
            <p className="text-xs text-amber-700">Rider</p>
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

      {/* OTP Section */}
      <div className="mt-5">
        <form onSubmit={submitHandler}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm flex items-start gap-2 animate-fade-in">
              <i className="ri-error-warning-line mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {props.ride?.otp && (
            <div className="otp-display mb-4">
              <p className="text-xs text-white/60 uppercase tracking-wider font-medium mb-2">
                Rider's OTP
              </p>
              <p className="otp-digits">{props.ride.otp}</p>
              <p className="text-xs text-white/50 mt-2">
                Ask the rider for this code
              </p>
            </div>
          )}

          <div className="relative mb-4">
            <i className="ri-key-2-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="otp-input"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength="6"
              className="bg-gray-50 pl-11 pr-4 py-3.5 font-mono text-lg rounded-xl w-full border border-gray-200 tracking-[6px] text-center focus:bg-white focus:border-black transition-all"
            />
          </div>

          <button
            id="start-ride-btn"
            disabled={loading || otp.length < 6}
            className="w-full bg-black text-white font-semibold py-3.5 rounded-xl hover:bg-gray-900 active:scale-[0.98] transition-all text-[15px] disabled:bg-gray-300 disabled:text-gray-500 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="loading-spinner !w-5 !h-5 !border-2 !border-gray-400 !border-t-white" />
                Starting...
              </>
            ) : (
              <>
                <i className="ri-play-fill" />
                Start Ride
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              props.setConfirmRidePopupPanel(false);
              props.setRidePopupPanel(false);
            }}
            className="w-full mt-3 bg-red-50 text-red-600 font-semibold py-3.5 rounded-xl hover:bg-red-100 active:scale-[0.98] transition-all text-[15px]"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
