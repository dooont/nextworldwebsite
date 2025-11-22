import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../services/articlesService.jsx";

export default function useArticles(){
  return useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
    staleTime: 10 * 60 * 1000, //10 min
  });
}