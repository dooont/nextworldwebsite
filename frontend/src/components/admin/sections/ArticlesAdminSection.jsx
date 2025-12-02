import { useState } from 'react';

import ArticlesForm from '../forms/ArticlesForm.jsx';
import ArticlesAdminList from '../lists/ArticlesAdminList.jsx';
import AdminSection from './AdminSection.jsx';
import useEditState from '../../../hooks/useEditState.jsx';


export default function ArticlesAdminSection() {
  const { editingItem, handleSetEdit } = useEditState();


  return (
    <>
      <AdminSection >
        <ArticlesForm editingItem={editingItem} />
        <ArticlesAdminList onEditClick={handleSetEdit} />
      </AdminSection>
    </>
  );
}
