import { baseApi } from "./baseApi";
import apiRoutes from "@/api";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToFavorite: builder.mutation({
      query: (userData) => ({
        url: apiRoutes.favorite.addToFavorites,
        method: "POST",
        body: userData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAddToFavoriteMutation } = contactApi;
