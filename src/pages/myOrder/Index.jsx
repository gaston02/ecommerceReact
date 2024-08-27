import { useContext } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../context";
import Layout from "../../components/layout";
import OrderCard from "../../components/orderCard";

function MyOrder() {
  const context = useContext(ShoppingCartContext);
  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf("/") + 1);

  if (index === "last") index = context.order?.length - 1;

  return (
    <Layout>
      <div className="w-80 flex items-center justify-center relative">
        <Link to="/my-orders" className="absolute left-0">
          <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer" />
        </Link>
        <h1 className="flex-1 text-center">My Order</h1>
      </div>

      <div className="flex flex-col w-80 mt-2">
        {context.order?.[index].products.map((product) => (
          <OrderCard
            key={product.id}
            title={product.title}
            imageUrl={product.image}
            price={product.price}
            quantity={product.quantity} // Pass quantity
            showQuantityControls={false} // Hide controls in MyOrder
            showQuantityInTitle={true} // Show quantity in title
          />
        ))}
      </div>
    </Layout>
  );
}

export default MyOrder;
