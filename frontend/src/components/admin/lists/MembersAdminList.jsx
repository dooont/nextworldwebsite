import ItemsList from "../ItemsList.jsx"
import useFetch from "../../../hooks/useFetch.jsx";
import { getAllMembers } from "../../../services/membersService.js";
import Loading from "../../ui/Loading.jsx";
import ItemCard from "../ItemCard.jsx";
import H3 from "../../ui/H3.jsx";
import LoadingSpinner from "../../ui/LoadingSpinner.jsx";

export default function MembersAdminList() {
  const { isPending: isMembersPending, isMembersError, data: allMembers } = useFetch({ queryFn: getAllMembers, queryKey: ['members'], config: { staleTime: 10 * 60 * 1000 } });

  return (
    <ItemsList itemsName="Members">
      {isMembersPending ? <div className="w-full flex justify-center"><LoadingSpinner className="h-20 w-20" /></div> :
        isMembersError ? <ErrorMessage>Could not get members</ErrorMessage> :
          allMembers.map((member) => {
            return (
              <ItemCard key={member.id} onDelete={() => deletepastEvent(member.id)} onEdit={() => onEditClick(member)}>
                <H3>{`${member.firstName} ${member.lastName}`}</H3>
              </ItemCard>
            )
          })}
      {/*isDeletePending && <Loading />*/}
      {/*isDeleteError && <ErrorMessage>Could not delete upcoming event</ErrorMessage>*/}
    </ItemsList>
  )
}