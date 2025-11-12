import React from 'react'
import { Link,useLocation } from 'react-router-dom'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef,useState } from "react";
import FinishRidePopUp from '../components/FinishRidePopUp';
import LiveTracking from '../components/LiveTracking';

const CaptainRiding = () => {

      const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;
  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );


  // return (
  //   <div className="h-screen relative">


  //     <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
  //       <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png" alt="" />
  //       <Link to={"/captain-home"} className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
  //       <i className="ri-logout-box-r-line text-lg font-medium"></i>
  //     </Link>
  //     </div>


  //     <div className="h-1/5 p-6 flex items-center relative justify-between bg-yellow-400" onClick={()=>{setFinishRidePanel(true)}}>


  //       <h5
  //         onClick={() => {

  //         }}
  //         className="p-1 text-center w-[95%] absolute top-0"
  //       >
  //         <i className="ri-arrow-up-wide-line text-gray-800 text-3xl"></i>
  //       </h5>

  //       <h4 className='text-xl font-semibold'>4 KM away</h4>
  //       <button className=' bg-green-600 text-white px-10 font-semibold p-3 rounded-lg'>Complete Ride</button>
  //     </div>

  //         {/* this panel open when ride finish */}
  //     <div ref={finishRidePanelRef} className="fixed h-screen w-full translate-y-full z-10 px-3 py-10 pt-12 bg-white bottom-0">
  //       <FinishRidePopUp ride={rideData} setFinishRidePanel={setFinishRidePanel}/>
  //     </div>

  //     <div className='h-screen fixed w-screen top-0 z-[-1]'>
  //               <LiveTracking />
  //           </div>

  //   </div>
  // )

  return (
  <div className="h-screen relative flex flex-col">

    {/* Map as top section */}
    <div className="flex-1">
      <LiveTracking />
    </div>

    {/* Yellow info box below the map */}
    <div
      className="h-1/5 p-6 flex items-center justify-between bg-yellow-400 relative z-10"
      onClick={() => setFinishRidePanel(true)}
    >
      <h5 className="p-1 text-center w-[95%] absolute top-0">
        <i className="ri-arrow-up-wide-line text-gray-800 text-3xl"></i>
      </h5>

      <h4 className="text-xl font-semibold">4 KM away</h4>
      <button className="bg-green-600 text-white px-10 font-semibold p-3 rounded-lg">
        Complete Ride
      </button>
    </div>

    {/* Top bar (logo + logout) */}
    <div className="fixed top-0 left-0 right-0 p-6 flex items-center justify-between z-20">
      <img
        className="w-16"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png"
        alt=""
      />
      <Link
        to={"/captain-home"}
        className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow"
      >
        <i className="ri-logout-box-r-line text-lg font-medium"></i>
      </Link>
    </div>

    {/* Finish Ride Panel */}
    <div
      ref={finishRidePanelRef}
      className="fixed h-screen w-full translate-y-full z-30 px-3 py-10 pt-12 bg-white bottom-0"
    >
      <FinishRidePopUp ride={rideData} setFinishRidePanel={setFinishRidePanel} />
    </div>
  </div>
);

}

export default CaptainRiding