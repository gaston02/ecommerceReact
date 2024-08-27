import PropTypes from "prop-types";

const OrdersCard = (props) => {
  const { totalProducts, totalPrice, date } = props;

  return (
    <div className="flex justify-between items-center mb-4 border border-black">
      <p>
        <span>{date}</span>
        <span>{totalProducts}</span>
        <span>{totalPrice}</span>
      </p>
    </div>
  );
};

OrdersCard.propTypes = {
  totalProducts: PropTypes.number.isRequired, // Cantidad total de productos
  totalPrice: PropTypes.oneOfType([
    PropTypes.string, // Precio como cadena de texto
    PropTypes.number, // Precio como número
  ]).isRequired,
  date: PropTypes.string.isRequired, // Fecha como cadena de texto
};

export default OrdersCard;
