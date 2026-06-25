import { baseApi } from "./baseApi";
import apiRoutes from "@/api";

const addToCart = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (userData) => ({
        url: apiRoutes.addToCart.addToCart,
        method: "POST",
        body: userData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAddToCartMutation } = addToCart;
