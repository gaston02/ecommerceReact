import { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import "./style.css";
import { ShoppingCartContext } from "../../context";

const ProductDetail = () => {
  const context = useContext(ShoppingCartContext);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <aside
      className={`${
        context.isProductDetailOpen ? "flex" : "hidden"
      } product-detail flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Detail</h2>
        <div>
          <XMarkIcon
            className="size-6 text-black cursor-pointer"
            onClick={() => context.closeProductDetail()}
          ></XMarkIcon>
        </div>
      </div>
      <figure className="px-6">
        <img
          className="image-prodct-detail"
          src={context.productToShow.image}
          alt={truncateText(context.productToShow.title, 50)}
        />
      </figure>
      <p className="flex flex-col p-6">
        <span className="font-medium text-md">
          {truncateText(context.productToShow.title, 50)}
        </span>
        <span className="font-light text-sm">
          {truncateText(context.productToShow.description, 300)}
        </span>
        <span className="font-medium text-2xl mb-2">
          ${context.productToShow.price}
        </span>
      </p>
    </aside>
  );
};

export default ProductDetail;
