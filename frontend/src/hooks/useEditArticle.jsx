import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editArticle } from "../services/articlesService.jsx";

export default function useEditArticle(){
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, article }) => editArticle(id, article),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
  })
}