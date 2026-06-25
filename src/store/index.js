// import { configureStore } from "@reduxjs/toolkit";
// // import authSlice from "./features/auth/authSlice";
// import { baseApi } from "@/services/baseApi";
// import { setupListeners } from "@reduxjs/toolkit/query";
// export const makeStore = () => {
//   return configureStore({
//     reducer: {
//       // auth: authSlice,
//       [baseApi.reducerPath]: baseApi.reducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(baseApi.middleware),
//   });
// };
// setupListeners(makeStore().dispatch);
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/services/baseApi";
import themeReducer from "../lib/features/themeSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../lib/features/authSlice";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      theme: themeReducer, 
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });

  setupListeners(store.dispatch); 

  return store;
};

