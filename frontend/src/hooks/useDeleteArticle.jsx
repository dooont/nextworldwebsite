import { useMutation } from "@tanstack/react-query"
import { deleteArticleById } from "../services/articlesService.jsx";
import { useQueryClient } from "@tanstack/react-query";

export default function useDeleteArticle(){
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteArticleById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
    });
}