import React from 'react'
import 'remixicon/fonts/remixicon.css'

const LocationSearchPanel = ({ suggestions, setPanelOpen, setPickup, setDestination, activeField }) => {

    // Ensure suggestions is always an array
    const safeSuggestions = Array.isArray(suggestions) ? suggestions : []

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion.display_name)
        } else if (activeField === 'destination') {
            setDestination(suggestion.display_name)
        }
    }

    return (
        <div>
            {safeSuggestions.map((elem, idx) => (
                <div 
                    key={idx}  
                    onClick={() => handleSuggestionClick(elem)}
                    className='flex gap-4 p-3 rounded-xl border-2 border-gray-50 active:border-black items-center justify-start my-2'
                >
                    <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full'>
                        <i className='ri-map-pin-fill'></i>
                    </h2>
                    <h4 className='font-medium'>{elem.display_name}</h4>
                </div>
            ))}
        </div>
    )
}

export default LocationSearchPanel