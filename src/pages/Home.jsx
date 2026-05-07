import React, { useState, useRef, useContext, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);

  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [findingTrip, setFindingTrip] = useState(false);

  const [ride, setRide] = useState(null);

  const { user } = useContext(UserDataContext);
  const { socket } = useContext(SocketContext);

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (data) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(data);
  });

  socket.on("ride-started", (data) => {
    setWaitingForDriver(false);
    navigate('/riding', { state: { ride: data } });
  });

  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);
    if (value.length > 2) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPickupSuggestions(response.data);
      } catch {
        // silently handle
      }
    } else {
      setPickupSuggestions([]);
    }
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);
    if (value.length > 2) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDestinationSuggestions(response.data);
      } catch {
        // silently handle
      }
    } else {
      setDestinationSuggestions([]);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  // GSAP panel animations with professional easing
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, { height: "70%", padding: 24, duration: 0.4, ease: "power3.out" });
        gsap.to(panelCloseRef.current, { opacity: 1, duration: 0.3 });
      } else {
        gsap.to(panelRef.current, { height: "0%", padding: 0, duration: 0.35, ease: "power2.inOut" });
        gsap.to(panelCloseRef.current, { opacity: 0, duration: 0.2 });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      gsap.to(vehiclePanelRef.current, {
        transform: vehiclePanelOpen ? "translateY(0)" : "translateY(100%)",
        duration: vehiclePanelOpen ? 0.45 : 0.35,
        ease: vehiclePanelOpen ? "power3.out" : "power2.inOut",
      });
    },
    [vehiclePanelOpen]
  );

  useGSAP(
    function () {
      gsap.to(confirmRidePanelRef.current, {
        transform: confirmRidePanel ? "translateY(0)" : "translateY(100%)",
        duration: confirmRidePanel ? 0.45 : 0.35,
        ease: confirmRidePanel ? "power3.out" : "power2.inOut",
      });
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      gsap.to(vehicleFoundRef.current, {
        transform: vehicleFound ? "translateY(0)" : "translateY(100%)",
        duration: vehicleFound ? 0.45 : 0.35,
        ease: vehicleFound ? "power3.out" : "power2.inOut",
      });
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      gsap.to(waitingForDriverRef.current, {
        transform: waitingForDriver ? "translateY(0)" : "translateY(100%)",
        duration: waitingForDriver ? 0.45 : 0.35,
        ease: waitingForDriver ? "power3.out" : "power2.inOut",
      });
    },
    [waitingForDriver]
  );

  async function findTrip() {
    setFindingTrip(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setFare(response.data);
      setPanelOpen(false);
      setVehiclePanelOpen(true);
    } catch (err) {
      console.error("Error finding trip:", err);
    } finally {
      setFindingTrip(false);
    }
  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup, destination, vehicleType
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: '#f3f4f6',
    border: '1.5px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '15px',
    color: '#111',
    outline: 'none',
    transition: 'all 0.2s',
    fontWeight: 500,
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ height: '100dvh', position: 'relative', overflow: 'hidden', background: '#e5e7eb' }}>

      {/* Top Bar */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, zIndex: 20, padding: '20px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', pointerEvents: 'none' }}>
        <div style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderRadius: '16px', padding: '8px 12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', pointerEvents: 'auto' }}>
          <img
            src="/uber-logo.svg"
            alt="Uber Logo"
            style={{ width: '56px', height: 'auto', display: 'block' }}
          />
        </div>
        <button style={{ height: '40px', width: '40px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: 'none', cursor: 'pointer', pointerEvents: 'auto', fontSize: '18px', color: '#111' }}>
          <i className="ri-user-3-line" />
        </button>
      </div>

      {/* Map */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <LiveTracking />
      </div>

      {/* Bottom Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'absolute', top: 0, height: '100%', width: '100%', pointerEvents: 'none', zIndex: 10 }}>
        <div style={{
          background: '#ffffff',
          padding: '24px 24px 28px',
          position: 'relative',
          pointerEvents: 'auto',
          borderRadius: '24px 24px 0 0',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.04), 0 -8px 32px rgba(0,0,0,0.08)',
          maxWidth: '480px',
          width: '100%',
          margin: '0 auto',
        }}>
          {/* Handle */}
          <div style={{ width: '36px', height: '4px', background: '#d1d5db', borderRadius: '100px', margin: '0 auto 16px' }} />

          {/* Close button */}
          <div
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            style={{ position: 'absolute', cursor: 'pointer', opacity: 0, top: '20px', right: '20px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#f3f4f6', zIndex: 10 }}
          >
            <i className="ri-close-line" style={{ fontSize: '18px' }} />
          </div>

          {/* Title */}
          <h4 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px', letterSpacing: '-0.02em', color: '#111' }}>Where to?</h4>

          <form onSubmit={submitHandler}>
            <div style={{ position: 'relative', paddingLeft: '24px' }}>
              {/* Route line indicator */}
              <div style={{ position: 'absolute', left: '7px', top: '18px', bottom: '18px', width: '2px', background: '#d1d5db' }}>
                <div style={{ position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)', width: '10px', height: '10px', borderRadius: '50%', background: '#000', border: '2px solid #fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                <div style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', width: '10px', height: '10px', borderRadius: '2px', background: '#9ca3af', border: '2px solid #fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </div>

              <input
                id="pickup-input"
                type="text"
                value={pickup}
                onChange={handlePickupChange}
                placeholder="Pickup location"
                onClick={() => { setPanelOpen(true); setActiveField("pickup"); }}
                style={{ ...inputStyle, marginBottom: '12px' }}
                onFocus={(e) => { e.target.style.background = '#fff'; e.target.style.borderColor = '#000'; }}
                onBlur={(e) => { e.target.style.background = '#f3f4f6'; e.target.style.borderColor = '#e5e7eb'; }}
              />

              <input
                id="destination-input"
                type="text"
                value={destination}
                onChange={handleDestinationChange}
                placeholder="Where to?"
                onClick={() => { setPanelOpen(true); setActiveField("destination"); }}
                style={inputStyle}
                onFocus={(e) => { e.target.style.background = '#fff'; e.target.style.borderColor = '#000'; }}
                onBlur={(e) => { e.target.style.background = '#f3f4f6'; e.target.style.borderColor = '#e5e7eb'; }}
              />
            </div>

            <button
              id="find-trip-btn"
              onClick={findTrip}
              disabled={!pickup || !destination || findingTrip}
              style={{
                width: '100%',
                marginTop: '20px',
                padding: '14px',
                background: (!pickup || !destination || findingTrip) ? '#e5e7eb' : '#000',
                color: (!pickup || !destination || findingTrip) ? '#9ca3af' : '#fff',
                fontWeight: 600,
                fontSize: '15px',
                borderRadius: '12px',
                border: 'none',
                cursor: (!pickup || !destination || findingTrip) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
            >
              {findingTrip ? (
                <>
                  <div className="loading-spinner" style={{ width: '18px', height: '18px' }} />
                  Searching...
                </>
              ) : (
                <>
                  <i className="ri-search-line" />
                  Find Trip
                </>
              )}
            </button>
          </form>
        </div>

        {/* Location suggestions panel */}
        <div
          ref={panelRef}
          style={{ height: 0, background: '#fff', overflow: 'auto', pointerEvents: 'auto', maxWidth: '480px', width: '100%', margin: '0 auto' }}
        >
          <LocationSearchPanel
            suggestions={activeField === "pickup" ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      {/* Vehicle Selection Panel */}
      <div
        ref={vehiclePanelRef}
        style={{ position: 'fixed', width: '100%', maxWidth: '480px', left: '50%', transform: 'translateX(-50%) translateY(100%)', zIndex: 10, padding: '12px 20px 24px', background: '#fff', bottom: 0, borderRadius: '24px 24px 0 0', boxShadow: '0 -2px 8px rgba(0,0,0,0.04), 0 -8px 32px rgba(0,0,0,0.08)', maxHeight: '75vh', overflowY: 'auto' }}
      >
        <VehiclePanel fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} selectVehicle={setVehicleType} />
      </div>

      {/* Confirm Ride Panel */}
      <div
        ref={confirmRidePanelRef}
        style={{ position: 'fixed', width: '100%', maxWidth: '480px', left: '50%', transform: 'translateX(-50%) translateY(100%)', zIndex: 10, padding: '12px 20px 24px', background: '#fff', bottom: 0, borderRadius: '24px 24px 0 0', boxShadow: '0 -2px 8px rgba(0,0,0,0.04), 0 -8px 32px rgba(0,0,0,0.08)', maxHeight: '85vh', overflowY: 'auto' }}
      >
        <ConfirmRide createRide={createRide} pickup={pickup} fare={fare} vehicleType={vehicleType} destination={destination} setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>

      {/* Looking for Driver Panel */}
      <div
        ref={vehicleFoundRef}
        style={{ position: 'fixed', width: '100%', maxWidth: '480px', left: '50%', transform: 'translateX(-50%) translateY(100%)', zIndex: 10, padding: '12px 20px 24px', background: '#fff', bottom: 0, borderRadius: '24px 24px 0 0', boxShadow: '0 -2px 8px rgba(0,0,0,0.04), 0 -8px 32px rgba(0,0,0,0.08)', maxHeight: '85vh', overflowY: 'auto' }}
      >
        <LookingForDriver createRide={createRide} pickup={pickup} fare={fare} vehicleType={vehicleType} destination={destination} setVehicleFound={setVehicleFound} />
      </div>

      {/* Waiting for Driver Panel */}
      <div
        ref={waitingForDriverRef}
        style={{ position: 'fixed', width: '100%', maxWidth: '480px', left: '50%', transform: 'translateX(-50%) translateY(100%)', zIndex: 10, padding: '12px 20px 24px', background: '#fff', bottom: 0, borderRadius: '24px 24px 0 0', boxShadow: '0 -2px 8px rgba(0,0,0,0.04), 0 -8px 32px rgba(0,0,0,0.08)', maxHeight: '85vh', overflowY: 'auto' }}
      >
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} ride={ride} setVehicleFound={setVehicleFound} waitingForDriver={waitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
