import DeleteButton from "./DeleteButton.jsx";
import useDeleteArticle from "../../hooks/useDeleteArticle.jsx";
import Loading from "../ui/Loading.jsx";
import ErrorMessage from "../ui/ErrorMessage.jsx";
import EditButton from "./EditButton.jsx";
import ItemCard from "../ItemCard.jsx";

export default function ArticleCard({ item, onEdit }) {
  const {isPending, isError: isDeleteError, mutate: deleteArticle} = useDeleteArticle();
  return (
    <ItemCard />
  );
}