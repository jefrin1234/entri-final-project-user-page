import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home";
import UserLayout from "../layout/userLayout";
import ErrorPage from "../components/ErrorPage";
import CategoryProducts from "../pages/CategoryProducts";
import ProductDetails from "../components/ProductDetails";
import SearchPage from "../pages/SearchPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/signupPage";
import Cart from "../pages/CartPage";
import Checkout from "../pages/CheckoutPage";






export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:'',
        element:<Home/>
      },
      {
        path:'login',
        element:<LoginPage/>
      },
      {
        path:'signup',
        element:<SignupPage/>
      },
      {
        path:'category-products/',
        element:<CategoryProducts/>
      },
      {
        path:'product-details/:productId',
        element:<ProductDetails/>
      },
      {
        path:'search',
        element:<SearchPage/>
      },
      
      {
        path:'/cart',
        element:<Cart/>
      },
      {
        path:'checkout',
        element:<Checkout/>
      }
    ]
  },
  
]);