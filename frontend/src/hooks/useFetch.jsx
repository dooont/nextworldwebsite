import { useQuery } from "@tanstack/react-query";

export default function useFetch({ queryFn, queryKey, config = {} }) {
  return useQuery({
    queryKey,
    queryFn,
    ...config
  });
}
