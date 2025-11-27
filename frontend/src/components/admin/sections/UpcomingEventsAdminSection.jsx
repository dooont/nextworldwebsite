import AdminSection from "./AdminSection.jsx";
import UpcomingEventsForm from "../forms/UpcomingEventsForm.jsx";
import useEditState from "../../../hooks/useEditState.jsx";
import UpcomingEventsList from "../lists/UpcomingEventsList.jsx";

export default function UpcomingEventsAdminSection() {
  const { editingItem, handleSetEdit } = useEditState();

  return (
    <AdminSection>
      <UpcomingEventsForm editingItem={editingItem} />
      <UpcomingEventsList onEditClick={handleSetEdit} />
    </AdminSection>
  );
}