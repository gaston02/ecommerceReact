import { useRoutes, BrowserRouter } from "react-router-dom";
import Home from "../home/Index";
import MyAccount from "../myAccount/Index";
import MyOrder from "../myOrder/Index";
import MyOrders from "../myOrders/Index";
import NotFound from "../notFound/Index";
import SignIn from "../signIn/Index";
import "./App.css";
import NavBar from "../../components/navbar/index";
import { ShoppingCartProvider } from "../../context";

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
      </BrowserRouter>
    </ShoppingCartProvider>
  );
};

export default App;
