import useEditState from "../../../hooks/useEditState.jsx";
import MembersForm from "../forms/MembersForm.jsx";
import MembersAdminList from "../lists/MembersAdminList.jsx";
import AdminSection from "./AdminSection.jsx";

export default function MembersAdminSection() {
  const { editingItem, handleSetEdit } = useEditState();

  return (
    <AdminSection>
      <MembersForm editingItem={editingItem}/>
      <MembersAdminList onEditClick={handleSetEdit}/>
    </AdminSection>
  )
}