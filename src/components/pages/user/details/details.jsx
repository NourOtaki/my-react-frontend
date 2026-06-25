
// // // // // import { useParams } from "react-router";
// // // // // import Button from "../../../ui/button";
// // // // // import React, { useEffect, useRef, useState } from "react";
// // // // // import AOS from "aos";
// // // // // import "aos/dist/aos.css";
// // // // // import Loader from "../../../ui/loader";
// // // // // import { useSelector } from "react-redux";
// // // // // import { useAddToFavoriteMutation } from "@/services/favoriteApi";
// // // // // import { useAddToCartMutation } from "@/services/addToCartApi";
// // // // // import toast, { Toaster } from "react-hot-toast";
// // // // // import { useGetFavoriteMutation } from "@/services/getFavoriteApi";

// // // // // function Details() {
// // // // //   useEffect(() => {
// // // // //     AOS.init();
// // // // //   }, []);

// // // // //   const [addToCart] = useAddToCartMutation();
// // // // //   const [addToFavorite] = useAddToFavoriteMutation();
// // // // //   const [getFavorite] = useGetFavoriteMutation();
// // // // //   const { detailsId } = useParams();
// // // // //   const user = useSelector((state) => state.auth.user);
// // // // //   const userId = user?.userID ?? null;

// // // // //   const [meal, setMeal] = useState(null);
// // // // //   const [type, setType] = useState([]);
// // // // //   const [selectedType, setSelectedType] = useState(null);
// // // // //   const [trueType, setTrueType] = useState(false);
// // // // //   const [idType, setIdType] = useState(null);
// // // // //   const [isOpen, setIsOpen] = useState(false);
// // // // //   const [hoveredType, setHoveredType] = useState("");
// // // // //   const [fav, setFav] = useState([]);
// // // // //   const dropdownRef = useRef(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [loading2, setLoading2] = useState(true);

// // // // //   // Fetch meal
// // // // //   useEffect(() => {
// // // // //     const fetchMeal = async () => {
// // // // //       try {
// // // // //         const res = await axios.get(
// // // // //           `http://127.0.0.1:8000/api/showOneMeal/${detailsId}`,
// // // // //         );
// // // // //         setMeal(res.data);
// // // // //       } catch {
// // // // //         toast.error("فشل في جلب بيانات الوجبة");
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchMeal();
// // // // //   }, [detailsId]);

// // // // //   // Fetch types
// // // // //   useEffect(() => {
// // // // //     if (meal) {
// // // // //       const fetchType = async () => {
// // // // //         try {
// // // // //           const res = await axios.get(
// // // // //             `http://127.0.0.1:8000/api/showAllTypesMeals/${detailsId}`,
// // // // //           );
// // // // //           setType(res.data);
// // // // //         } catch {
// // // // //           toast.error("فشل في جلب أنواع الوجبة");
// // // // //         } finally {
// // // // //           setLoading2(false);
// // // // //         }
// // // // //       };
// // // // //       fetchType();
// // // // //     }
// // // // //   }, [meal, detailsId]);

// // // // //   // Fetch favorites
// // // // //   useEffect(() => {
// // // // //     const fetchFavorites = async () => {
// // // // //       if (!user) return;
// // // // //       try {
// // // // //         const res = await getFavorite().unwrap();
// // // // //         setFav(res.data || []);
// // // // //       } catch {
// // // // //         toast.error("فشل في جلب المفضلة");
// // // // //       }
// // // // //     };
// // // // //     fetchFavorites();
// // // // //   }, [user]);

// // // // //   if (!meal) return <Loader />;

// // // // //   const isFav = fav.some((item) => item.meal_id === meal.id);

// // // // //   const handleAddToFavorites = async (mealId) => {
// // // // //     if (!user) return toast.error("يرجى تسجيل الدخول أولاً.");
// // // // //     try {
// // // // //       const res = await addToFavorite({
// // // // //         meal_id: mealId,
// // // // //         user_id: userId,
// // // // //       }).unwrap();
// // // // //       setFav((prev) => [...prev, { meal_id: mealId, id: res.id }]);
// // // // //       toast.success(res.message || "تمت الإضافة إلى المفضلة!");
// // // // //     } catch {
// // // // //       toast.error("حدث خطأ أثناء إضافة المنتج إلى المفضلة.");
// // // // //     }
// // // // //   };

// // // // //   const handleDeleteFavorites = async (favoriteId) => {
// // // // //     try {
// // // // //       await axios.delete(
// // // // //         `http://127.0.0.1:8000/api/deletefavorites/${favoriteId}`,
// // // // //         {
// // // // //           headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
// // // // //         },
// // // // //       );
// // // // //       setFav((prev) => prev.filter((item) => item.id !== favoriteId));
// // // // //       toast.success("تمت إزالة المنتج من المفضلة!");
// // // // //     } catch {
// // // // //       toast.error("فشل في حذف المنتج من المفضلة.");
// // // // //     }
// // // // //   };

// // // // //   const onHeartClick = () => {
// // // // //     if (!user) return toast.error("يرجى تسجيل الدخول أولاً.");
// // // // //     const favoriteItem = fav.find((item) => item.meal_id === meal.id);
// // // // //     if (favoriteItem && favoriteItem.id) {
// // // // //       handleDeleteFavorites(favoriteItem.id);
// // // // //     } else {
// // // // //       handleAddToFavorites(meal.id);
// // // // //     }
// // // // //   };

// // // // //   const createOrder = async (mealId, typeId = null) => {
// // // // //     if (!user) return toast.error("يرجى تسجيل الدخول أولاً.");
// // // // //     const payload = { quantity: 1, meal_id: mealId };
// // // // //     if (typeId) payload.type_meal_id = typeId;
// // // // //     try {
// // // // //       const res = await addToCart(payload).unwrap();
// // // // //       toast.success(res.message || "تمت الإضافة إلى السلة بنجاح");
// // // // //     } catch {
// // // // //       toast.error("فشل في إضافة المنتج إلى السلة");
// // // // //     }
// // // // //   };

// // // // //   const handleChangeType = (item) => {
// // // // //     setTrueType(true);
// // // // //     setSelectedType(item);
// // // // //     setIdType(item.id);
// // // // //     setIsOpen(false);
// // // // //   };

// // // // //   if (loading || loading2) return <Loader />;

// // // // //   return (
// // // // //     <div className="mx-4 my-4 min-[528px]:mx-16 min-[586px]:mx-24 min-[768px]:mx-8 min-[900px]:mx-22 sm:mx-10 lg:mx-4 xl:mx-8">
// // // // //       <Toaster position="top-right" reverseOrder={false} />
// // // // //       <div className="flex flex-col justify-center py-8 shadow-2xl sm:flex-row lg:px-0 xl:p-8">
// // // // //         {/* Image Section */}
// // // // //         <div className="w-[300px] sm:w-[265px] md:w-[310px] lg:w-[430px] xl:w-[565px]">
// // // // //           <div className="relative left-10 w-[300px] py-5 shadow-2xl sm:w-[265px] sm:skew-y-4 md:w-[310px] lg:w-[430px] xl:w-[555px]">
// // // // //             <img
// // // // //               className="relative left-4 h-[390px] w-[260px] rounded-2xl sm:w-[210px] md:w-[270px] lg:w-[380px] xl:w-[500px]"
// // // // //               src={`http://127.0.0.1:8000/storage/${trueType ? selectedType?.image : meal.image}`}
// // // // //               alt={meal.type}
// // // // //             />
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Details Section */}
// // // // //         <div className="relative -top-62 left-9 -mb-50 h-[430px] w-[300px] px-10 py-16 shadow-2xl sm:top-0 sm:-left-12 sm:mb-0 sm:w-[265px] sm:-skew-y-4 md:w-[310px] lg:w-[430px] xl:w-[565px] xl:px-20">
// // // // //           <div className="relative flex gap-80 py-3">
// // // // //             <h3 className="text-2xl font-medium xl:text-3xl">{meal.type}</h3>
// // // // //             <button
// // // // //               className="absolute top-0 right-0 border-0"
// // // // //               onClick={onHeartClick}
// // // // //               aria-label={isFav ? "حذف من المفضلة" : "إضافة إلى المفضلة"}
// // // // //             >
// // // // //               <i
// // // // //                 className={`${isFav ? "ri-heart-3-fill" : "ri-heart-3-line"} text-firstColor cursor-pointer text-4xl`}
// // // // //               ></i>
// // // // //             </button>
// // // // //           </div>

// // // // //           <p className="my-3 text-2xl font-medium xl:text-3xl">
// // // // //             price : {trueType ? selectedType?.price : meal.price} $
// // // // //           </p>

