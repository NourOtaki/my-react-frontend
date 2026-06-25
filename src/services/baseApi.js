import {
  createApi,
  fetchBaseQuery,
// FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
//  import Cookies from "js-cookie";
const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api",
  prepareHeaders: async (headers) => {
    const token = localStorage.getItem("TOKEN");

    // const token = localStorage.get("TOKEN");
    console.log("token",token);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
     headers.set("Accept", "application/json");
    return headers;
  },
});
const baseQueryWithErrorHandler = async (args, api, extraOptions) => {
const result = await rawBaseQuery(args, api, extraOptions);
    if (result.error) {
    const { status, data } = result.error;

    switch (status) {
      // case 400:
      //   sessionStorage.removeItem('TOKEN')
      //   window.location.href = '/login'
      //   break
      case  401:
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = "/login";
  break
      // case 401:
      //   console.warn('الحساب غير موجود')
      //   // Optional: dispatch logout or redirect logic
      //   sessionStorage.removeItem('TOKEN')
      //   window.location.href = '/login'
      //   break
      case 403:
        console.warn("Forbidden - no access", data);
        break;
      case 404:
        console.warn("الرابط المدخل غير صحيح");
        break;
      case 500:
        console.error("Server Error", data);
        break;
      default:
        // console.error("Unknown Error", result.error);
        console.error("Validation Error", result.error.data);
        break;
    }
  }

  return result;
};
export const baseApi = createApi({
  baseQuery: baseQueryWithErrorHandler,
  endpoints: () => ({}),
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  serializeQueryArgs: ({ endpointName }) => endpointName,
});
