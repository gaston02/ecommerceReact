import { useRoutes, BrowserRouter } from "react-router-dom";
import { ShoppingCartProvider } from "../../context";
import Home from "../home/Index";
import MyAccount from "../myAccount/Index";
import MyOrder from "../myOrder/Index";
import MyOrders from "../myOrders/Index";
import NotFound from "../notFound/Index";
import SignIn from "../signIn/Index";
import NavBar from "../../components/navbar/index";
import CheckoutSideMenu from "../../components/checkoutSideMenu";
import "./App.css";

const AppRoutes = () => {
  let routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/my-account",
      element: <MyAccount />,
    },
    {
      path: "/my-order",
      element: <MyOrder />,
    },
    {
      path: "/my-order/last",
      element: <MyOrder />,
    },
    {
      path: "/my-order/:id",
      element: <MyOrder />,
    },
    {
      path: "/my-orders",
      element: <MyOrders />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ]);

  return routes;
};

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <NavBar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
};

export default App;
