import React from 'react';
import './pagesStyle/thankYou.css';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  const dataPayJSON = localStorage.getItem('dataPay');
  const dataPayStorage = JSON.parse(dataPayJSON);

  return (
    <div className="thankYou__container">
      <h1>Orden Confirmada</h1>
      <section className="thankYou__sectionOne">
        <h2>Gracias por realizar tu pedido:</h2>
        <img src="/logo.svg" alt="" />
      </section>
      <section className="thankYou__sectionTwo">
        <h3>Detalle del pedido</h3>
        <table className="thankYou__sectionTwo__table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {dataPayStorage?.products.map((product, index) => (
              <tr key={index} className="excel-row">
                <td>
                  {product.dataProduct.name} {product.selectOption.name}{' '}
                  {product.selectOption.size},{' '}
                  {product.selectExtra.map((extra) => extra.name)}
                </td>
                <td>{product.counter}</td>
                <td>s/{product.price}</td>
                <td>s/{product.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <article className="thankYou__sectionTwo__article">
          <div>
            <p>Delivery</p>
            <p className="thankYou__sectionTwo__article-p">
              s/{dataPayStorage?.delivery.price}
            </p>
          </div>
          <div>
            <p>TOTAL</p>
            <p className="thankYou__sectionTwo__article-p">
              s/{dataPayStorage?.totalPrice}
            </p>
          </div>
        </article>
        <Link to="/" className="thankYou__sectionTwo__clickHome">
          Regresar al inicio
        </Link>
      </section>
    </div>
  );
};

export default ThankYou;
