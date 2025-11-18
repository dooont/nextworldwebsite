import Loading from "../Loading.jsx";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios.js";
import FetchingErrorMessage from "../../pages/admin/FetchingErrorMessage.jsx";
import ItemCard from "./ItemCard.jsx";



export default function ItemsList({items}){
  const {isLoading, isError, data: response} = useQuery({
    queryKey: ['articles'],
    queryFn: ()=> api.get('/articles')
  });

  const articles = response?.data || [];
  
  return (
    <div className="bg-gray-900 rounded-lg shadow-2xl p-8 fade-in delay-400">
      <h2 className="text-3xl font-bold text-white racing-sans-one-regular mb-6">
        All {items}
      </h2>

      {isLoading && <Loading item="articles" />}
      {isError && <FetchingErrorMessage message="Could not get articles..." />}
      
      {!isLoading && !isError && articles.length === 0 && (
        <div className="text-center py-12">
          <FetchingErrorMessage message="No articles yet. Add your first one!"/>
        </div>
      )}

      {!isLoading && !isError && articles.length > 0 && (
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {articles.map((article) => (
            <ItemCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}