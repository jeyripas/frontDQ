import './pagesStyle/cart.css';
import FormatPrice from '../hooks/FormatPrice';
import CartCardProduct from '../components/cart/CartCardProduct';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ openCart, cartData, setopenCart, userData }) => {
  const [buttonAnimation, setButtonAnimation] = useState(false);

  // Función para calcular el precio total de un producto en el carrito
  const calculateTotalPrice = (product) => {
    const optionPrice = product?.priceDiscount || 0;
    const extraTotalPrice = product?.selectExtra?.reduce(
      (total, extra) => total + (extra?.price || 0),
      0
    );
    const total = (optionPrice + extraTotalPrice) * product?.counter;

    return total;
  };

  const calculateCartTotal = () => {
    const subtotal = cartData.reduce(
      (total, product) => total + calculateTotalPrice(product),
      0
    );

    const roundedTotal = parseFloat(subtotal.toFixed(2));

    return roundedTotal;
  };

  return (
    <div className={`cart__container  ${openCart ? '' : 'closeCart'}`}>
      <section className="cart__sectionOne">
        {cartData?.map((dataProduct, index) => (
          <CartCardProduct
            key={index}
            dataProduct={dataProduct}
            index={index}
          />
        ))}
      </section>

      <section className="cart__sectionTwo">
        <article className="cartSectionTwo__articleOne">
          <p>TOTAL: </p>
          <span>
            s/
            <FormatPrice price={calculateCartTotal()} />
          </span>
        </article>
        {cartData?.length > 0 ? (
          <Link
            to={userData ? 'finalizar-compra' : 'log-in'}
            className="cartSectionTwo__articleTwo"
            onMouseEnter={() => setButtonAnimation(true)}
            onMouseLeave={() => setButtonAnimation(false)}
            onClick={() => setopenCart(false)}
          >
            <p
              style={buttonAnimation ? { transform: 'translatex(-100%)' } : {}}
            >
              continuar
            </p>
            <i
              className="bx bx-chevron-right"
              style={buttonAnimation ? { transform: 'translatex(-90%)' } : {}}
            ></i>
          </Link>
        ) : (
          <div
            className="cartSectionTwo__articleTwo"
            onMouseEnter={() => setButtonAnimation(true)}
            onMouseLeave={() => setButtonAnimation(false)}
            onClick={() => setopenCart(false)}
          >
            <p
              style={
                buttonAnimation
                  ? { transform: 'translatex(-120%)' }
                  : { textAlign: 'center' }
              }
            >
              El Carrito Esta Vacio
            </p>
            <i
              className="bx bx-chevron-right"
              style={buttonAnimation ? { transform: 'translatex(-90%)' } : {}}
            ></i>
          </div>
        )}
      </section>
    </div>
  );
};

export default Cart;
