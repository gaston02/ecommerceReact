import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { totalPriceCart } from "../util";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  // ShoppingCart . Quantity
  const [count, setCount] = useState(0);

  // ShoppingCart . AddProductsToCart
  const [cartProducts, setCartProducts] = useState([]);

  // ShoppingCart . TotalPrice
  const [totalPrice, setTotalPrice] = useState(0);

  // ProductDetail . Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  // CheckoutSideMenu . Open/Close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  // ProductDetail . ProductShow
  const [productToShow, setProductToShow] = useState({});

  // OrdersProducts . OrderProduct
  const [order, setOrder] = useState([])

  // Add product to cart
  const addProductToCart = (product) => {
    setCartProducts((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex(
        (p) => p.id === product.id
      );

      if (existingProductIndex > -1) {
        // Product already exists, update quantity
        const updatedProducts = [...prevProducts];
        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          quantity: updatedProducts[existingProductIndex].quantity + 1,
        };
        return updatedProducts;
      } else {
        // New product, add to cart
        return [...prevProducts, { ...product, quantity: 1 }];
      }
    });

    // Recalculate the total price every time a product is added
    setTotalPrice((prevProducts) => totalPriceCart(prevProducts));
    openCheckoutSideMenu();
  };

  // Update product quantity
  const updateProductQuantity = (id, quantity) => {
    setCartProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === id ? { ...product, quantity } : product
      );

      // Recalculate the total price when the quantity is updated
      setTotalPrice(totalPriceCart(updatedProducts));
      return updatedProducts;
    });
  };

  // Remove product from cart
  const removeProductFromCart = (id) => {
    setCartProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (product) => product.id !== id
      );

      // Recalculate the total price when a product is removed
      setTotalPrice(totalPriceCart(updatedProducts));
      return updatedProducts;
    });
  };

  // Calculate total count
  useEffect(() => {
    const totalCount = cartProducts.reduce(
      (total, product) => total + product.quantity,
      0
    );
    setCount(totalCount);

    // Recalculate the total price when the cart changes
    setTotalPrice(totalPriceCart(cartProducts));
  }, [cartProducts]);

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        addProductToCart,
        updateProductQuantity,
        removeProductFromCart,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        totalPrice,
        order,
        setOrder
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

ShoppingCartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
