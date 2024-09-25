import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home";
 import UserLayout from "../layout/UserLayout";
import ErrorPage from "../components/ErrorPage";
import CategoryProducts from "../pages/CategoryProducts";
import ProductDetails from "../components/ProductDetails";
import SearchPage from "../pages/SearchPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/signupPage";
import Cart from "../pages/CartPage";
import Checkout from "../pages/CheckoutPage";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";
import PaymentFailurePage from "../pages/PaymentFailurePage";
import UserProfile from "../pages/userProfile";
import Profile from "../components/Profile";

import Orders from "../components/Orders";
import Address from "../components/address";
import Favourites from "../pages/Favourites";







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
         path:'/favourites',
         element:<Favourites/>
       },
      {
        path:'checkout',
        element:<Checkout/>
      },
      {
        path:'success',
        element:<PaymentSuccessPage/>
      },
      {
        path:'/failure',
        element:<PaymentFailurePage/>
      },
      {
        path:'/user',
        element:<UserProfile/>,
        children:[
          {
            path:"",
            element:<Profile/>
          },
          {
            path:'orders',
            element:<Orders/>
          },
          {
              path:'wishlist',
              element:<Favourites/>
          },
          {
            path:'address',
            element:<Address/>
          }
        ]
      },
      
    ]
  },
  
]);