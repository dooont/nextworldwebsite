import useEditState from "../../../hooks/useEditState.jsx";
import MembersForm from "../forms/MembersForm.jsx";
import MembersAdminList from "../lists/MembersAdminList.jsx";
import AdminSection from "./AdminSection.jsx";

export default function MembersAdminSection() {
  const { editingMember, setEditingMember } = useEditState();

  return (
    <AdminSection>
      <MembersForm editingItem={editingMember}/>
      <MembersAdminList />
    </AdminSection>
  )
}