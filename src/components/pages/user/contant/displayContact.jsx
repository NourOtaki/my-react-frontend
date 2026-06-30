
import React, { useEffect, useState } from "react";
import img1 from "../../../../assets/img/contact/person_2.jpg";
import img22 from "../../../../assets/img/layout/leaf-branch-4.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Aos from "aos";
import Loader from "@/components/ui/loader";
import axios from "axios";
import { comment} from "../../../../data/comment";
function DisplayContact() {
  useEffect(() => {
    Aos.init();
  }, []);

  const [data, setData] = useState(comment);
  const [activeIndex, setActiveIndex] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://127.0.0.1:8000/api/evaluations`,
  //       );
  //       // ⚡ مهم: الوصول إلى المصفوفة الفعلية
  //       setData(response.data.data || []);
  //     } catch (err) {
  //       setError(err.response?.data?.message || err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  // if (loading)
  //   return (
  //     <div className="relative top-10 my-10">
  //       <Loader />
  //     </div>
  //   );
  // if (error)
  //   return <div className="mt-8 text-center text-red-600">Error: {error}</div>;

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className="h-screen">
      <img
        src={img22}
        className="absolute top-[315%] left-[0%] h-28 rotate-180"
      />
      <div
        data-aos="zoom-in"
        data-aos-duration="2500"
        data-aos-easing="ease-out-cubic"
        className="pb-10"
      >
        <h1 className="font-Carter flex flex-col items-center justify-center pt-12 pb-4 text-4xl font-bold">
          Excerpts from your opinions
        </h1>
      </div>
      <Swiper
        className="relative grid grid-cols-4 px-12 lg:px-26"
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        onSlideChange={handleSlideChange}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 40 },
          1024: { slidesPerView: 4, spaceBetween: 50 },
        }}
        modules={[Pagination, Autoplay]}
      >
        {data.map((item, index) => (
          <SwiperSlide
            key={index}
            className="left-[16%] p-2 md:left-[36%] xl:left-[40%]"
          >
            <div className="group min-h-96 w-[250px] rounded border-1 border-red-200 transition duration-[.6s] hover:shadow-[0_3px_10px_rgba(0,0,0,0.2)]">
              <div className="flex justify-center">
              
                  <img
                    className="my-4 size-42 rounded-[50%] group-hover:border-3 group-hover:border-red-200"
                    src={img1}
                    alt="default user"
                  />
                
              </div>
              <div className="text-center">
                <h3 className="font-Carter text-2xl capitalize">
                  <a href="email">{item.name}</a>
                </h3>
                <div className="my-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <i
                      key={i}
                      className={`${
                        i < item.stars ? "ri-star-fill" : "ri-star-line"
                      } mx-1 text-2xl text-red-300`}
                    ></i>
                  ))}
                </div>
                <div className="textColor px-3 break-words whitespace-normal capitalize">
                  {item.comment}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default DisplayContact;
