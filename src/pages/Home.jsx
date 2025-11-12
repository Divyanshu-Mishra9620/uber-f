import React, { useState, useRef,useContext,useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import {SocketContext} from "../context/SocketContext";
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
  const [vehicleType, setVehicleType] = useState(null)

  const [ ride, setRide ] = useState(null)

  const {user}=useContext(UserDataContext);
  const {socket}=useContext(SocketContext);

  const navigate=useNavigate();

  useEffect(() => {

    // console.log(user._id)

    socket.emit("join",{userType:"user", userId: user._id});
  }, [user])

  socket.on("ride-confirmed", (data) => {
    console.log("Ride accepted:", data);
     setVehicleFound(false)
    setWaitingForDriver(true);
    setRide(data)
  })

  socket.on("ride-started", (data) => {
    console.log("Ride started:", data);
    // navigate to ride in progress page
    setWaitingForDriver(false)
    navigate('/riding',{state:{ride: data}}) // Updated navigate to include ride data
  })
  

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
        // handle error
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
        // handle error
      }
    } else {
      setDestinationSuggestions([]);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  // GSAP animations for panelOpen
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  // GSAP animation for vehiclePanelOpen
  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanelOpen]
  );

  // GSAP animation for confirmRidePanel
  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  // as we click on confirm waiting for driver should come
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  // GSAP animation for waitingForDriver
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  async function findTrip(){
    setPanelOpen(false);
    setVehiclePanelOpen(true);

    const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,{
      params:{pickup,destination},
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    console.log(response.data);
    setFare(response.data);
  }

  async function createRide(){
    console.log(pickup,destination,vehicleType);
    // this should run as we select car auto aur moto
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
      pickup,destination,vehicleType
    },{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    console.log(response);
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png"
        alt="Uber Logo"
        className="w-16 absolute left-5 top-5"
      />
      <div className="h-screen w-screen">
        <LiveTracking/>
      </div>
      <div className="flex flex-col justify-end absolute top-0 h-screen w-full">
        <div className="h-[30%] bg-white p-6 relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute cursor-pointer opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[60%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              value={pickup}
              onChange={handlePickupChange}
              placeholder="Add a pickup location"
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
            />
            <input
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              value={destination}
              onChange={handleDestinationChange}
              placeholder="Enter your destination"
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
            />
          </form>

          <button onClick={findTrip} className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full">
            Find Trip
          </button>
        </div>
        <div className="h-0 bg-white" ref={panelRef}>
          <LocationSearchPanel
            suggestions={
              activeField === "pickup" ? pickupSuggestions : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 px-3 py-10 pt-12 translate-y-full bg-white bottom-0"
      >
        <VehiclePanel
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanelOpen={setVehiclePanelOpen}
          selectVehicle={setVehicleType}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 px-3 py-6 pt-12 translate-y-full bg-white bottom-0"
      >
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          fare={fare}
          vehicleType={vehicleType}
          destination={destination}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 px-3 py-6 pt-12 translate-y-full bg-white bottom-0"
      >
        <LookingForDriver createRide={createRide} pickup={pickup}
          fare={fare}
          vehicleType={vehicleType}
          destination={destination}
         setVehicleFound={setVehicleFound} />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 px-3 py-6 pt-12 bg-white bottom-0"
      >
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} ride={ride} setVehicleFound={setVehicleFound} waitingForDriver={waitingForDriver}/>
      </div>
    </div>
  );
};

export default Home;
