import AdminSection from "./AdminSection.jsx";
import PastEventsForm from "../forms/PastEventsForm.jsx";
import useEditState from "../../../hooks/useEditState.jsx";
import PastEventsAdminList from "../lists/PastEventsAdminList.jsx";

export default function PastEventsAdminSection() {
  const { editingItem, handleSetEdit } = useEditState();

  return (
    <AdminSection>
      <PastEventsForm editingItem={editingItem} />
      <PastEventsAdminList onEditClick={handleSetEdit} />
    </AdminSection>
  );
}
