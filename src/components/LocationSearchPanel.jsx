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
        <div className="py-2">
            {safeSuggestions.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <i className="ri-search-line text-3xl mb-3" />
                    <p className="text-sm font-medium">Search for a location</p>
                    <p className="text-xs mt-1">Type at least 3 characters</p>
                </div>
            )}
            {safeSuggestions.map((elem, idx) => (
                <div
                    key={idx}
                    onClick={() => handleSuggestionClick(elem)}
                    className='suggestion-item'
                >
                    <div className='w-10 h-10 bg-gray-100 flex items-center justify-center rounded-full flex-shrink-0'>
                        <i className='ri-map-pin-line text-gray-600' />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className='text-sm font-medium text-gray-900 truncate'>{elem.display_name}</h4>
                    </div>
                    <i className="ri-arrow-right-up-line text-gray-300 flex-shrink-0" />
                </div>
            ))}
        </div>
    )
}

export default LocationSearchPanel