// // // // //           {type.length > 0 && (
// // // // //             <div className="relative pt-1 pb-2 lg:w-68" ref={dropdownRef}>
// // // // //               <div
// // // // //                 onClick={() => setIsOpen(!isOpen)}
// // // // //                 className="my-2 flex w-full cursor-pointer justify-between rounded border-2 border-red-200 p-2 text-xl font-medium shadow-sm select-none xl:text-3xl"
// // // // //               >
// // // // //                 {selectedType?.name || meal.type}
// // // // //                 <i className="ri-corner-down-left-line text-firstColor"></i>
// // // // //               </div>
// // // // //               {isOpen && (
// // // // //                 <div className="absolute top-14 z-10 mt-1 w-full overflow-hidden rounded border-2 border-red-200 bg-white shadow-md">
// // // // //                   {type.map((item, index) => (
// // // // //                     <div
// // // // //                       key={index}
// // // // //                       onClick={() => handleChangeType(item)}
// // // // //                       onMouseEnter={() => setHoveredType(item.name)}
// // // // //                       onMouseLeave={() => setHoveredType("")}
// // // // //                       className={`cursor-pointer p-2 text-xl hover:bg-red-500 hover:text-white ${
// // // // //                         hoveredType === item.name
// // // // //                           ? "bg-firstColor text-white"
// // // // //                           : ""
// // // // //                       }`}
// // // // //                     >
// // // // //                       {item.name}
// // // // //                     </div>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           )}

// // // // //           <Button
// // // // //             title="Add To Cart"
// // // // //             onClick={() => createOrder(meal.id, idType)}
// // // // //             className="mt-3"
// // // // //           />
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default Details;
// // // // import axios from "axios";
// // // // import { useParams } from "react-router";
// // // // import Button from "../../../ui/button";
// // // // import React, { useEffect, useRef, useState } from "react";
// // // // import AOS from "aos";
// // // // import "aos/dist/aos.css";
// // // // import Loader from "../../../ui/loader";
// // // // import { useSelector } from "react-redux";
// // // // import { useAddToFavoriteMutation } from "@/services/favoriteApi";
// // // // import { useAddToCartMutation } from "@/services/addToCartApi";
// // // // import toast, { Toaster } from "react-hot-toast";
// // // // import { useGetFavoriteMutation } from "@/services/getFavoriteApi";
// // // // import img1 from "../../../../assets/img/book.png"; // الصورة اللي بالنص

// // // // function Details() {
// // // //   useEffect(() => {
// // // //     AOS.init();
// // // //   }, []);

// // // //   const [addToCart] = useAddToCartMutation();
// // // //   const [addToFavorite] = useAddToFavoriteMutation();
// // // //   const [getFavorite] = useGetFavoriteMutation();
// // // //   const { detailsId } = useParams();
// // // //   const user = useSelector((state) => state.auth.user);
// // // //   const userId = user?.userID ?? null;

// // // //   const [meal, setMeal] = useState(null);
// // // //   const [type, setType] = useState([]);
// // // //   const [selectedType, setSelectedType] = useState(null);
// // // //   const [trueType, setTrueType] = useState(false);
// // // //   const [idType, setIdType] = useState(null);
// // // //   const [isOpen, setIsOpen] = useState(false);
// // // //   const [hoveredType, setHoveredType] = useState("");
// // // //   const [fav, setFav] = useState([]);
// // // //   const dropdownRef = useRef(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [loading2, setLoading2] = useState(true);

// // // //   // Fetch meal
// // // //   useEffect(() => {
// // // //     const fetchMeal = async () => {
// // // //       try {
// // // //         const res = await axios.get(
// // // //           `http://127.0.0.1:8000/api/showOneMeal/${detailsId}`,
// // // //         );
// // // //         setMeal(res.data);
// // // //       } catch {
// // // //         toast.error("Failed to fetch meal data");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };
// // // //     fetchMeal();
// // // //   }, [detailsId]);

// // // //   // Fetch types
// // // //   useEffect(() => {
// // // //     if (meal) {
// // // //       const fetchType = async () => {
// // // //         try {
// // // //           const res = await axios.get(
// // // //             `http://127.0.0.1:8000/api/showAllTypesMeals/${detailsId}`,
// // // //           );
// // // //           setType(res.data);
// // // //         } catch {
// // // //           toast.error("Failed to fetch meal types");
// // // //         } finally {
// // // //           setLoading2(false);
// // // //         }
// // // //       };
// // // //       fetchType();
// // // //     }
// // // //   }, [meal, detailsId]);

// // // //   // Fetch favorites
// // // //   useEffect(() => {
// // // //     const fetchFavorites = async () => {
// // // //       if (!user) return;
// // // //       try {
// // // //         const res = await getFavorite().unwrap();
// // // //         setFav(res.data || []);
// // // //       } catch {
// // // //         toast.error("Failed to fetch favorites");
// // // //       }
// // // //     };
// // // //     fetchFavorites();
// // // //   }, [user]);

// // // //   if (!meal) return <Loader />;

// // // //   const isFav = fav.some((item) => item.meal_id === meal.id);

// // // //   const handleAddToFavorites = async (mealId) => {
// // // //     if (!user) return toast.error("Please login first.");
// // // //     try {
// // // //       const res = await addToFavorite({
// // // //         meal_id: mealId,
// // // //         user_id: userId,
// // // //       }).unwrap();
// // // //       setFav((prev) => [...prev, { meal_id: mealId, id: res.id }]);
// // // //       toast.success(res.message || "Added to favorites!");
// // // //     } catch {
// // // //       toast.error("Failed to add to favorites.");
// // // //     }
// // // //   };

// // // //   const handleDeleteFavorites = async (favoriteId) => {
// // // //     try {
// // // //       await axios.delete(
// // // //         `http://127.0.0.1:8000/api/deletefavorites/${favoriteId}`,
// // // //         {
// // // //           headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
// // // //         },
// // // //       );
// // // //       setFav((prev) => prev.filter((item) => item.id !== favoriteId));
// // // //       toast.success("Removed from favorites!");
// // // //     } catch {
// // // //       toast.error("Failed to remove from favorites.");
// // // //     }
// // // //   };

// // // //   const onHeartClick = () => {
// // // //     if (!user) return toast.error("Please login first.");
// // // //     const favoriteItem = fav.find((item) => item.meal_id === meal.id);
// // // //     if (favoriteItem && favoriteItem.id) {
// // // //       handleDeleteFavorites(favoriteItem.id);
// // // //     } else {
// // // //       handleAddToFavorites(meal.id);
// // // //     }
// // // //   };

// // // //   const createOrder = async (mealId, typeId = null) => {
// // // //     if (!user) return toast.error("Please login first.");
// // // //     const payload = { quantity: 1, meal_id: mealId };
// // // //     if (typeId) payload.type_meal_id = typeId;
// // // //     try {
// // // //       const res = await addToCart(payload).unwrap();
// // // //       toast.success(res.message || "Added to cart successfully");
// // // //     } catch {
// // // //       toast.error("Failed to add to cart");
// // // //     }
// // // //   };

// // // //   const handleChangeType = (item) => {
// // // //     setTrueType(true);
// // // //     setSelectedType(item);
// // // //     setIdType(item.id);
// // // //     setIsOpen(false);
// // // //   };

// // // //   if (loading || loading2) return <Loader />;

// // // //   return (
// // // //     <div className="mx-4 my-4 min-[528px]:mx-16 min-[586px]:mx-24 min-[768px]:mx-8 min-[900px]:mx-22 sm:mx-10 lg:mx-4 xl:mx-8">
// // // //       <Toaster position="top-right" reverseOrder={false} />
// // // //       <div className="flex flex-col justify-center py-8 shadow-2xl sm:flex-row lg:px-0 xl:p-8">
// // // //         {/* Image Section */}
// // // //         <div
// // // //           className="w-[300px] sm:w-[265px] md:w-[310px] lg:w-[430px] xl:w-[565px]"
// // // //           data-aos="flip-right"
// // // //           data-aos-easing="ease-out-cubic"
// // // //           data-aos-duration="2500"
// // // //         >
// // // //           <div className="relative left-10 w-[300px] py-5 shadow-2xl sm:w-[265px] sm:skew-y-4 md:w-[310px] lg:w-[430px] xl:w-[555px]">
// // // //             <img
// // // //               className="relative left-4 h-[390px] w-[260px] rounded-2xl sm:w-[210px] md:w-[270px] lg:w-[380px] xl:w-[500px]"
// // // //               src={`http://127.0.0.1:8000/storage/${trueType ? selectedType?.image : meal.image}`}
// // // //               alt={meal.type}
// // // //             />
// // // //           </div>
// // // //         </div>

