import useFetch from '../../../hooks/useFetch.jsx';
import useDelete from '../../../hooks/useDelete.jsx';
import { getArticles, deleteArticleById } from '../../../services/articlesService.jsx';
import ItemsList from '../ItemsList.jsx';
import ItemCard from '../ItemCard.jsx';
import H3 from '../../ui/H3.jsx';
import Anchor from '../../ui/Anchor.jsx';
import Loading from '../../ui/Loading.jsx';
import ErrorMessage from '../../ui/ErrorMessage.jsx';

export default function ArticleAdminList({ onEditClick }) {
  const { isPending, isError, data: articles } = useFetch({ queryFn: getArticles, queryKey: ['articles'], config: { staleTime: 10 * 60 * 1000 } });
  const { isDeletePending, isDeleteError, mutate: deleteArticle } = useDelete({ mutationFn: deleteArticleById, queryKey: ['articles'] });

  return (
    <ItemsList itemsName="Articles">
      {isPending ? <Loading /> :
        isError ? <ErrorMessage>Could not get articles</ErrorMessage> :
          articles.map((article) => {
            return (
              <ItemCard key={article.id} onDelete={() => deleteArticle(article.id)} onEdit={() => onEditClick(article)}>
                <H3>{article.title}</H3>
                <Anchor>{article.link}</Anchor>
              </ItemCard>
            )
          })}

      {isDeletePending && <Loading />}
      {isDeleteError && <ErrorMessage>Could not delete article</ErrorMessage>}
    </ItemsList>
  )
}