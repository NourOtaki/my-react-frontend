
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "../../../ui/button";
import Loader from "../../../ui/loader";
import Aos from "aos";
import { useSelector } from "react-redux";
import { useGetFavoriteMutation } from "@/services/getFavoriteApi";

function Favorite() {
  const [fav, setFav] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [getFavorite] = useGetFavoriteMutation();

  const user = useSelector((state) => state.auth.user);

  // لو ما في مستخدم، ما يعرض أي شيء
  if (!user) return null;

  useEffect(() => {
    Aos.init();

    const fetchFavorites = async () => {
      try {
        const response = await getFavorite();
        setFav(response.data.data || []);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [getFavorite]);

  const deleteFavorites = async (mealId) => {
    try {
      const token = localStorage.getItem("TOKEN");

      await axios.delete(
        `http://127.0.0.1:8000/api/deletefavorites/${mealId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setFav((prev) => prev.filter((item) => item.id !== mealId));
    } catch (error) {
      console.error("Failed to delete favorite:", error);
      alert("Failed to delete the favorite item.");
    }
  };

  if (loading)
    return (
      <div className="relative top-10 my-10">
        <Loader />
      </div>
    );

  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen px-[10%] py-12">
      {fav.length === 0 ? (
        <div className="flex h-[60vh] items-center justify-center text-xl font-semibold text-gray-600">
          Your favorites list is empty.
        </div>
      ) : (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {fav.map((item, index) => (
            <div
              key={index}
              className="group relative transform overflow-hidden rounded-2xl shadow-lg transition hover:scale-105"
              data-aos="fade-up"
            >
              {/* صورة */}
              <img
                className="h-56 w-full object-cover"
                src={`http://127.0.0.1:8000/storage/${item.meal.image}`}
                alt={item.meal.type}
              />

              {/* محتوى الهوفـر */}
              <div className="bg-opacity-60 absolute inset-0 flex flex-col items-center justify-center bg-black opacity-0 transition duration-300 group-hover:opacity-100">
                <h3 className="mb-4 text-2xl font-bold text-white">
                  {item.meal.type}
                </h3>
                <Link
                  to={`/categories/category${item.meal.category_id}/${item.meal.id}`}
                >
                  <Button className="h-10 w-28" title="View" />
                </Link>
                <button
                  onClick={() => deleteFavorites(item.id)}
                  className="mt-4 text-3xl text-red-500 transition hover:scale-110"
                >
                  <i className="ri-heart-3-fill"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorite;