// // // //         {/* Middle Image */}
// // // //         <img
// // // //           data-aos="flip-down"
// // // //           data-aos-easing="ease-out-cubic"
// // // //           data-aos-duration="1000"
// // // //           data-aos-delay="1000"
// // // //           className="relative -top-30 left-36 z-10 rotate-90 max-[640px]:w-[100px] sm:top-2 sm:-left-1 sm:block sm:rotate-0"
// // // //           src={img1}
// // // //           alt="decorative"
// // // //         />

// // // //         {/* Details Section */}
// // // //         <div className="relative -top-62 left-9 -mb-50 h-[430px] w-[300px] px-10 py-16 shadow-2xl sm:top-0 sm:-left-12 sm:mb-0 sm:w-[265px] sm:-skew-y-4 md:w-[310px] lg:w-[430px] xl:w-[565px] xl:px-20"
// // // //                   data-aos="flip-left"
// // // //           data-aos-easing="ease-out-cubic"
// // // //           data-aos-duration="2500">
// // // //           <div className="relative flex gap-80 py-3">
// // // //             <h3 className="text-2xl font-medium xl:text-3xl">{meal.type}</h3>
// // // //             <button
// // // //               className="absolute top-0 right-0 border-0"
// // // //               onClick={onHeartClick}
// // // //               aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
// // // //             >
// // // //               <i
// // // //                 className={`${isFav ? "ri-heart-3-fill" : "ri-heart-3-line"} text-firstColor cursor-pointer text-4xl`}
// // // //               ></i>
// // // //             </button>
// // // //           </div>

// // // //           <p className="my-3 text-2xl font-medium xl:text-3xl">
// // // //             Price: {trueType ? selectedType?.price : meal.price} $
// // // //           </p>

// // // //           {type.length > 0 && (
// // // //             <div className="relative pt-1 pb-2 lg:w-68" ref={dropdownRef}>
// // // //               <div
// // // //                 onClick={() => setIsOpen(!isOpen)}
// // // //                 className="my-2 flex w-full cursor-pointer justify-between rounded border-2 border-red-200 p-2 text-xl font-medium shadow-sm select-none xl:text-3xl"
// // // //               >
// // // //                 {selectedType?.name || meal.type}
// // // //                 <i className="ri-corner-down-left-line text-firstColor"></i>
// // // //               </div>
// // // //               {isOpen && (
// // // //                 <div className="absolute top-14 z-10 mt-1 w-full overflow-hidden rounded border-2 border-red-200 bg-white shadow-md">
// // // //                   {type.map((item, index) => (
// // // //                     <div
// // // //                       key={index}
// // // //                       onClick={() => handleChangeType(item)}
// // // //                       onMouseEnter={() => setHoveredType(item.name)}
// // // //                       onMouseLeave={() => setHoveredType("")}
// // // //                       className={`cursor-pointer p-2 text-xl hover:bg-red-500 hover:text-white ${
// // // //                         hoveredType === item.name
// // // //                           ? "bg-firstColor text-white"
// // // //                           : ""
// // // //                       }`}
// // // //                     >
// // // //                       {item.name}
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           )}

// // // //           <Button
// // // //             title="Add To Cart"
// // // //             onClick={() => createOrder(meal.id, idType)}
// // // //             className="mt-3"
// // // //           />
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Details;
// // // import axios from "axios";
// // // import Button from "../../../ui/button";
// // // import React, { useEffect, useRef, useState } from "react";
// // // import AOS from "aos";
// // // import "aos/dist/aos.css";
// // // import Loader from "../../../ui/loader";
// // // import { useSelector } from "react-redux";
// // // import { useAddToFavoriteMutation } from "@/services/favoriteApi";
// // // import { useAddToCartMutation } from "@/services/addToCartApi";
// // // import img1 from "../../../../assets/img/book.png";
// // // import { useParams } from "react-router";

// // // function Details() {
// // //   useEffect(() => {
// // //     AOS.init();
// // //   }, []);

// // //   const [addToCart] = useAddToCartMutation();
// // //   const [addToFavorite] = useAddToFavoriteMutation();
// // //   const { detailsId } = useParams();
// // //   const user = useSelector((state) => state.auth.user);
// // //   const userId = user?.userID ?? null;

// // //   const [liked, setLiked] = useState(false);
// // //   const [trueType, setTrueType] = useState(false);
// // //   const [idType, setIdType] = useState(null);
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [hoveredType, setHoveredType] = useState("");
// // //   const [selectedType, setSelectedType] = useState({});
// // //   const [type, setType] = useState([]);
// // //   const [meal, setMeal] = useState({});
// // //   const [loading, setLoading] = useState(true);
// // //   const [loading2, setLoading2] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [error2, setError2] = useState(null);
// // //   const dropdownRef = useRef(null);

// // //   // Fetch meal
// // //   useEffect(() => {
// // //     const fetchMeal = async () => {
// // //       try {
// // //         const response = await axios.get(
// // //           `http://127.0.0.1:8000/api/showOneMeal/${detailsId}`,
// // //         );
// // //         setMeal(response.data);
// // //       } catch (err) {
// // //         setError(err.message);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchMeal();
// // //   }, [detailsId]);

// // //   // Fetch types
// // //   useEffect(() => {
// // //     if (meal.id) {
// // //       const fetchType = async () => {
// // //         try {
// // //           const res = await axios.get(
// // //             `http://127.0.0.1:8000/api/showAllTypesMeals/${detailsId}`,
// // //           );
// // //           setType(res.data);
// // //         } catch (err) {
// // //           setError2(err.message);
// // //         } finally {
// // //           setLoading2(false);
// // //         }
// // //       };
// // //       fetchType();
// // //     }
// // //   }, [meal, detailsId]);

// // //   // Handle type selection
// // //   const handleChangeType = (item) => {
// // //     setTrueType(true);
// // //     setSelectedType(item);
// // //     setIdType(item.id);
// // //     setIsOpen(false);
// // //   };

// // //   // Add to cart
// // //   const createOrder = async (mealId, typeId = null) => {
// // //     if (!user) {
// // //       alert("يرجى تسجيل الدخول أولاً.");
// // //       return;
// // //     }

// // //     const payload = { quantity: 1, meal_id: mealId };
// // //     if (typeId) payload.type_meal_id = typeId;

// // //     try {
// // //       const data = await addToCart(payload).unwrap();
// // //       alert("تمت الإضافة إلى السلة بنجاح");
// // //     } catch (error) {
// // //       console.error("Add to cart failed", error);
// // //       alert("فشل في إضافة المنتج إلى السلة");
// // //     }
// // //   };

// // //   // Add/Remove favorites
// // //   const toggleLike = async () => {
// // //     if (!user) {
// // //       alert("يرجى تسجيل الدخول أولاً.");
// // //       return;
// // //     }
// // //     setLiked(!liked);
// // //     try {
// // //       if (!liked) {
// // //         await addToFavorite({ meal_id: meal.id, user_id: userId }).unwrap();
// // //       } else {
// // //         await axios.delete(
// // //           `http://127.0.0.1:8000/api/deletefavorites/${meal.id}`,
// // //           {
// // //             headers: {
// // //               Authorization: `Bearer ${localStorage.getItem("token")}`,
// // //             },
// // //           },
// // //         );
// // //       }
// // //     } catch (err) {
// // //       console.error("Favorite error:", err);
// // //     }
// // //   };

// // //   // Handle click outside dropdown
// // //   useEffect(() => {
// // //     const handleClickOutside = (event) => {
// // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// // //         setIsOpen(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   if (loading || loading2) return <Loader />;
// // //   if (error) return <div>Error: {error}</div>;
// // //   if (error2) return <div>Error2: {error2}</div>;

// // //   // Stars logic
// // //   const rate = Math.floor(meal.stars || 0);
// // //   const hasHalfStar = meal.stars % 1 >= 0.5;
// // //   const stars = [];
// // //   for (let i = 0; i < rate; i++)
// // //     stars.push(
// // //       <i
// // //         key={`star-${i}`}
// // //         className="ri-star-fill text-firstColor mx-1 text-2xl"
// // //       ></i>,
// // //     );
// // //   if (hasHalfStar)
// // //     stars.push(
// // //       <i
// // //         key="half-star"
// // //         className="ri-star-half-line text-firstColor mx-1 text-2xl"
// // //       ></i>,
// // //     );
// // //   while (stars.length < 5)
// // //     stars.push(
// // //       <i
// // //         key={`empty-${stars.length}`}
// // //         className="ri-star-line text-firstColor mx-1 text-2xl"
// // //       ></i>,
// // //     );

