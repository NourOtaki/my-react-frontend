import { baseApi } from "./baseApi";
import apiRoutes from "@/api";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: apiRoutes.auth.login,
        method: "POST",
        body: userData,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: apiRoutes.auth.register,
        method: "POST",
        body: userData,
      }),
    }),
  }),
  overrideExisting: false,
});
// setTimeout(() => {
//       navigate("/checkout"); // غيّر "/checkout" حسب الصفحة اللي بدك تروح إلها
//     }, 3000);
export const { useLoginMutation, useRegisterMutation } = authApi;