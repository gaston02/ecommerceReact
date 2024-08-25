import { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../context";
import { totalPriceCart } from "../../util";
import OrderCard from "../orderCard";
import "./style.css";

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext);
  console.log(`Cart: ${context.cartProducts}`);

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
      <div className="px-2 items-center">
        {/* Wrap map in curly braces */}
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
          />
        ))}
      </div>
      <div className="px-6">
        <p className="flex justify-between items-center">
          <span className="font-light">Total:</span>
          <span className="font-medium text-xl">${totalPriceCart(context.cartProducts)}</span>
        </p>
      </div>
    </aside>
  );
};

export default CheckoutSideMenu;
