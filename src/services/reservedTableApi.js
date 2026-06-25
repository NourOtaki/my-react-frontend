import { baseApi } from "./baseApi";
import apiRoutes from "@/api";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    reservedTable: builder.mutation({
      query: (userData) => ({
        url: apiRoutes.reservedTable.reserved,
        method: "POST",
        body: userData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useReservedTableMutation } = contactApi;
