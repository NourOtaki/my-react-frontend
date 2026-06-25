
import { baseApi } from "./baseApi";
import apiRoutes from "@/api";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFavorite: builder.mutation({
      query: (userData) => ({
        url: apiRoutes.getFavorite.favorites,
        method: "get",
        body: userData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetFavoriteMutation } = contactApi;
