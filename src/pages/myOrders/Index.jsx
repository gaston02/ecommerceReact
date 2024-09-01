import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../../context";
import Layout from "../../components/layout";
import OrdersCard from "../../components/ordersCard";

function MyOrders() {
  const context = useContext(ShoppingCartContext);
  console.log("Ordenes:", context.order);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Layout>
      <div className="flex items-center justify-items-center relative w-80">
        <h1 className="font-medium text-xl mb-3">My Orders</h1>
      </div>
      {context.order.map((order, index) => (
        <Link key={index} to={`/my-order/${index}`}>
          <OrdersCard
            date={formatDate(order.date)}
            totalProducts={order.totalProducts}
            totalPrice={order.totalPrice}
          />
        </Link>
      ))}
    </Layout>
  );
}

export default MyOrders;
