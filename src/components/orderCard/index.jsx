import PropTypes from "prop-types";
import { XMarkIcon } from "@heroicons/react/24/solid";

const OrderCard = (props) => {
  const { title, imageUrl, price, quantity, onQuantityChange, onRemove } =
    props;

  // Calculate total price based on quantity
  const totalPrice = (price * quantity).toFixed(2);

  const increaseQuantity = () => {
    onQuantityChange(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex item-center gap-2">
        <figure className="w-20 h-20">
          <img
            className="w-full h-full rounded-lg object-cover"
            src={imageUrl}
            alt={title}
          />
        </figure>
        <p className="text-sm font-light">{title}</p>
      </div>
      <div className="flex item-center gap-2">
        <p className="text-lg font-medium">${totalPrice}</p>
        {/* Display total price */}
        <div className="flex items-center gap-2">
          <button onClick={decreaseQuantity}>-</button>
          <span>{quantity}</span>
          <button onClick={increaseQuantity}>+</button>
        </div>
        <XMarkIcon
          className="size-6 text-black cursor-pointer"
          onClick={onRemove}
        />
      </div>
    </div>
  );
};

// Define prop types
OrderCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  quantity: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default OrderCard;
