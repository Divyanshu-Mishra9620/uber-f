import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
        <h5
          onClick={() => {
            props.setRidePopupPanel(false)
          }}
          className="p-1 text-center w-[90%] absolute top-0"
        >
          <i className="ri-arrow-down-wide-line text-gray-200 text-3xl"></i>
        </h5>

        <h3 className="font-semibold text-2xlcmb-5">New Ride Available !</h3>

        <div className='flex items-center justify-between p-3 rounded-lg bg-yellow-400 mt-4'>
            <div className='flex items-center gap-3'>
                <img className='h-12 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" />
                <h2 className='text-xl font-medium'>{props.ride?.userId.fullname.firstname+ " "+props.ride?.userId.fullname.lastname}</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2 KM</h5>
        </div>

        <div className='flex gap-2 justify-between flex-col items-center'>
            <div className='w-full mt-5'>

                <div className='flex items-center gap-5 p-3 border-b-2 border-gray-300'>
                    <i className="ri-map-pin-user-fill text-lg"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                    </div>
                </div>

                <div className='flex items-center gap-5 p-3 border-b-2 border-gray-300'>
                    <i className="ri-map-pin-2-fill text-lg"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                    </div>
                </div>

                <div className='flex items-center gap-5 p-3'>
                    <i className="ri-currency-line text-lg"></i>
                    <div>
                        <h3 className='text-lg font-medium'>${props.ride?.fare}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                    </div>
                </div>

            </div>
            <div className=' mt-5 flex w-full items-center justify-between'>

                <button onClick={()=>{
                props.setridePopupPanel(false)
            }} className=' mt-1 bg-gray-300 text-gray-700 px-10 font-semibold p-3 rounded-lg'>Ignore</button>


                <button onClick={()=>{
                props.setConfirmRidePopupPanel(true)
                props.confirmRide()
            }} className=' bg-green-600 text-white px-10 font-semibold p-3 rounded-lg'>Accept</button>

            </div>
        </div>
    </div>
  )
}

export default RidePopUp