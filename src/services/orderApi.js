import { baseApi } from "./baseApi";
import apiRoutes from "@/api";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    order: builder.mutation({
      query: () => ({
        url: apiRoutes.bill.carts,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useOrderMutation } = contactApi;
