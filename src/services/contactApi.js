import { baseApi } from "./baseApi";
import apiRoutes from "@/api";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addPost: builder.mutation({
      query: (userData) => ({
        url: apiRoutes.contact.addPost,
        method: "POST",
        body: userData,
      }),
    }),

  }),
  overrideExisting: false,
});

export const { useAddPostMutation } = contactApi;