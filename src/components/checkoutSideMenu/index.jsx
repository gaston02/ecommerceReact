import { useContext } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../context";
import { totalPriceCart } from "../../util";
import OrderCard from "../orderCard";
import "./style.css";

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext);

  const handleCheckout = () => {
    const orderToAdd = {
      date: Date.now(),
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPriceCart(context.cartProducts),
    };

    context.setOrder([...context.order, orderToAdd]);
    context.setCartProducts([]);
  };

  return (
    <aside
      className={`${
        context.isCheckoutSideMenuOpen ? "flex" : "hidden"
      } checkout-side-menu scrollable-cards flex-col fixed top-20 right-0 border border-black rounded-lg bg-white`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <div>
          <XMarkIcon
            className="size-6 text-black cursor-pointer"
            onClick={() => context.closeCheckoutSideMenu()}
          />
        </div>
      </div>
      <div className="px-2 items-center flex-1">
        {context.cartProducts.map((product) => (
          <OrderCard
            key={product.id}
            title={product.title}
            imageUrl={product.image}
            price={product.price}
            quantity={product.quantity} // Pass quantity
            onQuantityChange={(newQuantity) =>
              context.updateProductQuantity(product.id, newQuantity)
            }
            onRemove={() => context.removeProductFromCart(product.id)}
            showQuantityControls={true} // Ensure controls are shown
          />
        ))}
      </div>
      <div className="px-6 mb-6">
        <p className="flex justify-between items-center">
          <span className="font-light">Total:</span>
          <span className="font-medium text-xl">
            ${totalPriceCart(context.cartProducts)}
          </span>
        </p>
        <Link to="my-order/last">
          <button
            className="bg-lime-600 py-2 text-white w-full rounded-lg mt-2"
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
};

export default CheckoutSideMenu;
