import { useState } from 'react';
import axios from 'axios';

export default function AdminPastEvents({ loading, events, handleEventClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
      {events.map((event) => (
        <div
          key={event.id}
          onClick={() => handleEventClick(event)}
          className="group bg-purple-950 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer flex flex-col h-full"
        >
          <div className="relative h-40 w-full overflow-hidden bg-[#4b0082]">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#4b0082] bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-30 transition-opacity" />
          </div>
          <div className="p-4 flex flex-col justify-between flex-1">
            <h3 className="text-xl font-semibold text-white bebas-kai-regular">
              {event.title}
            </h3>
            <p className="text-gray-200 text-sm oswald-400">
              {event.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}