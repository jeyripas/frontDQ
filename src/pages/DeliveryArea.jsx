import React, { useEffect, useState } from 'react';
import './pagesStyle/deliveryArea.css';
import axios from 'axios';

const DeliveryArea = () => {
  const [allDelivery, setallDelivery] = useState();
  const [selectLinkMap, setselectLinkMap] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/delivery`;

    axios
      .get(url)
      .then((res) => {
        setallDelivery(res.data.deliveries);
        setselectLinkMap(res.data.deliveries[0].linkMap);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="deliveryArea__container">
      <section className="deliveryArea__sectionOne">
        <img src="./bg-reparto.jpg" alt="" />
        <span></span>
        <h1>Zonas de Reparto</h1>
        <p>
          Conoce las zonas de entrega y las tarifas exclusivas que tenemos para
          tí
        </p>
        <div className="deliveryArea__linksContainer">
          <ul>
            <li>
              <i className="bx bxs-map"></i>
              <a href="">Av. Micaela Bastidas Zn "F" Mz D Lt 5 Cieneguilla</a>
            </li>
            <li>
              <i className="bx bxs-phone"></i>
              <a href="">+51987407185</a>
            </li>
            <li>
              <i className="bx bxs-envelope"></i>
              <a href="">info@donquezo.com</a>
            </li>
          </ul>
          <div className="deliveryArea__linksContainer__reviews">
            <div className="deliveryArea__linksContainer__reviews__text">
              <h3>Excelente</h3>
              <p>Basado en 120 reviews</p>
            </div>
            <div className="deliveryArea__linksContainer__reviews__icon">
              <i className="bx bxs-star"></i>
              <p>4.9</p>
            </div>
          </div>
        </div>
      </section>
      <section className="deliveryArea__sectionTwo">
        <article className="deliveryArea__sectionTwo__articleOne">
          {allDelivery?.map((delivery) => (
            <p
              key={delivery.id}
              onClick={() => setselectLinkMap(delivery.linkMap)}
              style={
                selectLinkMap === delivery.linkMap
                  ? {
                      border: '1px solid var(--text-color-red)',
                      color: ' var(--text-color-red)',
                    }
                  : {}
              }
            >
              {delivery.name}
            </p>
          ))}
        </article>
        <article className="deliveryArea__sectionTwo__articleTwo">
          <iframe src={selectLinkMap} width="100%" height="100%"></iframe>
        </article>
      </section>
    </div>
  );
};

export default DeliveryArea;
