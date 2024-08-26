import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import Layout from "../../components/layout";
import OrderCard from "../../components/orderCard";

function MyOrder() {
  const context = useContext(ShoppingCartContext);

  return (
    <Layout>
      <h2 className="text-xl font-medium mb-4">My Order</h2>
      <div className="flex flex-col w-80">
        {context.order?.slice(-1)[0].products.map((product) => (
          <OrderCard
            key={product.id}
            title={product.title}
            imageUrl={product.image}
            price={product.price}
            quantity={product.quantity} // Pass quantity
            showQuantityControls={false} // Hide controls in MyOrder
          />
        ))}
      </div>
    </Layout>
  );
}

export default MyOrder;
