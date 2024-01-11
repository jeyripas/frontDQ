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
        <ul>
          <h3>{dataProduct?.product?.name}</h3>
          <li>
            {dataProduct?.selectOption?.name}:{dataProduct?.selectOption?.size}
          </li>
          {dataProduct?.selectExtra?.map((extra, index) => (
            <li key={index}>{extra.name}</li>
          ))}
        </ul>
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