// // //   return (
// // //     <div className="mx-4 my-4 sm:mx-10 md:mx-16 lg:mx-8 xl:mx-8">
// // //       <div className="flex flex-col justify-center py-8 shadow-2xl sm:flex-row lg:px-0 xl:p-8">
// // //         {/* Image */}
// // //         <div
// // //           className="w-[300px] sm:w-[265px] md:w-[310px] lg:w-[430px] xl:w-[565px]"
// // //           data-aos="flip-right"
// // //           data-aos-easing="ease-out-cubic"
// // //           data-aos-duration="2500"
// // //         >
// // //           <div className="relative left-10 w-[300px] py-5 shadow-2xl sm:w-[265px] sm:skew-y-4 md:w-[310px] lg:w-[430px] xl:w-[555px]">
// // //             <img
// // //               className="relative left-4 h-[390px] w-[260px] rounded-2xl sm:w-[210px] md:w-[270px] lg:w-[380px] xl:w-[500px]"
// // //               src={`http://127.0.0.1:8000/storage/${trueType ? selectedType.image : meal.image}`}
// // //               alt={meal.type}
// // //             />
// // //           </div>
// // //         </div>

// // //         {/* Middle decorative image */}
// // //         <img
// // //           data-aos="flip-down"
// // //           data-aos-easing="ease-out-cubic"
// // //           data-aos-duration="1000"
// // //           data-aos-delay="1000"
// // //           className="relative -top-30 left-36 z-10 rotate-90 max-[640px]:w-[100px] sm:top-2 sm:-left-1 sm:block sm:rotate-0"
// // //           src={img1}
// // //         />

// // //         {/* Details */}
// // //         <div
// // //           className="relative -top-62 left-9 -mb-50 h-[430px] w-[300px] px-10 py-16 shadow-2xl sm:top-0 sm:-left-12 sm:mb-0 sm:w-[265px] sm:-skew-y-4 md:w-[310px] lg:w-[430px] xl:w-[565px] xl:px-20"
// // //           data-aos="flip-left"
// // //           data-aos-easing="ease-out-cubic"
// // //           data-aos-duration="2500"
// // //         >
// // //           <div className="flex gap-80 py-3">
// // //             <h3 className="text-2xl font-medium xl:text-3xl">{meal.type}</h3>
// // //             <button
// // //               className="absolute top-18 left-[85%] border-0"
// // //               onClick={toggleLike}
// // //             >
// // //               {liked ? (
// // //                 <i className="ri-heart-3-fill text-firstColor text-4xl"></i>
// // //               ) : (
// // //                 <i className="ri-heart-3-line text-firstColor text-4xl"></i>
// // //               )}
// // //             </button>
// // //           </div>

// // //           {/* Price */}
// // //           <p className="my-3 text-2xl font-medium xl:text-3xl">
// // //             Price: {trueType ? selectedType.price : meal.price} $
// // //           </p>

// // //           {/* Dropdown for types */}
// // //           {type.length > 0 && (
// // //             <div className="relative pt-1 pb-2 lg:w-68" ref={dropdownRef}>
// // //               <div
// // //                 onClick={() => setIsOpen(!isOpen)}
// // //                 className="my-2 flex w-full cursor-pointer justify-between rounded border-2 border-red-200 p-2 text-xl font-medium shadow-sm select-none xl:text-3xl"
// // //               >
// // //                 {selectedType.name || meal.type}
// // //                 <i className="ri-corner-down-left-line text-firstColor"></i>
// // //               </div>
// // //               {isOpen && (
// // //                 <div className="absolute top-14 z-10 mt-1 w-full overflow-hidden rounded border-2 border-red-200 bg-white shadow-md">
// // //                   {type.map((item, index) => (
// // //                     <div
// // //                       key={index}
// // //                       onClick={() => handleChangeType(item)}
// // //                       onMouseEnter={() => setHoveredType(item.name)}
// // //                       onMouseLeave={() => setHoveredType("")}
// // //                       className={`cursor-pointer p-2 text-xl hover:bg-red-500 hover:text-white ${
// // //                         hoveredType === item.name
// // //                           ? "bg-firstColor text-white"
// // //                           : ""
// // //                       }`}
// // //                     >
// // //                       {item.name}
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           )}

// // //           {/* Stars */}
// // //           <div className="my-2 flex items-center">{stars}</div>

// // //           {/* Add to Cart */}
// // //           <Button
// // //             title="Add To Cart"
// // //             onClick={() => createOrder(meal.id, idType)}
// // //             className="mt-3"
// // //           />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Details;
// // import axios from "axios";
// // import Button from "../../../ui/button";
// // import React, { useEffect, useRef, useState } from "react";
// // import AOS from "aos";
// // import "aos/dist/aos.css";
// // import Loader from "../../../ui/loader";
// // import { useSelector } from "react-redux";
// // import { useAddToFavoriteMutation } from "@/services/favoriteApi";
// // import { useAddToCartMutation } from "@/services/addToCartApi";
// // import img1 from "../../../../assets/img/book.png";
// // import { useParams } from "react-router";

// // function Details() {
// //   useEffect(() => {
// //     AOS.init();
// //   }, []);

// //   const [addToCart] = useAddToCartMutation();
// //   const [addToFavorite] = useAddToFavoriteMutation();
// //   const { detailsId } = useParams();
// //   const user = useSelector((state) => state.auth.user);
// //   const userId = user?.userID ?? null;

// //   const [meal, setMeal] = useState(null);
// //   const [type, setType] = useState([]);
// //   const [selectedType, setSelectedType] = useState(null);
// //   const [trueType, setTrueType] = useState(false);
// //   const [idType, setIdType] = useState(null);
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [hoveredType, setHoveredType] = useState("");
// //   const [liked, setLiked] = useState(false);
// //   const dropdownRef = useRef(null);
// //   const [loading, setLoading] = useState(true);
// //   const [loading2, setLoading2] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [error2, setError2] = useState(null);

// //   useEffect(() => {
// //     const fetchMeal = async () => {
// //       try {
// //         const res = await axios.get(
// //           `http://127.0.0.1:8000/api/showOneMeal/${detailsId}`,
// //         );
// //         setMeal(res.data);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchMeal();
// //   }, [detailsId]);

// //   useEffect(() => {
// //     if (meal) {
// //       const fetchType = async () => {
// //         try {
// //           const res = await axios.get(
// //             `http://127.0.0.1:8000/api/showAllTypesMeals/${detailsId}`,
// //           );
// //           setType(res.data);
// //         } catch (err) {
// //           setError2(err.message);
// //         } finally {
// //           setLoading2(false);
// //         }
// //       };
// //       fetchType();
// //     }
// //   }, [meal, detailsId]);

// //   const toggleLike = () => setLiked(!liked);

// //   const handleChangeType = (item) => {
// //     setTrueType(true);
// //     setSelectedType(item);
// //     setIdType(item.id);
// //     setIsOpen(false);
// //   };

// //   const createOrder = async (mealId, typeId = null) => {
// //     if (!user) {
// //       alert("يرجى تسجيل الدخول أولاً.");
// //       return;
// //     }
// //     const payload = { quantity: 1, meal_id: mealId };
// //     if (typeId) payload.type_meal_id = typeId;

// //     try {
// //       await addToCart(payload).unwrap();
// //       alert("تمت الإضافة إلى السلة بنجاح");
// //     } catch (error) {
// //       console.error("Add to cart failed", error);
// //       alert("فشل في إضافة المنتج إلى السلة");
// //     }
// //   };

// //   const addToFavorites = async (mealId) => {
// //     if (!user) {
// //       alert("يرجى تسجيل الدخول أولاً.");
// //       return;
// //     }
// //     try {
// //       await addToFavorite({ meal_id: mealId, user_id: userId }).unwrap();
// //       setLiked(true);
// //       alert("تمت إضافة المنتج إلى المفضلة!");
// //     } catch (error) {
// //       console.error("فشل في إضافة المنتج:", error);
// //       alert("حدث خطأ أثناء إضافة المنتج إلى المفضلة.");
// //     }
// //   };

// //   const deleteFavorites = async (mealId) => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       await axios.delete(
// //         `http://127.0.0.1:8000/api/deletefavorites/${mealId}`,
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );
// //       setLiked(false);
// //       alert("تمت إزالة المنتج من المفضلة!");
// //     } catch (error) {
// //       console.error("فشل في حذف المنتج:", error);
// //       alert("حدث خطأ أثناء حذف المنتج من المفضلة.");
// //     }
// //   };

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setIsOpen(false);
// //       }
// //     };
// //     if (isOpen) document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, [isOpen]);

// //   if (loading || loading2) return <Loader />;
// //   if (error) return <div>Error: {error}</div>;
// //   if (error2) return <div>Error2: {error2}</div>;

