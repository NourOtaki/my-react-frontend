 import React, { useEffect, useState } from 'react';
 import { Link } from 'react-router';
 import axios from 'axios';
//  import { categories } from "../../../../data/data";
//  import img1 from "../../../../assets/img/categories/cimg5.jpg";
 import Button from '../../../ui/button';
import { useParams } from "react-router";
import Loader from '../../../ui/loader';

 function Type() {
  const { typeId } = useParams();
   const [users, setUsers] = useState([]);
  // const type = users.find((meal) => meal.id === parseInt(typeId));
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   useEffect(() => {
     const fetchUsers = async () => {
       try {
         const response = await axios.get(
           `http://127.0.0.1:8000/api/showAllMeal/${typeId}`,
         );
        setUsers(response.data);
        console.log(users.image);
        console.log("data ", users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
    if (loading) return (
      <div className="relative top-10 my-10">
        <Loader />
      </div>
    );
    if (error) return <div>Error: {error}</div>;
  // const [data, setData] = useState(categories);
  return (
    <>
      {/* {type && ( */}
      <div className="relative grid md:items-start  min-h-screen gap-y-10 md:gap-y-0 md:grid-cols-2 xl:gap-x-32 lg:gap-x-16 gap-x-10  py-18 px-[10%] sm:px-[21%] md:px-10 lg:px-14  xl:px-32">
        {users.map((meal, index) => (
          <Link to={`/categories/category${meal.category_id}/${meal.id}`}>
            <div
              key={index}
              className="bg-containerColor relative -top-10 row-auto md:h-44 flex lg:h-50 xl:w-[484px] lg:w-[465px] md:w-[350px] w-[360px] rounded-4xl shadow-2xl transition duration-[.4s] hover:scale-[1.1]"
            >
              <img
                className="m-4 lg:size-42 md:size-36 size-38 rounded-2xl"
                // src={img1}
                src={`http://127.0.0.1:8000/storage/${meal.image}`}
              ></img>
              <div className="relative top-14 lg:mx-13">
                <p className="font-Carter left-10 mb-5 text-center md:text-xl lg:text-2xl font-bold">
                  {meal.type}
                </p>
                <Link
                  to={`/categories/category${meal.category_id}/${meal.id}`}
                  className="text-firstColor font-semibold hover:underline"
                >
                  <Button
                    className="cursor-pointer"
                    title="show details"
                  ></Button>
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* ) */}
      {/* } */}
    </>
  );
}

export default Type;