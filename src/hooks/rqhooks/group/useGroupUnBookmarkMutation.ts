import { unBookmarkGroup } from "@/service/group/unbookmarkGroup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { GroupPaginationData } from "./types";

export const useGroupUnBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unBookmarkGroup,
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ["group"] });

      const previousQueries: Record<string, GroupPaginationData> = {};

      queryClient
        .getQueriesData({ queryKey: ["group", "cursor-pagination"] })
        .forEach(([queryKey, data]) => {
          if (
            data &&
            typeof data === "object" &&
            "pages" in data &&
            Array.isArray(data.pages)
          ) {
            const paginationData = data as GroupPaginationData;
            previousQueries[JSON.stringify(queryKey)] = paginationData;

            const newData: GroupPaginationData = {
              ...paginationData,
              pages: paginationData.pages.map((page) => ({
                ...page,
                data: page.data.map((group) =>
                  group.id === id ? { ...group, isBookmarked: false } : group
                ),
              })),
            };
            queryClient.setQueryData(queryKey, newData);
          }
        });
      return { previousQueries };
    },

    onError: (_, __, context) => {
      if (context?.previousQueries) {
        Object.entries(context.previousQueries).forEach(
          ([queryKeyStr, data]) => {
            const queryKey = JSON.parse(queryKeyStr);
            queryClient.setQueryData(queryKey, data);
          }
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["group"] });
    },
  });
};
