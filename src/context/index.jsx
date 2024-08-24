import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  // ShoppingCart . Quantity
  const [count, setCount] = useState(0);
  // ShoppingCart . AddProductsToCart
  const [cartProducts, setCartProducts] = useState([]);

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
    openCheckoutSideMenu();
  };

  // Update product quantity
  const updateProductQuantity = (id, quantity) => {
    setCartProducts((prevProducts) => {
      return prevProducts.map((product) =>
        product.id === id ? { ...product, quantity } : product
      );
    });
  };

  // Remove product from cart
  const removeProductFromCart = (id) => {
    setCartProducts((prevProducts) => {
      return prevProducts.filter((product) => product.id !== id);
    });
  };

  // Calculate total count
  useEffect(() => {
    const totalCount = cartProducts.reduce(
      (total, product) => total + product.quantity,
      0
    );
    setCount(totalCount);
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
        addProductToCart,
        updateProductQuantity,
        removeProductFromCart,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

ShoppingCartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
