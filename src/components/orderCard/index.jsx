import PropTypes from "prop-types";
import { XMarkIcon } from "@heroicons/react/24/solid";

const OrderCard = (props) => {
  const {
    title,
    imageUrl,
    price,
    quantity,
    onQuantityChange,
    onRemove,
    showQuantityControls,
    showQuantityInTitle, // New prop to control quantity in title
  } = props;

  // Render the XMarkIcon if the onRemove function is provided
  let renderXMarkIcon;
  if (onRemove) {
    renderXMarkIcon = (
      <XMarkIcon
        className="size-6 text-black cursor-pointer"
        onClick={onRemove}
      />
    );
  }

  // Calculate total price based on quantity
  const totalPrice = parseFloat((price * quantity).toFixed(2));

  // Handlers for increasing and decreasing the quantity
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
      <div className="flex items-center gap-2">
        <figure className="w-20 h-20">
          <img
            className="w-full h-full rounded-lg object-cover"
            src={imageUrl}
            alt={title}
          />
        </figure>
        {/* Conditionally render title with quantity */}
        <p className="text-sm font-light">
          {title}
          {showQuantityInTitle && (
            <span className="font-bold ml-1">x{quantity}</span>
          )}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-lg font-medium">${totalPrice}</p>
        {/* Display total price */}
        {showQuantityControls && (
          <div className="flex items-center gap-2">
            <button onClick={decreaseQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>
        )}
        {renderXMarkIcon}
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
  onQuantityChange: PropTypes.func,
  onRemove: PropTypes.func,
  showQuantityControls: PropTypes.bool,
  showQuantityInTitle: PropTypes.bool, // New prop for showing quantity in title
};

// Set default props
OrderCard.defaultProps = {
  showQuantityControls: true,
  showQuantityInTitle: false, // Default to false to maintain current behavior
};

export default OrderCard;