// //   // Stars
// //   const rate = Math.floor(meal.stars);
// //   const hasHalfStar = meal.stars % 1 >= 0.5;
// //   const stars = [];
// //   for (let i = 0; i < rate; i++)
// //     stars.push(
// //       <i key={i} className="ri-star-fill text-firstColor mx-1 text-2xl"></i>,
// //     );
// //   if (hasHalfStar)
// //     stars.push(
// //       <i key="half" className="ri-star-half-line text-firstColor text-2xl"></i>,
// //     );
// //   for (let i = stars.length; i < 5; i++)
// //     stars.push(
// //       <i
// //         key={`empty-${i}`}
// //         className="ri-star-line text-firstColor mx-1 text-2xl"
// //       ></i>,
// //     );

// //   return (
// //     <div className="mx-4 my-4 min-[528px]:mx-16 min-[586px]:mx-24 min-[768px]:mx-8 min-[900px]:mx-22 sm:mx-10 lg:mx-4 xl:mx-8">
// //       <div className="flex flex-col justify-center py-8 shadow-2xl sm:flex-row lg:px-0 xl:p-8">
// //         {/* Image */}
// //         <div
// //           data-aos="flip-right"
// //           data-aos-easing="ease-out-cubic"
// //           data-aos-duration="2500"
// //           className="w-[300px] sm:w-[265px] md:w-[310px] lg:w-[430px] xl:w-[565px]"
// //         >
// //           <div className="relative left-10 w-[300px] py-5 shadow-2xl sm:w-[265px] sm:skew-y-4 md:w-[310px] lg:w-[430px] xl:w-[555px]">
// //             <img
// //               className="relative left-4 h-[390px] w-[260px] rounded-2xl sm:w-[210px] md:w-[270px] lg:w-[380px] xl:w-[500px]"
// //               src={`http://127.0.0.1:8000/storage/${
// //                 trueType && selectedType ? selectedType.image : meal.image
// //               }`}
// //               alt={meal.type}
// //             />
// //           </div>
// //         </div>

// //         {/* Decorative Image */}
// //         <img
// //           data-aos="flip-down"
// //           data-aos-easing="ease-out-cubic"
// //           data-aos-duration="1000"
// //           data-aos-delay="1000"
// //           className="relative -top-30 left-36 z-10 rotate-90 max-[640px]:w-[100px] sm:top-2 sm:-left-1 sm:block sm:rotate-0"
// //           src={img1}
// //         />

// //         {/* Details */}
// //         <div
// //           data-aos="flip-left"
// //           data-aos-easing="ease-out-cubic"
// //           data-aos-duration="2500"
// //           className="relative -top-62 left-9 -mb-50 h-[430px] w-[300px] px-10 py-16 shadow-2xl sm:top-0 sm:-left-12 sm:mb-0 sm:w-[265px] sm:-skew-y-4 md:w-[310px] lg:w-[430px] xl:w-[565px] xl:px-20"
// //         >
// //           <div className="flex gap-80 py-3">
// //             <h3 className="text-2xl font-medium xl:text-3xl">{meal.type}</h3>
// //             <button
// //               className="absolute top-0 right-0 border-0"
// //               onClick={() =>
// //                 liked ? deleteFavorites(meal.id) : addToFavorites(meal.id)
// //               }
// //             >
// //               <i
// //                 className={`${
// //                   liked ? "ri-heart-3-fill" : "ri-heart-3-line"
// //                 } text-firstColor cursor-pointer text-4xl`}
// //               ></i>
// //             </button>
// //           </div>

// //           {/* Price */}
// //           <p className="my-3 text-2xl font-medium xl:text-3xl">
// //             Price:{" "}
// //             {type.length > 0
// //               ? selectedType
// //                 ? `${selectedType.price} $`
// //                 : "Select a type"
// //               : `${meal.price} $`}
// //           </p>

// //           {/* Type Dropdown */}
// //           {type.length > 0 && (
// //             <div className="relative pt-1 pb-2 lg:w-68" ref={dropdownRef}>
// //               <div
// //                 onClick={() => setIsOpen(!isOpen)}
// //                 className="my-2 flex w-full cursor-pointer justify-between rounded border-2 border-red-200 p-2 text-xl font-medium shadow-sm select-none xl:text-3xl"
// //               >
// //                 {selectedType?.name || meal.type}
// //                 <i className="ri-corner-down-left-line text-firstColor"></i>
// //               </div>
// //               {isOpen && (
// //                 <div className="absolute top-14 z-10 mt-1 w-full overflow-hidden rounded border-2 border-red-200 bg-white shadow-md">
// //                   {type.map((item, index) => (
// //                     <div
// //                       key={index}
// //                       onClick={() => handleChangeType(item)}
// //                       onMouseEnter={() => setHoveredType(item.name)}
// //                       onMouseLeave={() => setHoveredType("")}
// //                       className={`cursor-pointer p-2 text-xl hover:bg-red-500 hover:text-white ${
// //                         hoveredType === item.name
// //                           ? "bg-firstColor text-white"
// //                           : ""
// //                       }`}
// //                     >
// //                       {item.name}
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {/* Stars */}
// //           <div className="my-2 flex">{stars}</div>

// //           {/* Add to Cart */}
// //           <Button
// //             title="Add To Cart"
// //             onClick={() =>
// //               selectedType ? createOrder(meal.id, idType) : createOrder(meal.id)
// //             }
// //             className="mt-3"
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Details;
// // import React, { useEffect, useState, useRef } from "react";
// // import { useParams } from "react-router";
// // import axios from "axios";
// // import Button from "../../../ui/button";
// // import Loader from "../../../ui/loader";
// // import AOS from "aos";
// // import "aos/dist/aos.css";
// // import { useSelector } from "react-redux";

// // import { useAddToFavoriteMutation } from "@/services/favoriteApi";
// // import { useAddToCartMutation } from "@/services/addToCartApi";
// // import { useGetFavoriteMutation } from "@/services/getFavoriteApi";
// // import img1 from "../../../../assets/img/book.png";

// // function Details() {
// //   useEffect(() => {
// //     AOS.init();
// //   }, []);

// //   const [addToCart] = useAddToCartMutation();
// //   const [addToFavorite] = useAddToFavoriteMutation();
// //   const [getFavorite] = useGetFavoriteMutation();
// //   const { detailsId } = useParams();
// //   const user = useSelector((state) => state.auth.user);
// //   const userId = user?.userID ?? null;

// //   const [meal, setMeal] = useState(null);
// //   const [types, setTypes] = useState([]);
// //   const [selectedType, setSelectedType] = useState(null);
// //   const [trueType, setTrueType] = useState(false);
// //   const [idType, setIdType] = useState(null);
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [hoveredType, setHoveredType] = useState("");
// //   const [favorites, setFavorites] = useState([]);
// //   const dropdownRef = useRef(null);
// //   const [loading, setLoading] = useState(true);
// //   const [loadingTypes, setLoadingTypes] = useState(true);

// //   // Fetch meal
// //   useEffect(() => {
// //     const fetchMeal = async () => {
// //       try {
// //         const res = await axios.get(
// //           `http://127.0.0.1:8000/api/showOneMeal/${detailsId}`,
// //         );
// //         setMeal(res.data);
// //       } catch {
// //         alert("فشل في جلب بيانات الوجبة");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchMeal();
// //   }, [detailsId]);

// //   // Fetch types
// //   useEffect(() => {
// //     if (meal) {
// //       const fetchTypes = async () => {
// //         try {
// //           const res = await axios.get(
// //             `http://127.0.0.1:8000/api/showAllTypesMeals/${detailsId}`,
// //           );
// //           setTypes(res.data);
// //         } catch {
// //           alert("فشل في جلب أنواع الوجبة");
// //         } finally {
// //           setLoadingTypes(false);
// //         }
// //       };
// //       fetchTypes();
// //     }
// //   }, [meal, detailsId]);

// //   // Fetch favorites
// //   useEffect(() => {
// //     const fetchFavorites = async () => {
// //       if (!user) return;
// //       try {
// //         const res = await getFavorite().unwrap();
// //         setFavorites(res.data || []);
// //       } catch {
// //         console.error("Failed to fetch favorites");
// //       }
// //     };
// //     fetchFavorites();
// //   }, [user]);

// //   if (loading || loadingTypes || !meal) return <Loader />;

// //   const isFav = favorites.some((item) => item.meal_id === meal.id);

// //   const handleFavoriteToggle = async () => {
// //     if (!user) return alert("يرجى تسجيل الدخول أولاً");
// //     try {
// //       if (isFav) {
// //         const favItem = favorites.find((item) => item.meal_id === meal.id);
// //         await axios.delete(
// //           `http://127.0.0.1:8000/api/deletefavorites/${favItem.id}`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
// //             },
// //           },
// //         );
// //         setFavorites(favorites.filter((item) => item.id !== favItem.id));
// //       } else {
// //         const res = await addToFavorite({
// //           meal_id: meal.id,
// //           user_id: userId,
// //         }).unwrap();
// //         setFavorites([...favorites, { meal_id: meal.id, id: res.id }]);
// //       }
// //     } catch {
// //       alert("حدث خطأ في تحديث المفضلة");
// //     }
// //   };

