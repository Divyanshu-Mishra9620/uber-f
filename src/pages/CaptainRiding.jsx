import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import FinishRidePopUp from '../components/FinishRidePopUp';
import LiveTracking from '../components/LiveTracking';

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  useGSAP(
    function () {
      gsap.to(finishRidePanelRef.current, {
        transform: finishRidePanel ? "translateY(0)" : "translateY(100%)",
        duration: finishRidePanel ? 0.45 : 0.35,
        ease: finishRidePanel ? "power3.out" : "power2.inOut",
      });
    },
    [finishRidePanel]
  );

  return (
    <div className="h-screen h-dvh relative flex flex-col bg-gray-100 map-page">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 px-5 sm:px-8 pt-5 flex items-center justify-between z-20 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg pointer-events-auto">
          <img className="w-14" src="/uber-logo.svg" alt="Uber" />
        </div>
        <Link to={"/captain-home"} className="h-10 w-10 bg-white/95 backdrop-blur-sm flex items-center justify-center rounded-full shadow-lg active:scale-95 transition-transform pointer-events-auto">
          <i className="ri-logout-box-r-line text-lg" />
        </Link>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <LiveTracking />
      </div>

      {/* Bottom bar — full width but content centered */}
      <div
        className="bg-gray-100 px-5 sm:px-8 py-5 relative z-10 cursor-pointer active:bg-gray-200 transition-all border-t border-gray-200"
        onClick={() => setFinishRidePanel(true)}
      >
        <div className="max-w-lg mx-auto">
          <div className="flex justify-center mb-2">
            <div className="w-8 h-1 bg-gray-300 rounded-full" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className='text-lg font-bold text-gray-900'>4 KM away</h4>
              <p className="text-xs text-gray-500 font-medium">Tap to complete ride</p>
            </div>
            <button className='bg-black text-white px-6 font-semibold py-3 rounded-xl hover:bg-gray-900 active:scale-[0.98] transition-all text-[15px]'>
              Complete Ride
            </button>
          </div>
        </div>
      </div>

      {/* Finish Ride Panel */}
      <div
        ref={finishRidePanelRef}
        className="fixed h-screen w-full sm:max-w-md sm:left-1/2 sm:-translate-x-1/2 lg:max-w-lg translate-y-full z-30 px-5 py-6 pt-3 bg-white bottom-0 overflow-y-auto"
      >
        <FinishRidePopUp ride={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
}

export default CaptainRiding