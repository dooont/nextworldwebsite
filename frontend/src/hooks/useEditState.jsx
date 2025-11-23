import { useState } from "react";

export default function useEditState() {
  const [editingItem, setEditingItem] = useState(null);

  function handleSetEdit(item) {
    if (editingItem?.id !== item.id) {
      setEditingItem(item);
    } else {
      setEditingItem(null);
    }
  }

  return { editingItem, handleSetEdit };
}