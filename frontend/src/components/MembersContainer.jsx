import useFetch from '../hooks/useFetch.jsx';
import { getMembersByType } from '../services/membersService.js';
import Staff from './Staff.jsx';
import Loading from './ui/Loading.jsx';
import ErrorMessage from './ui/ErrorMessage.jsx';
import InfoMessage from './ui/InfoMessage.jsx';

/**
 * Container component for fetching and displaying members by type
 * @param {String} type - Member type: "exec" or "other"
 * @param {String} title - Section title to display
 */
export default function MembersContainer({ type, title }) {
  const { isPending, isError, data: members } = useFetch({ 
    queryFn: () => getMembersByType(type), 
    queryKey: ['members', type], 
    config: { staleTime: 10 * 60 * 1000 } // 10 minutes cache
  });

  return (
    <>
      <h3 className="text-2xl font-semibold text-left text-white oswald-400">
        {title}
      </h3>
      {isPending ? <Loading item="Members" /> :
      isError ? <ErrorMessage>Could not load {title.toLowerCase()}</ErrorMessage> :
      members.length === 0 ? <InfoMessage>No members found</InfoMessage> :
        <Staff teamMembers={members} />
      }
    </>
  );
}
