import React from 'react';
import { useDispatch } from 'react-redux';
import {
  decrementCounter,
  incrementCounter,
  removeProduct,
} from '../../store/Slices/Cart.slice';
import FormatPrice from '../../hooks/FormatPrice';
import './cartStyle/cartProduct.css';

const CartCardProduct = ({ dataProduct, index }) => {
  const dispatch = useDispatch();

  const calculateTotalPrice = (product) => {
    const optionPrice = product?.priceDiscount || 0;
    const extraTotalPrice = product?.selectExtra?.reduce(
      (total, extra) => total + (extra?.price || 0),
      0
    );

    const totalPrice = (optionPrice + extraTotalPrice) * product?.counter;

    // Redondea y limita a dos decimales
    return Number(totalPrice.toFixed(2));
  };

  const handleRemoveProduct = () => {
    dispatch(removeProduct({ index }));
  };

  return (
    <article className="cartSectionOne__article">
      <img src={dataProduct?.product?.productImg} alt="" />
      <div className="cartSectionOne__dataProduct">
        <div className="cartSectionOne__dataProductDiv">
          <h3>{dataProduct?.product?.name}</h3>
          <p>
            {dataProduct?.selectOption?.name}:{dataProduct?.selectOption?.size}
          </p>
          {dataProduct?.selectPizza?.map((pizza, index) => (
            <p key={index}>pizza: {pizza.name}</p>
          ))}
          <p>{dataProduct?.selectDrink?.name}</p>
          {dataProduct?.selectExtra?.map((extra, index) => (
            <p key={index}>{extra.name}</p>
          ))}
        </div>
        <div className="cartSectionOne__dataProduct__counter">
          <i
            className="bx bx-minus"
            onClick={() => dispatch(decrementCounter({ index }))}
          ></i>
          <span>{dataProduct?.counter}</span>
          <i
            className="bx bx-plus"
            onClick={() => dispatch(incrementCounter({ index }))}
          ></i>
        </div>
      </div>
      <div className="cartSectionOne__priceDeleteProduct">
        <p>
          s/
          <FormatPrice price={calculateTotalPrice(dataProduct)} />
        </p>
        <i className="icon icon-trash" onClick={handleRemoveProduct}></i>
      </div>
    </article>
  );
};

export default CartCardProduct;
