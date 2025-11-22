import { api } from "../api/axios.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createArticle } from "../services/articlesService.jsx";

export default function useCreateArticle(){
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (article) => createArticle(article),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
  })
}