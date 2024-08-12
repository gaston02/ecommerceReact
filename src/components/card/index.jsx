import { useContext } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../context";

const Card = (data) => {
  const context = useContext(ShoppingCartContext);

  const showProduct = (productDetail) => {
    context.openProductDetail();
    context.setProductToShow(productDetail);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div
      className="bg-white cursor-pointer w-56 h-60 rounded-lg"
      onClick={() => showProduct(data.data)}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">
          {data.data.category}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={data.data.image}
          alt={truncateText(data.data.title, 50)}
        ></img>
        <div
          className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
          onClick={() => context.setCount(context.count + 1)}
        >
          <div>
            <PlusIcon className="size-6 text-black"></PlusIcon>
          </div>
        </div>
      </figure>
      <p className="flex justify-between">
        <span className="text-sm font-light">{truncateText(data.data.title, 50)}</span>
        <span className="text-lg font-medium">${data.data.price}</span>
      </p>
    </div>
  );
};

export default Card;
