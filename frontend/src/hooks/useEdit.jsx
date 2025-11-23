import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * 
 * @param {Object} params.mutationFn - The mutation function that will be used to edit an item. This implementation should be passed a service that takes an object { id, data } fields
 * @param {Object} params.queryKey - The query key that will be used to invalidate the query after the mutation is successful. From TanstackQuery
 * @returns {Object}
 * @property {Function} mutate - The mutation from TanstackQuery
 */
export default function useEdit({ mutationFn, queryKey }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => mutationFn(id, data),
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
    }
  });
}