// //   const createOrder = async (mealId, typeId = null) => {
// //     if (!user) return alert("يرجى تسجيل الدخول أولاً");
// //     try {
// //       const payload = { quantity: 1, meal_id: mealId };
// //       if (typeId) payload.type_meal_id = typeId;
// //       await addToCart(payload).unwrap();
// //       alert("تمت الإضافة إلى السلة بنجاح");
// //     } catch {
// //       alert("فشل في إضافة المنتج إلى السلة");
// //     }
// //   };

// //   const handleChangeType = (item) => {
// //     setSelectedType(item);
// //     setTrueType(true);
// //     setIdType(item.id);
// //     setIsOpen(false);
// //   };

// //   return (
// //     <div className="mx-4 my-4 sm:mx-10 md:mx-16 lg:mx-4 xl:mx-8">
// //       <div className="flex flex-col justify-center py-8 shadow-2xl sm:flex-row">
// //         {/* Image Section */}
// //         <div className="w-[300px] sm:w-[265px] md:w-[310px] lg:w-[430px] xl:w-[565px]">
// //           <div className="relative left-10 w-[300px] py-5 shadow-2xl sm:w-[265px] sm:skew-y-4 md:w-[310px] lg:w-[430px] xl:w-[555px]">
// //             <img
// //               className="relative left-4 h-[390px] w-[260px] rounded-2xl sm:w-[210px] md:w-[270px] lg:w-[380px] xl:w-[500px]"
// //               src={`http://127.0.0.1:8000/storage/${trueType ? selectedType?.image : meal.image}`}
// //               alt={meal.type}
// //             />
// //           </div>
// //         </div>

// //         {/* Middle Image */}
// //         <img
// //           className="relative -top-30 left-36 z-10 rotate-90 max-[640px]:w-[100px] sm:top-2 sm:-left-1 sm:block sm:rotate-0"
// //           src={img1}
// //           alt="decorative"
// //         />

// //         {/* Details Section */}
// //         <div className="relative -top-62 left-9 -mb-50 h-[430px] w-[300px] px-10 py-16 shadow-2xl sm:top-0 sm:-left-12 sm:mb-0 sm:w-[265px] sm:-skew-y-4 md:w-[310px] lg:w-[430px] xl:w-[565px] xl:px-20">
// //           <div className="flex justify-between py-3">
// //             <h3 className="text-2xl font-medium xl:text-3xl">{meal.type}</h3>
// //             <button className="border-0" onClick={handleFavoriteToggle}>
// //               <i
// //                 className={`${isFav ? "ri-heart-3-fill" : "ri-heart-3-line"} text-firstColor cursor-pointer text-4xl`}
// //               ></i>
// //             </button>
// //           </div>

// //           {/* Price */}
// //           <p className="my-3 text-2xl font-medium xl:text-3xl">
// //             {types.length > 0
// //               ? selectedType?.price && `${selectedType.price} $`
// //               : `${meal.price} $`}
// //           </p>

// //           {/* Type Selector */}
// //           {types.length > 0 && (
// //             <div className="relative pt-1 pb-2" ref={dropdownRef}>
// //               <div
// //                 onClick={() => setIsOpen(!isOpen)}
// //                 className="my-2 flex w-full cursor-pointer justify-between rounded border-2 border-red-200 p-2 text-xl font-medium shadow-sm select-none xl:text-3xl"
// //               >
// //                 {selectedType?.name || meal.type}
// //                 <i className="ri-corner-down-left-line text-firstColor"></i>
// //               </div>

// //               {isOpen && (
// //                 <div className="absolute top-14 z-10 mt-1 w-full overflow-hidden rounded border-2 border-red-200 bg-white shadow-md">
// //                   {types.map((item) => (
// //                     <div
// //                       key={item.id}
// //                       onClick={() => handleChangeType(item)}
// //                       onMouseEnter={() => setHoveredType(item.name)}
// //                       onMouseLeave={() => setHoveredType("")}
// //                       className={`cursor-pointer p-2 text-xl hover:bg-red-500 hover:text-white ${
// //                         hoveredType === item.name
// //                           ? "bg-firstColor text-white"
// //                           : ""
// //                       }`}
// //                     >
// //                       {item.name}
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           <Button
// //             title="Add To Cart"
// //             onClick={() => createOrder(meal.id, idType)}
// //             className="mt-3"
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Details;
// // import React, { useEffect, useState, useRef } from "react";
// // import { useParams } from "react-router";
// // import axios from "axios";
// // import Button from "../../../ui/button";
// // import Loader from "../../../ui/loader";
// // import AOS from "aos";
// // import "aos/dist/aos.css";
// // import { useSelector } from "react-redux";

// // import { useAddToFavoriteMutation } from "@/services/favoriteApi";
// // import { useAddToCartMutation } from "@/services/addToCartApi";
// // import { useGetFavoriteMutation } from "@/services/getFavoriteApi";
// // import img1 from "../../../../assets/img/book.png";

// // function Details() {
// //   useEffect(() => {
// //     AOS.init();
// //   }, []);

// //   const [addToCart] = useAddToCartMutation();
// //   const [addToFavorite] = useAddToFavoriteMutation();
// //   const [getFavorite] = useGetFavoriteMutation();
// //   const { detailsId } = useParams();
// //   const user = useSelector((state) => state.auth.user);
// //   const userId = user?.userID ?? null;

// //   const [meal, setMeal] = useState(null);
// //   const [types, setTypes] = useState([]);
// //   const [selectedType, setSelectedType] = useState(null);
// //   const [trueType, setTrueType] = useState(false);
// //   const [idType, setIdType] = useState(null);
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [hoveredType, setHoveredType] = useState("");
// //   const [favorites, setFavorites] = useState([]);
// //   const dropdownRef = useRef(null);
// //   const [loading, setLoading] = useState(true);
// //   const [loadingTypes, setLoadingTypes] = useState(true);

// //   // Fetch meal
// //   useEffect(() => {
// //     const fetchMeal = async () => {
// //       try {
// //         const res = await axios.get(
// //           `http://127.0.0.1:8000/api/showOneMeal/${detailsId}`,
// //         );
// //         setMeal(res.data);
// //       } catch {
// //         alert("فشل في جلب بيانات الوجبة");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchMeal();
// //   }, [detailsId]);

// //   // Fetch types
// //   useEffect(() => {
// //     if (meal) {
// //       const fetchTypes = async () => {
// //         try {
// //           const res = await axios.get(
// //             `http://127.0.0.1:8000/api/showAllTypesMeals/${detailsId}`,
// //           );
// //           setTypes(res.data);
// //         } catch {
// //           alert("فشل في جلب أنواع الوجبة");
// //         } finally {
// //           setLoadingTypes(false);
// //         }
// //       };
// //       fetchTypes();
// //     }
// //   }, [meal, detailsId]);

// //   // Fetch favorites
// //   useEffect(() => {
// //     const fetchFavorites = async () => {
// //       if (!user) return;
// //       try {
// //         const res = await getFavorite().unwrap();
// //         setFavorites(res.data || []);
// //       } catch {
// //         console.error("Failed to fetch favorites");
// //       }
// //     };
// //     fetchFavorites();
// //   }, [user]);

// //   if (loading || loadingTypes || !meal) return <Loader />;

// //   const isFav = favorites.some((item) => item.meal_id === meal.id);

// //   const handleFavoriteToggle = async () => {
// //     if (!user) return alert("يرجى تسجيل الدخول أولاً");
// //     try {
// //       if (isFav) {
// //         const favItem = favorites.find((item) => item.meal_id === meal.id);
// //         await axios.delete(
// //           `http://127.0.0.1:8000/api/deletefavorites/${favItem.id}`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
// //             },
// //           },
// //         );
// //         setFavorites(favorites.filter((item) => item.id !== favItem.id));
// //       } else {
// //         const res = await addToFavorite({
// //           meal_id: meal.id,
// //           user_id: userId,
// //         }).unwrap();
// //         setFavorites([...favorites, { meal_id: meal.id, id: res.id }]);
// //       }
// //     } catch {
// //       alert("حدث خطأ في تحديث المفضلة");
// //     }
// //   };

