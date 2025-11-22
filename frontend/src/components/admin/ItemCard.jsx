import DeleteButton from "./DeleteButton.jsx";
import EditButton from "./EditButton.jsx";

export default function ItemCard({children, onDelete, onEdit}){
  return (
    <div className="bg-black border border-purple-900 rounded-lg p-5 hover:border-purple-700 transition grid grid-cols-2 justify-items-center">
      <div className="flex flex-col gap-2 max-w-1/2 overflow-auto">
        {children}
      </div>
      <div className="flex items-center gap-2">
        <DeleteButton onClick={onDelete} />
        <EditButton onClick={onEdit} />
      </div>
    </div>
  )
}