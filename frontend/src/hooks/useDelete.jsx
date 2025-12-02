import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * 
 * @param {Object} params.mutationFn - The mutation function that will be used to delete an item. This implementation should be passed a service that takes an id
 * @param {Object} params.queryKey - The query key that will be used to invalidate the query after the mutation is successful. From TanstackQuery
 * @returns {Object}
 * @property {Function} mutate - The mutation from TanstackQuery
 */
export default function useDelete({ mutationFn, queryKey }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => mutationFn(id),
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
    }
  });
}
