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
    socket.emit("join", { userId: captain._id, userType: "captain" });
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: { ltd: position.coords.latitude, lng: position.coords.longitude },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, []);

  useEffect(() => {
    if (!socket) return;
    const handleNewRide = (data) => {
      setRide(data);
      setRidePopupPanel(true);
    };
    socket.on("new-ride", handleNewRide);
    return () => { socket.off("new-ride", handleNewRide); };
  }, [socket]);

  useGSAP(
    function () {
      gsap.to(ridePopupPanelRef.current, {
        transform: ridePopupPanel ? "translateY(0)" : "translateY(100%)",
        duration: ridePopupPanel ? 0.45 : 0.35,
        ease: ridePopupPanel ? "power3.out" : "power2.inOut",
      });
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      gsap.to(confirmRidePopupPanelRef.current, {
        y: confirmRidePopupPanel ? "0%" : "100%",
        duration: confirmRidePopupPanel ? 0.45 : 0.35,
        ease: confirmRidePopupPanel ? "power3.out" : "power2.inOut",
      });
    },
    [confirmRidePopupPanel]
  );

  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      { rideId: ride._id, captainId: captain._id }
    );

    setRide(response.data);
    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
  }

  return (
    <div className="h-screen h-dvh relative flex flex-col bg-gray-100 map-page">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 px-5 sm:px-8 pt-5 flex items-center justify-between z-20 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg pointer-events-auto">
          <img className="w-14" src="/uber-logo.svg" alt="Uber" />
        </div>
        <Link to={"/home"} className="h-10 w-10 bg-white/95 backdrop-blur-sm flex items-center justify-center rounded-full shadow-lg active:scale-95 transition-transform pointer-events-auto">
          <i className="ri-logout-box-r-line text-lg" />
        </Link>
      </div>

      {/* Map section */}
      <div className="flex-[3] relative">
        <LiveTracking />
        <div className="map-gradient-overlay" />
      </div>

      {/* Captain Details section — centered on wider */}
      <div className="flex-[2] bg-white px-5 sm:px-8 py-6 panel-bottom relative z-10">
        <div className="max-w-lg mx-auto">
          <CaptainDetails />
        </div>
      </div>

      {/* Ride Popup */}
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full sm:max-w-md sm:left-1/2 sm:-translate-x-1/2 lg:max-w-lg translate-y-full z-30 px-5 py-6 pt-3 bg-white bottom-0 panel-bottom max-h-[85vh] overflow-y-auto"
      >
        <RidePopUp ride={ride} setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} confirmRide={confirmRide} />
      </div>

      {/* Confirm Ride Popup */}
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full sm:max-w-md sm:left-1/2 sm:-translate-x-1/2 lg:max-w-lg translate-y-full z-40 px-5 py-6 pt-3 bg-white bottom-0 panel-bottom max-h-[85vh] overflow-y-auto"
      >
        <ConfirmRidePopup ride={ride} setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;
