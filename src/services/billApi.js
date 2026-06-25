import { baseApi } from "./baseApi";
import apiRoutes from "@/api";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bill: builder.mutation({
      query: (userData) => ({
        url: apiRoutes.bill.carts,
        method: "GET",
        body: userData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useBillMutation } = contactApi;
