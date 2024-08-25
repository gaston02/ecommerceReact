/**
 * This function calculates the total price of a new order
 * @param {Array} products cartProduct: Array of Objects
 * @returns {number} Total Price with maximum 2 decimal places
 */
export const totalPriceCart = (products) => {
  let sum = 0;
  //products.forEach((product) => (sum += product.price));
  console.log(products);

  // Ensure the result has a maximum of 2 decimal places
  return parseFloat(sum.toFixed(2));
};
