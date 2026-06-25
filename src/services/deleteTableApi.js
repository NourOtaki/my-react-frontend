import { baseApi } from "./baseApi";
import apiRoutes from "@/api";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteTable: builder.mutation({
      query: (userId) => ({
        url: `${apiRoutes.deleteTable.deletetable}/${userId}`,
        method: "delete",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useDeleteTableMutation } = contactApi;
