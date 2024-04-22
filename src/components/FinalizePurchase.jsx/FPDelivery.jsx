import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormatPrice from '../../hooks/FormatPrice';
import './FinalizePurchaseStyle/FPDelivery.css';

const FPDelivery = ({ setselectDelivery, selectDelivery, alertDelivery }) => {
  const [allDeliveries, setallDeliveries] = useState();
  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/delivery`;

    axios.get(url).then((res) => setallDeliveries(res.data.deliveries));
  }, []);

  return (
    <section className="FPDelivery__container">
      <h3>Delivery</h3>
      {alertDelivery ? (
        <span className="FPDelivery__alertDelivery">
          Porfavor seleccione una opcion de delivery
        </span>
      ) : (
        ''
      )}
      {allDeliveries?.map((delivery) => (
        <article
          className="FPDelivery__cardDelivery"
          key={delivery.id}
          onClick={() => setselectDelivery(delivery)}
        >
          <div className="FPDeliveryCardDelivery__selectData">
            <span
              className="optionsProduct__sectionAticleTwo__optionCheckout"
              style={{ scale: '1.2' }}
            >
              <span
                className="pseudo-element"
                style={{
                  position: 'absolute',
                  content: "''",
                  backgroundColor:
                    selectDelivery?.id === delivery.id
                      ? 'var(--text-color-red)'
                      : 'transparent',
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                }}
              ></span>
            </span>
            <div className="FPDeliveryCardDelivery__selectDataName">
              <p>
                {delivery.name}: <span> {delivery.description}</span>
              </p>
              <p
                className="FPDeliveryCardDelivery__viewMap"
                onClick={() => window.open('/#/zonas-de-reparto', '_blank')}
              >
                ver mapa
              </p>
            </div>
          </div>
          <p>
            s/
            <FormatPrice price={delivery.price} />
          </p>
        </article>
      ))}
    </section>
  );
};

export default FPDelivery;
