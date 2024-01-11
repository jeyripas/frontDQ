import React from 'react';
import { useDispatch } from 'react-redux';
import {
  decrementCounter,
  incrementCounter,
  removeProduct,
} from '../../store/Slices/Cart.slice';
import FormatPrice from '../../hooks/FormatPrice';
import './FinalizePurchaseStyle/FPCardProduct.css';

const FPCardProduct = ({ dataProduct, index }) => {
  const dispatch = useDispatch();

  const calculatePrice = (product) => {
    const optionPrice = product?.priceDiscount || 0;
    const extraTotalPrice = product?.selectExtra?.reduce(
      (total, extra) => total + (extra.price || 0),
      0
    );
    return optionPrice + extraTotalPrice;
  };

  const calculateSubTotalPrice = (product) => {
    const optionPrice = product?.priceDiscount || 0;
    const extraTotalPrice = product?.selectExtra?.reduce(
      (total, extra) => total + (extra.price || 0),
      0
    );
    const subtotal = (optionPrice + extraTotalPrice) * product?.counter;

    return subtotal.toFixed(2);
  };

  const handleRemoveProduct = () => {
    dispatch(removeProduct({ index }));
  };

  return (
    <article className="FPCardProduct__container">
      <div className="FPCardProduct__dataProduct">
        <img src={dataProduct?.product?.productImg} alt="" />
        <ul>
          <h3>{dataProduct?.product?.name}</h3>
          <li>
            {dataProduct?.selectOption?.name}:{dataProduct?.selectOption?.size}
          </li>
          {dataProduct?.selectExtra?.map((extra, index) => (
            <li key={index}>{extra.name}</li>
          ))}
        </ul>
      </div>

      <div className="FPCardProduct__pricesDelete">
        <div className="cartSectionOne__dataProduct__counter  FPCardProduct__dataProduct__counter">
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
        <div className="FPCardProduct__prices">
          <p>
            <span>PRECIO :</span> s/
            <FormatPrice price={calculatePrice(dataProduct)} />
          </p>
          <p>
            <span>SUB TOTAL:</span> s/
            <FormatPrice price={calculateSubTotalPrice(dataProduct)} />
          </p>
        </div>
        <i
          className="icon icon-trash FPCardProduct__deleteProduct"
          onClick={handleRemoveProduct}
        ></i>
      </div>
    </article>
  );
};

export default FPCardProduct;
