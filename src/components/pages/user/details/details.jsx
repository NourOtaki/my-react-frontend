
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Button from "../../../ui/button";
import Loader from "../../../ui/loader";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { meals } from "../../../../data/meal";

import { useAddToFavoriteMutation } from "@/services/favoriteApi";
import { useAddToCartMutation } from "@/services/addToCartApi";
import { useGetFavoriteMutation } from "@/services/getFavoriteApi";
import img1 from "../../../../assets/img/book.png";
 import { type } from "../../../../data/type";

function Details() {
  useEffect(() => {
    AOS.init();
  }, []);
  const { typeId } = useParams();
  const { detailsId } = useParams();

  const Id =detailsId-1
  console.log("id",Id)
  const [addToCart] = useAddToCartMutation();
  const [addToFavorite] = useAddToFavoriteMutation();
  const [getFavorite] = useGetFavoriteMutation();
  const user = useSelector((state) => state.auth.user);
  const userId = user?.userID ?? null;

  const [meal, setMeal] = useState(meals[Id]);

  const [types, setTypes] = useState(type);
  const [selectedType, setSelectedType] = useState(null);
  const [trueType, setTrueType] = useState(false);
  const [idType, setIdType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredType, setHoveredType] = useState("");
  const [favorites, setFavorites] = useState([]);
  const dropdownRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [loadingTypes, setLoadingTypes] = useState(true);

  // Fetch meal
  // useEffect(() => {
  //   const fetchMeal = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://127.0.0.1:8000/api/showOneMeal/${detailsId}`,
  //       );
  //       setMeal(res.data);
  //     } catch {
  //       toast.error("Failed to fetch meal data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchMeal();
  // }, [detailsId]);

  // // Fetch types
  // useEffect(() => {
  //   if (meal) {
  //     const fetchTypes = async () => {
  //       try {
  //         const res = await axios.get(
  //           `http://127.0.0.1:8000/api/showAllTypesMeals/${detailsId}`,
  //         );
  //         setTypes(res.data);
  //       } catch {
  //         toast.error("Failed to fetch meal types");
  //       } finally {
  //         setLoadingTypes(false);
  //       }
  //     };
  //     fetchTypes();
  //   }
  // }, [meal, detailsId]);

  // // Fetch favorites
  // useEffect(() => {
  //   const fetchFavorites = async () => {
  //     if (!user) return;
  //     try {
  //       const res = await getFavorite().unwrap();
  //       setFavorites(res.data || []);
  //     } catch {
  //       console.error("Failed to fetch favorites");
  //     }
  //   };
  //   fetchFavorites();
  // }, [user]);

  // if (loading || loadingTypes || !meal) return <Loader />;
  const [isFav, setIsFav] = useState(false);


  const handleFavoriteToggle = async () => {
    if(isFav){
      setIsFav(false)
    }else{
            setIsFav(true)

    }
  };

  // const createOrder = async (mealId, typeId = null) => {
  //   if (!user) return toast.info("Please log in first");
  //   try {
  //     const payload = { quantity: 1, meal_id: mealId };
  //     if (typeId) payload.type_meal_id = typeId;
  //     await addToCart(payload).unwrap();
  //     toast.success("Added to cart successfully");
  //   } catch {
  //     toast.error("Failed to add product to cart");
  //   }
  // };

  const handleChangeType = (item) => {
    setSelectedType(item);
    setTrueType(true);
    setIdType(item.id);
    setIsOpen(false);
  };
  console.log("meal", meal)

  // حساب النجوم
  const rate = Math.floor(meal.stars);
  const hasHalfStar = meal.stars % 1 >= 0.5 && meal.stars % 1 < 1;
  const counterStar = rate + (hasHalfStar ? 1 : 0);
  const stars = Array.from({ length: rate }, (_, index) => (
    <i key={index} className="ri-star-fill text-firstColor mx-1 text-2xl"></i>
  ));
  if (hasHalfStar) {
    stars.push(
      <i
        key="half-star"
        className="ri-star-half-line text-firstColor text-2xl"
      ></i>,
    );
  }
  for (let i = counterStar; i < 5; i++) {
    stars.push(
      <i key={i} className="ri-star-line text-firstColor mx-1 text-2xl"></i>,
    );
  }

  return (
    <>
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="mx-4 my-4 sm:mx-10 md:mx-16 lg:mx-4 xl:mx-8">
        <div className="flex flex-col justify-center py-8 shadow-2xl sm:flex-row">
          {/* Image Section */}
          <div className="w-[300px] sm:w-[265px] md:w-[310px] lg:w-[430px] xl:w-[565px]">
            <div className="relative left-10 w-[300px] py-5 shadow-2xl sm:w-[265px] sm:skew-y-4 md:w-[310px] lg:w-[430px] xl:w-[555px]">
              <img
                className="relative left-4 h-[390px] w-[260px] rounded-2xl sm:w-[210px] md:w-[270px] lg:w-[380px] xl:w-[500px]"
                src={
                  trueType ? selectedType?.image : meal.image}
                alt={meal.type}
              />
            </div>
          </div>

          {/* Middle Image */}
          <img
            className="relative -top-30 left-32 z-10 rotate-90 max-[640px]:w-[100px] sm:top-2 sm:-left-2 sm:block sm:rotate-0"
            src={img1}
            alt="decorative"
          />

          {/* Details Section */}
          <div className="relative -top-62 left-9 -mb-50 h-[430px] w-[300px] px-10 py-16 shadow-2xl sm:top-0 sm:-left-12 sm:mb-0 sm:w-[265px] sm:-skew-y-4 md:w-[310px] lg:w-[430px] xl:w-[565px] xl:px-20">
            <div className="flex justify-between py-3">
              <h3 className="text-2xl font-medium xl:text-3xl">{meal.type}</h3>
              <button className="border-0 " onClick={handleFavoriteToggle}>
                
                   <i
                  className={`${
                    isFav ? "ri-heart-3-fill" : "ri-heart-3-line"
                  } text-firstColor cursor-pointer text-4xl`}
                ></i>
              </button>
            </div>

            {/* Price */}
            <p className="my-3 text-2xl font-medium xl:text-3xl">
              {types.length > 0
                ? selectedType?.price
                  ? `${selectedType.price} $`
                  : "selected Type"
                : `${meal.price} $`}
            </p>

            {/* Type Selector */}
            {types.length > 0 && (
              <div className="relative pt-1 pb-2" ref={dropdownRef}>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="my-2 flex w-full cursor-pointer justify-between rounded border-2 border-red-200 p-2 text-xl font-medium shadow-sm select-none xl:text-3xl"
                >
                  {selectedType?.type || meal.type}
                  <i className="ri-corner-down-left-line text-firstColor"></i>
                </div>
                {isOpen && (
                  <div className="absolute top-14 z-10 mt-1 w-full overflow-hidden rounded border-2 border-red-200 bg-white shadow-md">
                    {types.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleChangeType(item)}
                        onMouseEnter={() => setHoveredType(item.type)}
                        onMouseLeave={() => setHoveredType("")}
                        className={`cursor-pointer p-2 text-xl hover:bg-red-500 hover:text-white ${
                          hoveredType === item.type
                            ? "bg-firstColor text-white"
                            : "selected Type"
                        }`}
                      >
                        {item.type}
                      </div>
                    ))}
                  </div>
                )}
                {/* Stars
                <div className="my-2">{stars}</div> */}
              </div>
            )}
            {/* Stars */}
            <div className="my-2">{stars}</div>
            <Button
              title="Add To Cart"
              onClick={() => createOrder(meal.id, idType)}
              className="mt-3"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
