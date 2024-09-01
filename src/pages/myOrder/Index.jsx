import { useContext } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../context";
import Layout from "../../components/layout";
import OrderCard from "../../components/orderCard";
import { totalPriceCart } from "../../util";

function MyOrder() {
  const context = useContext(ShoppingCartContext);
  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf("/") + 1);

  if (index === "last") index = context.order?.length - 1;

  // Get the products from the current orde
  const orderProducts = context.order?.[index].products || [];

  // Calculate the totalPrice of the current order
  const orderTotalPrice = totalPriceCart(orderProducts);

  return (
    <Layout>
      <div className="w-80 flex items-center justify-center relative">
        <Link to="/my-orders" className="absolute left-0">
          <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer" />
        </Link>
        <h1 className="flex-1 text-center">My Order</h1>
      </div>

      <div className="flex flex-col w-80 mt-2">
        {orderProducts.map((product) => (
          <OrderCard
            key={product.id}
            title={product.title}
            imageUrl={product.image}
            price={product.price}
            quantity={product.quantity}
            showQuantityControls={false}
            showQuantityInTitle={true}
          />
        ))}
      </div>

      {/* Display the totalPrice of the order */}
      <div className="px-6 mb-6">
        <p className="flex justify-between items-center">
          <span className="font-medium">Total:</span>
          <span className="font-semibold text-lg mx-2">${orderTotalPrice}</span>
        </p>
      </div>
    </Layout>
  );
}

export default MyOrder;
