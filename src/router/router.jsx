import Layout from "../components/pages/user/layout/layout";
import Login from "../components/pages/user/auth/login/login";
import Register from "../components/pages/user/auth/login/register";
import IndexHome from "../components/pages/user/home/indexHome";
import { createBrowserRouter, Outlet } from "react-router";
import IndexCategories from "../components/pages/user/categories/indexCategories";
import Type from "../components/pages/user/type/type";
import Details from "../components/pages/user/details/details";
import IndexContact from "../components/pages/user/contant/indexContact";
import LayoutDashboard from "../components/pages/dashboard/layoutDash/layoutDash";
import CategoriesDash from "../components/pages/dashboard/categoriesDash/categoriesDash";
import StatisticsPage from "../components/pages/dashboard/homeDash/homeDash";
import TypeDash from "../components/pages/dashboard/typeDash/typeDash";
import MealDash from "@/components/pages/dashboard/mealDash/mealDash";
import Bill from "@/components/pages/user/bill/bill";
import Favorite from "@/components/pages/user/favorite/favorite";
import PageReserve from "@/components/pages/user/reserve/pageReserve";
import ReserveDash from "@/components/pages/dashboard/reserve/reserve";
import About from "@/components/pages/user/about/about";
import Order from "@/components/pages/dashboard/orders/orders";
// import loginDash from "@/components/pages/dashboard/login/login";
import ProtectedRoute from "./ProtectedRoute";
import Tables from "@/components/pages/dashboard/reserve/Tables";
import TablesReserved from "@/components/pages/dashboard/reserve/tableReserved";
import ReserveLast from "@/components/pages/user/reserve/reserveLast";
const router = createBrowserRouter([
  {
    path: "/favorite",
    Component: Favorite,
  },
  {
    path: "/bill",
    Component: Bill,
  },
  {
    path: "/login",
    Component: Login,
  },
  // { path: "loginDash", Component: Login },

  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute role="admin" />, // هون بتحمي المسار
    children: [
      {
        element: <LayoutDashboard />, // إذا أدمن يفتح الـ layout
        children: [
          { index: true, Component: StatisticsPage },
          { path: "login", Component: Login },
          {
            path: "createTable",
            element: <Outlet />,
            children: [
              { index: true, Component: ReserveDash },
              {
                path: "showTable",
                element: <Outlet />,
                children: [
                  { index: true, Component: Tables },
                  { path: "reserved", Component: TablesReserved },
                ],
              },
            ],
          },
          { path: "orders", Component: Order },

          {
            path: "*",
            element: (
              <h1 className="text-bold text-center text-4xl font-bold text-red-500">
                not found
              </h1>
            ),
          },

          {
            path: "categoriesDash",
            element: <Outlet />,
            children: [
              { index: true, Component: CategoriesDash },
              {
                path: ":categoryId",
                element: <Outlet />,
                children: [
                  { index: true, Component: MealDash },
                  { path: ":mealId", Component: TypeDash },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  
  {
    path: "/",
    Component: Layout,
    name: "Home",
    children: [
      {
        path: "*",
        element: (
          <>
            <h1 className="text-bold text-center text-4xl font-bold text-red-500">
              not found
            </h1>
          </>
        ),
      },
      {
        path: "/reserve",
        Component: PageReserve,
      },
      {
        path: "/reserveLast",
        Component: ReserveLast,
      },
      {
        path: "/contact",
        Component: IndexContact,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        index: true,
        Component: IndexHome,
      },
      {
        path: "categories",
        name: "Categories",
        element: (
          <>
            <Outlet />
          </>
        ),
        children: [
          { index: true, Component: IndexCategories },
          {
            path: ":typeId",
            element: (
              <>
                <Outlet />
              </>
            ),
            children: [
              { index: true, Component: Type, name: "Types" },
              {
                path: ":detailsId",
                Component: Details,
                name: "Details",
              },
            ],
          },
        ],
      },
    ],
  },
]);
export default router;
