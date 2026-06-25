import displayContact from "@/api/displayContact";
import { baseApi } from "./baseApi";
import apiRoutes from "@/api";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    showTables: builder.mutation({
      query: (userData) => ({
        url: apiRoutes.showTables.showAlltables,
        method: "get",
        body: userData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useShowTablesMutation } = contactApi;
