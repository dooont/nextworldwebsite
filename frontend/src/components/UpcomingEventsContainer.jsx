import useFetch from '../hooks/useFetch.jsx';
import { getUpcomingEvents } from '../services/upcomingEventsService.jsx';
import UpcomingEventCard from './UpcomingEventCard.jsx';
import Loading from './ui/Loading.jsx';
import ErrorMessage from './ui/ErrorMessage.jsx';
import InfoMessage from './ui/InfoMessage.jsx';

export default function UpcomingEventsContainer() {
  const { isPending, isError, data: events } = useFetch({ 
    queryFn: getUpcomingEvents, 
    queryKey: ['upcoming-events'], 
    config: { staleTime: 5 * 60 * 1000 } // 5 minutes cache
  });

  return (
    <>
      <h2 className="text-5xl text-white font-bold mb-6 racing-sans-one-regular">
        Upcoming Events
      </h2>
      {isPending ? <Loading item="Events" /> :
        isError ? <ErrorMessage className="mb-6">Could not load upcoming events</ErrorMessage> :
          events.length === 0 ? <InfoMessage className="mb-6">There are currently no upcoming events</InfoMessage> :
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr mb-8">
              {events.map(event => (
                <UpcomingEventCard key={event.id} event={event} />
              ))}
            </div>
      }
    </>
  );
}