// //   const createOrder = async (mealId, typeId = null) => {
// //     if (!user) return alert("يرجى تسجيل الدخول أولاً");
// //     try {
// //       const payload = { quantity: 1, meal_id: mealId };
// //       if (typeId) payload.type_meal_id = typeId;
// //       await addToCart(payload).unwrap();
// //       alert("تمت الإضافة إلى السلة بنجاح");
// //     } catch {
// //       alert("فشل في إضافة المنتج إلى السلة");
// //     }
// //   };

// //   const handleChangeType = (item) => {
// //     setSelectedType(item);
// //     setTrueType(true);
// //     setIdType(item.id);
// //     setIsOpen(false);
// //   };

// //   // حساب النجوم
// //   const rate = Math.floor(meal.stars);
// //   const hasHalfStar = meal.stars % 1 >= 0.5 && meal.stars % 1 < 1;
// //   const counterStar = rate + (hasHalfStar ? 1 : 0);
// //   const stars = Array.from({ length: rate }, (_, index) => (
// //     <i key={index} className="ri-star-fill text-firstColor mx-1 text-2xl"></i>
// //   ));
// //   if (hasHalfStar) {
// //     stars.push(
// //       <i
// //         key="half-star"
// //         className="ri-star-half-line text-firstColor text-2xl"
// //       ></i>,
// //     );
// //   }
// //   for (let i = counterStar; i < 5; i++) {
// //     stars.push(
// //       <i key={i} className="ri-star-line text-firstColor mx-1 text-2xl"></i>,
// //     );
// //   }

// //   return (
// //     <div className="mx-4 my-4 sm:mx-10 md:mx-16 lg:mx-4 xl:mx-8">
// //       <div className="flex flex-col justify-center py-8 shadow-2xl sm:flex-row">
// //         {/* Image Section */}
// //         <div className="w-[300px] sm:w-[265px] md:w-[310px] lg:w-[430px] xl:w-[565px]">
// //           <div className="relative left-10 w-[300px] py-5 shadow-2xl sm:w-[265px] sm:skew-y-4 md:w-[310px] lg:w-[430px] xl:w-[555px]">
// //             <img
// //               className="relative left-4 h-[390px] w-[260px] rounded-2xl sm:w-[210px] md:w-[270px] lg:w-[380px] xl:w-[500px]"
// //               src={`http://127.0.0.1:8000/storage/${
// //                 trueType ? selectedType?.image : meal.image
// //               }`}
// //               alt={meal.type}
// //             />
// //           </div>
// //         </div>

// //         {/* Middle Image */}
// //         <img
// //           className="relative -top-30 left-32 z-10 rotate-90 max-[640px]:w-[100px] sm:top-2 sm:-left-2 sm:block sm:rotate-0"
// //           src={img1}
// //           alt="decorative"
// //         />

// //         {/* Details Section */}
// //         <div className="relative -top-62 left-9 -mb-50 h-[430px] w-[300px] px-10 py-16 shadow-2xl sm:top-0 sm:-left-12 sm:mb-0 sm:w-[265px] sm:-skew-y-4 md:w-[310px] lg:w-[430px] xl:w-[565px] xl:px-20">
// //           <div className="flex justify-between py-3">
// //             <h3 className="text-2xl font-medium xl:text-3xl">{meal.type}</h3>
// //             <button className="border-0" onClick={handleFavoriteToggle}>
// //               <i
// //                 className={`${
// //                   isFav ? "ri-heart-3-fill" : "ri-heart-3-line"
// //                 } text-firstColor cursor-pointer text-4xl`}
// //               ></i>
// //             </button>
// //           </div>

// //           {/* Price */}
// //           <p className="my-3 text-2xl font-medium xl:text-3xl">
// //             {types.length > 0
// //               ? selectedType?.price
// //                 ? `${selectedType.price} $`
// //                 : "selected Type"
// //               : `${meal.price} $`}
// //           </p>

// //           {/* Type Selector */}
// //           {types.length > 0 && (
// //             <div className="relative pt-1 pb-2" ref={dropdownRef}>
// //               <div
// //                 onClick={() => setIsOpen(!isOpen)}
// //                 className="my-2 flex w-full cursor-pointer justify-between rounded border-2 border-red-200 p-2 text-xl font-medium shadow-sm select-none xl:text-3xl"
// //               >
// //                 {selectedType?.name || meal.type}
// //                 <i className="ri-corner-down-left-line text-firstColor"></i>
// //               </div>
// //               {isOpen && (
// //                 <div className="absolute top-14 z-10 mt-1 w-full overflow-hidden rounded border-2 border-red-200 bg-white shadow-md">
// //                   {types.map((item) => (
// //                     <div
// //                       key={item.id}
// //                       onClick={() => handleChangeType(item)}
// //                       onMouseEnter={() => setHoveredType(item.name)}
// //                       onMouseLeave={() => setHoveredType("")}
// //                       className={`cursor-pointer p-2 text-xl hover:bg-red-500 hover:text-white ${
// //                         hoveredType === item.name
// //                           ? "bg-firstColor text-white"
// //                           : "selected Type"
// //                       }`}
// //                     >
// //                       {item.name}
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //               {/* Stars */}
// //               <div className="my-2">{stars}</div>
// //             </div>
// //           )}

// //           <Button
// //             title="Add To Cart"
// //             onClick={() => createOrder(meal.id, idType)}
// //             className="mt-3"
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Details;
// import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router";
// import axios from "axios";
// import Button from "../../../ui/button";
// import Loader from "../../../ui/loader";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify"; // <--- استدعاء toast
// import "react-toastify/dist/ReactToastify.css";

// import { useAddToFavoriteMutation } from "@/services/favoriteApi";
// import { useAddToCartMutation } from "@/services/addToCartApi";
// import { useGetFavoriteMutation } from "@/services/getFavoriteApi";
// import img1 from "../../../../assets/img/book.png";

// function Details() {
//   useEffect(() => {
//     AOS.init();
//   }, []);

//   const [addToCart] = useAddToCartMutation();
//   const [addToFavorite] = useAddToFavoriteMutation();
//   const [getFavorite] = useGetFavoriteMutation();
//   const { detailsId } = useParams();
//   const user = useSelector((state) => state.auth.user);
//   const userId = user?.userID ?? null;

//   const [meal, setMeal] = useState(null);
//   const [types, setTypes] = useState([]);
//   const [selectedType, setSelectedType] = useState(null);
//   const [trueType, setTrueType] = useState(false);
//   const [idType, setIdType] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [hoveredType, setHoveredType] = useState("");
//   const [favorites, setFavorites] = useState([]);
//   const dropdownRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   const [loadingTypes, setLoadingTypes] = useState(true);

//   // Fetch meal
//   useEffect(() => {
//     const fetchMeal = async () => {
//       try {
//         const res = await axios.get(
//           `http://127.0.0.1:8000/api/showOneMeal/${detailsId}`,
//         );
//         setMeal(res.data);
//       } catch {
//         toast.error("Failed to fetch meal data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMeal();
//   }, [detailsId]);

//   // Fetch types
//   useEffect(() => {
//     if (meal) {
//       const fetchTypes = async () => {
//         try {
//           const res = await axios.get(
//             `http://127.0.0.1:8000/api/showAllTypesMeals/${detailsId}`,
//           );
//           setTypes(res.data);
//         } catch {
//           toast.error("Failed to fetch meal types");
//         } finally {
//           setLoadingTypes(false);
//         }
//       };
//       fetchTypes();
//     }
//   }, [meal, detailsId]);

//   // Fetch favorites
//   useEffect(() => {
//     const fetchFavorites = async () => {
//       if (!user) return;
//       try {
//         const res = await getFavorite().unwrap();
//         setFavorites(res.data || []);
//       } catch {
//         console.error("Failed to fetch favorites");
//       }
//     };
//     fetchFavorites();
//   }, [user]);

//   if (loading || loadingTypes || !meal) return <Loader />;

//   const isFav = favorites.some((item) => item.meal_id === meal.id);

//   const handleFavoriteToggle = async () => {
//     if (!user) return toast.info("Please log in first");
//     try {
//       if (isFav) {
//         const favItem = favorites.find((item) => item.meal_id === meal.id);
//         await axios.delete(
//           `http://127.0.0.1:8000/api/deletefavorites/${favItem.id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
//             },
//           },
//         );
//         setFavorites(favorites.filter((item) => item.id !== favItem.id));
//         toast.success("Removed from favorites");
//       } else {
//         const res = await addToFavorite({
//           meal_id: meal.id,
//           user_id: userId,
//         }).unwrap();
//         setFavorites([...favorites, { meal_id: meal.id, id: res.id }]);
//         toast.success("Added to favorites");
//       }
//     } catch {
//       toast.error("Failed to update favorites");
//     }
//   };

