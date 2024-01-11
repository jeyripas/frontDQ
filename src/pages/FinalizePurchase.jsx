import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FPCardProduct from '../components/FinalizePurchase.jsx/FPCardProduct';
import './pagesStyle/finalizePurchase.css';
import FPDelivery from '../components/FinalizePurchase.jsx/FPDelivery';
import FPDataClient from '../components/FinalizePurchase.jsx/FPDataClient';

const FinalizePurchase = ({ userData }) => {
  const cartData = useSelector((state) => state.cart);

  const [selectDelivery, setselectDelivery] = useState();
  const [alertDelivery, setalertDelivery] = useState(false);
  const [buttonAnimation, setButtonAnimation] = useState(false);
  const [selectSlide, setselectSlide] = useState('dataOrder');
  const [dataClient, setdataClient] = useState();
  const [dataPay, setDataPay] = useState({});

  useEffect(() => {
    // Calcula la información detallada de cada producto
    const productsDetails = cartData.map((product) => ({
      dataProduct: product.product,
      counter: product.counter,
      selectOption: product.selectOption,
      selectExtra: product.selectExtra,
      price: calculatePrice(product),
      totalPrice: calculateTotalPrice(product),
    }));

    // Actualiza el estado dataPay con la información detallada de los productos
    setDataPay((prevData) => ({
      ...prevData,
      products: productsDetails,
      dataClient,
      delivery: selectDelivery,
      totalPrice: calculateTotal(),
    }));
  }, [cartData, dataClient, selectDelivery]);

  const calculatePrice = (product) => {
    const optionPrice = product?.priceDiscount || 0;
    const extraTotalPrice = product?.selectExtra?.reduce(
      (total, extra) => total + (extra.price || 0),
      0
    );
    return optionPrice + extraTotalPrice;
  };
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

  const calculateTotal = () => {
    const deliveryPrice = selectDelivery ? selectDelivery.price : 0;

    const total = (
      cartData.reduce(
        (subtotal, product) => subtotal + calculateTotalPrice(product),
        0
      ) + deliveryPrice
    ).toFixed(2);

    return total;
  };

  const nextSlide = () => {
    if (selectDelivery) {
      setselectSlide('dataClient');
    } else {
      setalertDelivery(true);
    }
  };

  return (
    <div className="finalizePurchase__container">
      <section className="finalizePurchase__title">
        <h1>Finalizar Compra</h1>
      </section>

      <div className="finalizePurchase__slideSections">
        <section
          className={`finalizePurchase__sectionOne ${
            selectSlide === 'dataOrder' ? 'finalizePurchase__activeSlide' : ''
          } `}
        >
          <h2>Resumen de tu Pedido:</h2>
          <div className="finalizePurchase__sectionOne__dataOrder">
            {cartData?.map((dataProduct, index) => (
              <FPCardProduct
                key={index}
                dataProduct={dataProduct}
                index={index}
              />
            ))}
            <FPDelivery
              setselectDelivery={setselectDelivery}
              selectDelivery={selectDelivery}
              alertDelivery={alertDelivery}
            />
            <div className="finalizePurchase__sectionOne__total">
              <h3>TOTAL: </h3>
              <p>s/{calculateTotal()}</p>
            </div>
            <div
              className="finalizePurchase__sectionOne__continue"
              onMouseEnter={() => setButtonAnimation(true)}
              onMouseLeave={() => setButtonAnimation(false)}
              onClick={nextSlide}
            >
              <p
                style={
                  buttonAnimation ? { transform: 'translatex(-100%)' } : {}
                }
              >
                CONTINUAR
              </p>
              <i
                className="bx bx-chevron-right"
                style={buttonAnimation ? { transform: 'translatex(-90%)' } : {}}
              ></i>
            </div>
          </div>
        </section>
        <FPDataClient
          calculateTotal={calculateTotal}
          userData={userData}
          selectSlide={selectSlide}
          setselectSlide={setselectSlide}
          setdataClient={setdataClient}
          dataPay={dataPay}
        />
        {/* <FPChekout /> */}
      </div>
    </div>
  );
};

export default FinalizePurchase;
