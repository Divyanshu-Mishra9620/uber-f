import React from "react";
import { Link,useLocation  } from "react-router-dom";
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from "../components/LiveTracking";

const Riding = () => {


  const location = useLocation()
    const { ride } = location.state || {} // Retrieve ride data
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    socket.on("ride-ended", () => {
        navigate('/home')
    })

  // return (
  //   <div className="h-screen">

  //     <Link to={"/home"} className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
  //       <i className="ri-home-5-line text-lg font-medium"></i>
  //     </Link>

  //     <div className="h-1/2">
  //       <LiveTracking />
  //     </div>

  //     <div className="h-1/2 p-4">

  //       <div className="flex items-center justify-between">
  //         <img
  //           className="h-12"
  //           src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
  //           alt=""
  //         />

  //         <div className="text-right">
  //           <h2 className="text-lg font-medium capitalize">{ride?.captain.fullname.firstname}</h2>
  //           <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate}</h4>
  //           <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
  //         </div>
  //       </div>

  //       <div className="flex gap-2 justify-between flex-col items-center">
  //         <div className="w-full mt-5">
           

  //           <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
  //             <i className="ri-map-pin-2-fill text-lg"></i>
  //             <div>
  //               <h3 className="text-lg font-medium">562/11-A</h3>
  //               <p className="text-sm -mt-1 text-gray-600">
  //                 {ride?.destination}
  //               </p>
  //             </div>
  //           </div>

  //           <div className="flex items-center gap-5 p-3">
  //             <i className="ri-currency-line text-lg"></i>
  //             <div>
  //               <h3 className="text-lg font-medium">${ride?.fare}</h3>
  //               <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
  //             </div>
  //           </div>
  //         </div>

  //       </div>

  //       <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>

  //     </div>
  //   </div>
  // );

    return (
  <div className="h-screen flex flex-col">

    {/* Floating Home Button */}
    <Link
      to={"/home"}
      className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md z-20"
    >
      <i className="ri-home-5-line text-lg font-medium"></i>
    </Link>

    {/* Map Section */}
    <div className="h-1/2 relative z-0">
      <LiveTracking />
    </div>

    {/* Ride Details Section */}
    <div className="h-1/2 p-4 bg-white relative z-10 shadow-lg rounded-t-2xl">
      <div className="flex items-center justify-between">
        <img
          className="h-12 rounded"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />

        <div className="text-right">
          <h2 className="text-lg font-medium capitalize">
            {ride?.captain.fullname.firstname}
          </h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">
            {ride?.captain.vehicle.plate}
          </h4>
          <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
        </div>
      </div>

      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b border-gray-300">
          <i className="ri-map-pin-2-fill text-lg"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-3">
          <i className="ri-currency-line text-lg"></i>
          <div>
            <h3 className="text-lg font-medium">${ride?.fare}</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash</p>
          </div>
        </div>
      </div>

      <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg shadow-md">
        Make a Payment
      </button>
    </div>
  </div>
);

};

export default Riding;