//   const createOrder = async (mealId, typeId = null) => {
//     if (!user) return toast.info("Please log in first");
//     try {
//       const payload = { quantity: 1, meal_id: mealId };
//       if (typeId) payload.type_meal_id = typeId;
//       await addToCart(payload).unwrap();
//       toast.success("Added to cart successfully");
//     } catch {
//       toast.error("Failed to add product to cart");
//     }
//   };

//   const handleChangeType = (item) => {
//     setSelectedType(item);
//     setTrueType(true);
//     setIdType(item.id);
//     setIsOpen(false);
//   };

//   // حساب النجوم
//   const rate = Math.floor(meal.stars);
//   const hasHalfStar = meal.stars % 1 >= 0.5 && meal.stars % 1 < 1;
//   const counterStar = rate + (hasHalfStar ? 1 : 0);
//   const stars = Array.from({ length: rate }, (_, index) => (
//     <i key={index} className="ri-star-fill text-firstColor mx-1 text-2xl"></i>
//   ));
//   if (hasHalfStar) {
//     stars.push(
//       <i
//         key="half-star"
//         className="ri-star-half-line text-firstColor text-2xl"
//       ></i>,
//     );
//   }
//   for (let i = counterStar; i < 5; i++) {
//     stars.push(
//       <i key={i} className="ri-star-line text-firstColor mx-1 text-2xl"></i>,
//     );
//   }

//   return (
//     <div className="mx-4 my-4 sm:mx-10 md:mx-16 lg:mx-4 xl:mx-8">
//       <div className="flex flex-col justify-center py-8 shadow-2xl sm:flex-row">
//         {/* Image Section */}
//         <div className="w-[300px] sm:w-[265px] md:w-[310px] lg:w-[430px] xl:w-[565px]">
//           <div className="relative left-10 w-[300px] py-5 shadow-2xl sm:w-[265px] sm:skew-y-4 md:w-[310px] lg:w-[430px] xl:w-[555px]">
//             <img
//               className="relative left-4 h-[390px] w-[260px] rounded-2xl sm:w-[210px] md:w-[270px] lg:w-[380px] xl:w-[500px]"
//               src={`http://127.0.0.1:8000/storage/${
//                 trueType ? selectedType?.image : meal.image
//               }`}
//               alt={meal.type}
//             />
//           </div>
//         </div>

//         {/* Middle Image */}
//         <img
//           className="relative -top-30 left-32 z-10 rotate-90 max-[640px]:w-[100px] sm:top-2 sm:-left-2 sm:block sm:rotate-0"
//           src={img1}
//           alt="decorative"
//         />

//         {/* Details Section */}
//         <div className="relative -top-62 left-9 -mb-50 h-[430px] w-[300px] px-10 py-16 shadow-2xl sm:top-0 sm:-left-12 sm:mb-0 sm:w-[265px] sm:-skew-y-4 md:w-[310px] lg:w-[430px] xl:w-[565px] xl:px-20">
//           <div className="flex justify-between py-3">
//             <h3 className="text-2xl font-medium xl:text-3xl">{meal.type}</h3>
//             <button className="border-0" onClick={handleFavoriteToggle}>
//               <i
//                 className={`${
//                   isFav ? "ri-heart-3-fill" : "ri-heart-3-line"
//                 } text-firstColor cursor-pointer text-4xl`}
//               ></i>
//             </button>
//           </div>

//           {/* Price */}
//           <p className="my-3 text-2xl font-medium xl:text-3xl">
//             {types.length > 0
//               ? selectedType?.price
//                 ? `${selectedType.price} $`
//                 : "selected Type"
//               : `${meal.price} $`}
//           </p>

//           {/* Type Selector */}
//           {types.length > 0 && (
//             <div className="relative pt-1 pb-2" ref={dropdownRef}>
//               <div
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="my-2 flex w-full cursor-pointer justify-between rounded border-2 border-red-200 p-2 text-xl font-medium shadow-sm select-none xl:text-3xl"
//               >
//                 {selectedType?.name || meal.type}
//                 <i className="ri-corner-down-left-line text-firstColor"></i>
//               </div>
//               {isOpen && (
//                 <div className="absolute top-14 z-10 mt-1 w-full overflow-hidden rounded border-2 border-red-200 bg-white shadow-md">
//                   {types.map((item) => (
//                     <div
//                       key={item.id}
//                       onClick={() => handleChangeType(item)}
//                       onMouseEnter={() => setHoveredType(item.name)}
//                       onMouseLeave={() => setHoveredType("")}
//                       className={`cursor-pointer p-2 text-xl hover:bg-red-500 hover:text-white ${
//                         hoveredType === item.name
//                           ? "bg-firstColor text-white"
//                           : "selected Type"
//                       }`}
//                     >
//                       {item.name}
//                     </div>
//                   ))}
//                 </div>
//               )}
//               {/* Stars */}
//               <div className="my-2">{stars}</div>
//             </div>
//           )}

//           <Button
//             title="Add To Cart"
//             onClick={() => createOrder(meal.id, idType)}
//             className="mt-3"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Details;
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

import { useAddToFavoriteMutation } from "@/services/favoriteApi";
import { useAddToCartMutation } from "@/services/addToCartApi";
import { useGetFavoriteMutation } from "@/services/getFavoriteApi";
import img1 from "../../../../assets/img/book.png";

function Details() {
  useEffect(() => {
    AOS.init();
  }, []);

  const [addToCart] = useAddToCartMutation();
  const [addToFavorite] = useAddToFavoriteMutation();
  const [getFavorite] = useGetFavoriteMutation();
  const { detailsId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const userId = user?.userID ?? null;

  const [meal, setMeal] = useState(null);
  const [types, setTypes] = useState([]);
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
  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/showOneMeal/${detailsId}`,
        );
        setMeal(res.data);
      } catch {
        toast.error("Failed to fetch meal data");
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [detailsId]);

  // Fetch types
  useEffect(() => {
    if (meal) {
      const fetchTypes = async () => {
        try {
          const res = await axios.get(
            `http://127.0.0.1:8000/api/showAllTypesMeals/${detailsId}`,
          );
          setTypes(res.data);
        } catch {
          toast.error("Failed to fetch meal types");
        } finally {
          setLoadingTypes(false);
        }
      };
      fetchTypes();
    }
  }, [meal, detailsId]);

  // Fetch favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;
      try {
        const res = await getFavorite().unwrap();
        setFavorites(res.data || []);
      } catch {
        console.error("Failed to fetch favorites");
      }
    };
    fetchFavorites();
  }, [user]);

  if (loading || loadingTypes || !meal) return <Loader />;

  const isFav = favorites.some((item) => item.meal_id === meal.id);

  const handleFavoriteToggle = async () => {
    if (!user) return toast.info("Please log in first");
    try {
      if (isFav) {
        const favItem = favorites.find((item) => item.meal_id === meal.id);
        await axios.delete(
          `http://127.0.0.1:8000/api/deletefavorites/${favItem.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
            },
          },
        );
        setFavorites(favorites.filter((item) => item.id !== favItem.id));
        toast.success("Removed from favorites");
      } else {
        const res = await addToFavorite({
          meal_id: meal.id,
          user_id: userId,
        }).unwrap();
        setFavorites([...favorites, { meal_id: meal.id, id: res.id }]);
        toast.success("Added to favorites");
      }
    } catch {
      toast.error("Failed to update favorites");
    }
  };

  const createOrder = async (mealId, typeId = null) => {
    if (!user) return toast.info("Please log in first");
    try {
      const payload = { quantity: 1, meal_id: mealId };
      if (typeId) payload.type_meal_id = typeId;
      await addToCart(payload).unwrap();
      toast.success("Added to cart successfully");
    } catch {
      toast.error("Failed to add product to cart");
    }
  };

  const handleChangeType = (item) => {
    setSelectedType(item);
    setTrueType(true);
    setIdType(item.id);
    setIsOpen(false);
  };

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
                src={`http://127.0.0.1:8000/storage/${
                  trueType ? selectedType?.image : meal.image
                }`}
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
              <button className="border-0" onClick={handleFavoriteToggle}>
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
                  {selectedType?.name || meal.type}
                  <i className="ri-corner-down-left-line text-firstColor"></i>
                </div>
                {isOpen && (
                  <div className="absolute top-14 z-10 mt-1 w-full overflow-hidden rounded border-2 border-red-200 bg-white shadow-md">
                    {types.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleChangeType(item)}
                        onMouseEnter={() => setHoveredType(item.name)}
                        onMouseLeave={() => setHoveredType("")}
                        className={`cursor-pointer p-2 text-xl hover:bg-red-500 hover:text-white ${
                          hoveredType === item.name
                            ? "bg-firstColor text-white"
                            : "selected Type"
                        }`}
                      >
                        {item.name}
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
