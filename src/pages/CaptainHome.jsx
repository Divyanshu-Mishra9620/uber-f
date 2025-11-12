import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import ConfirmRidePopup from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);
  const [ridePopupPanel, setRidePopupPanel] = useState(false);

  const confirmRidePopupPanelRef = useRef(null);
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  const ridePopupPanelRef = useRef(null);

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    // return () => clearInterval(locationInterval)
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleNewRide = (data) => {
      console.log("New ride received:", data);
      setRide(data);
      setRidePopupPanel(true);
    };

    socket.on("new-ride", handleNewRide);

    // cleanup on unmount
    return () => {
      socket.off("new-ride", handleNewRide);
    };
  }, [socket]);

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel]
  );

  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // Update ride with confirmed data (includes OTP)
    setRide(response.data);
    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
  }

  return (
    <div className="h-screen relative">
      {/* Top bar */}
      <div className="fixed p-6 top-0 flex items-center justify-between w-full z-20">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png"
          alt=""
        />
        <Link
          to={"/home"}
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow"
        >
          <i className="ri-logout-box-r-line text-lg font-medium"></i>
        </Link>
      </div>

      {/* Map section */}
      <div className="h-[60vh] mt-20 w-full">
        <LiveTracking />
      </div>

      {/* Captain Details section */}
      <div className="h-[40vh] p-6 bg-white">
        <CaptainDetails />
      </div>

      {/* Ride Popups */}
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full translate-y-full z-30 px-3 py-10 pt-12 bg-white bottom-0"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      <div
        ref={confirmRidePopupPanelRef}
        className="fixed h-screen w-full translate-y-full z-40 px-3 py-10 pt-12 bg-white bottom-0"
      >
        <ConfirmRidePopup
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );

  // return (
  //   <div className="h-screen">
  //     <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
  //       <img
  //         className="w-16"
  //         src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png"
  //         alt=""
  //       />
  //       <Link
  //         to={"/home"}
  //         className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
  //       >
  //         <i className="ri-logout-box-r-line text-lg font-medium"></i>
  //       </Link>
  //     </div>

  //     <div className="h-3/5">
  //       <LiveTracking/>
  //     </div>

  //     <div className="h-2/5 p-6">
  //       <CaptainDetails />
  //     </div>

  //     {/* now we create popups similar to user home */}
  //     <div
  //       ref={ridePopupPanelRef}
  //       className="fixed w-full translate-y-full z-10 px-3 py-10 pt-12 bg-white bottom-0"
  //     >
  //       <RidePopUp
  //         ride={ride}
  //         setRidePopupPanel={setRidePopupPanel}
  //         setConfirmRidePopupPanel={setConfirmRidePopupPanel}
  //         confirmRide={confirmRide}
  //       />
  //     </div>

  //     <div
  //       ref={confirmRidePopupPanelRef}
  //       className="fixed h-screen w-full translate-y-full z-10 px-3 py-10 pt-12 bg-white bottom-0"
  //     >
  //       <ConfirmRidePopup
  //       ride={ride}
  //         setConfirmRidePopupPanel={setConfirmRidePopupPanel}
  //         setRidePopupPanel={setRidePopupPanel}
  //       />
  //     </div>
  //   </div>
  // );
};

export default CaptainHome;
