import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"; // أيقونة الخروج
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      // استدعاء API لتسجيل الخروج
      await axios.post(
        "http://127.0.0.1:8000/api/logoutu",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.error("خطأ أثناء تسجيل الخروج:", error);
    } finally {
      // تنظيف الـ localStorage بغض النظر عن النتيجة
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // إعادة التوجيه لصفحة تسجيل الدخول
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="  px-4 py-2 text-firstColor "
    >
      <LogOut size={22} />
    </button>
  );
};

export default Logout;
