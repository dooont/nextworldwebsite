export default function AdminUpcomingEvents({ loading, upcomingEvents }) {
  if (loading) {
    return <h2 className="text-white">Loading Events</h2>
  }

  if (upcomingEvents?.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr mb-8">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            onClick={() => window.open(event.url, '_blank')}
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
            <button className="text-white bg-black mx-2 mb-2 hover:text-black hover:bg-white transition">Edit</button>
          </div>
        ))}
      </div >)
  }
}