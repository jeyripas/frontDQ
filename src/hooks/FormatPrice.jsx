const FormatPrice = ({ price }) => {
  function formatPrice(price) {
    if (Number.isInteger(price)) {
      return price.toFixed(2);
    } else {
      const decimalPart = price.toString().split('.')[1];
      return decimalPart && decimalPart.length === 1 ? price.toFixed(2) : price;
    }
  }

  // Ejecutar la función y devolver el resultado
  return formatPrice(price);
};

export default FormatPrice;
