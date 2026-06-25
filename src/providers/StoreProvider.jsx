
import { makeStore } from "../store/index";
import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { jwtDecode } from "jwt-decode";

import { setUser } from "@/lib/features/authSlice"; 

export default function StoreProvider({ children }) {
  const storeRef = useRef(null);

  if (!storeRef.current) {
    storeRef.current = makeStore(); 
  }

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        storeRef.current.dispatch(setUser(decoded)); 
      } catch (err) {
        console.error("خطأ في فك التوكن:", err);
        localStorage.removeItem("token"); // إذا التوكن فاسد نشيله
        localStorage.removeItem("user");
      }
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
