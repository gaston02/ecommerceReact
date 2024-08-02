import { useRoutes, BrowserRouter } from "react-router-dom";
import Home from "../home/Index";
import MyAccount from "../myAccount/Index";
import MyOrder from "../myOrder/Index";
import MyOrders from "../myOrders/Index";
import NotFound from "../notFound/Index";
import SignIn from "../signIn/Index";
import "./App.css";
import NavBar from "../../components/navbar/index";

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
    <BrowserRouter>
      <AppRoutes />
      <NavBar />
    </BrowserRouter>
  );
};

export default App;
