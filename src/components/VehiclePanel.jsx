import React from "react";

const VehiclePanel = (props) => {
  const vehicles = [
    {
      type: "car",
      name: "UberGo",
      seats: 4,
      eta: "2 mins",
      desc: "Affordable, compact rides",
      img: "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg",
    },
    {
      type: "moto",
      name: "Moto",
      seats: 1,
      eta: "3 mins",
      desc: "Affordable motorcycle ride",
      img: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n",
    },
    {
      type: "auto",
      name: "UberAuto",
      seats: 3,
      eta: "2 mins",
      desc: "Affordable auto rickshaw",
      img: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n",
    },
  ];

  return (
    <div>
      {/* Panel Handle */}
      <div
        onClick={() => props.setVehiclePanelOpen(false)}
        className="flex justify-center mb-3 cursor-pointer py-1"
      >
        <div className="panel-handle !mb-0" />
      </div>

      <h3 className="font-bold text-[22px] mb-1 tracking-tight text-gray-900">Choose a ride</h3>
      <p className="text-gray-500 text-sm mb-5">Select your preferred vehicle type</p>

      <div className="space-y-3">
        {vehicles.map((v) => (
          <div
            key={v.type}
            onClick={() => {
              props.setConfirmRidePanel(true);
              props.selectVehicle(v.type);
            }}
            className="vehicle-card flex items-center gap-4"
          >
            <div className="w-[76px] h-[52px] bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                className="h-12 w-full object-contain"
                src={v.img}
                alt={v.name}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-[15px] text-gray-900">{v.name}</h4>
                <span className="inline-flex items-center gap-0.5 text-[11px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-md font-medium">
                  <i className="ri-user-3-fill text-[9px]" />{v.seats}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {v.eta}
                </span>
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-500">{v.desc}</span>
              </div>
            </div>
            <div className="text-right pl-2 flex-shrink-0">
              <p className="font-bold text-base text-gray-900">₹{props.fare[v.type]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehiclePanel;
