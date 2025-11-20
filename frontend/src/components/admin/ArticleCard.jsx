import DeleteButton from "./DeleteButton.jsx";
import useDeleteArticle from "../../hooks/useDeleteArticle.jsx";
import Loading from "../Loading.jsx";
import ErrorMessage from "../ErrorMessage.jsx";
import EditButton from "./EditButton.jsx";

export default function ArticleCard({ item, onEdit }) {
  const {isPending, isError: isDeleteError, mutate: deleteArticle} = useDeleteArticle();
  return (
    <div className="bg-black border border-purple-900 rounded-lg p-5 hover:border-purple-700 transition">
      <h3 className="text-xl font-semibold text-white mb-2 oswald-700">
        {item.title}
      </h3>
      <div className="flex items-center gap-2">
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 oswald-400 text-sm break-all transition mr-4"
        >
          {item.link}
        </a>
        <DeleteButton onClick={() => deleteArticle(item.id)}/>
        {isPending ? <Loading /> :
          isDeleteError ? <ErrorMessage>Could not delete article</ErrorMessage> :
          ''}
        <EditButton onClick={() => onEdit(item)}/>
      </div>
    </div>
  );
}