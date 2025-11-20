import Loading from "../Loading.jsx";
import InfoMessage from "../InfoMessage.jsx";
import ErrorMessage from "../ErrorMessage.jsx";

//this component is meant to be reusable for any item

export default function ItemsList({itemsName, CardComponent, useFetchHook, emptyMessage, onEdit}){
  const {isLoading, isError: fetchError, data: response} = useFetchHook();

  const items = response?.data || [];
  
  return (
    <div className="bg-gray-900 rounded-lg shadow-2xl p-8 fade-in delay-400 flex flex-col gap-4">
      <h2 className="text-3xl font-bold text-white racing-sans-one-regular mb-6">
        All {itemsName}
      </h2>

      {isLoading ? <Loading item={itemsName} /> :
        fetchError ? <ErrorMessage>Could not retrieve {itemsName}. Contact developer</ErrorMessage> :
        items.length === 0 ? <InfoMessage>{emptyMessage}</InfoMessage> :
        items.map((item) => <CardComponent key={item.id} item={item} onEdit={onEdit} />)
      }
    </div>
  )
}