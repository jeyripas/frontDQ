import React from 'react';
import './pagesStyle/contacts.css';

const Contacts = () => {
  return (
    <div className="contacts__container">
      <h1>Ubicanos</h1>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.046189381253!2d-76.82935532406492!3d-12.108990543064252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c14d5e5c690d%3A0x44a16768e5564ecb!2sDon%20Quezo%20Pizzas!5e0!3m2!1ses-419!2spe!4v1692556178326!5m2!1ses-419!2spe"
        width="100%"
        height="450"
        style={{ border: '0' }}
      ></iframe>
      <section className="contacts__sectionOne">
        <article className="contactsSectionOne__articleOne">
          <span></span>
        </article>

        <article className="contactsSectionOne__articleTwo">
          <h2>Detalle de contacto</h2>
          <p>Contáctanos</p>
        </article>
        <article className="contactsSectionOne__articleThree">
          <a>
            <i className="icon icon-map-marker"></i>
            <h3>Dirección</h3>
            <p>Av. Micaela Bastidas Zn "F" Mz D Lt 5 Cieneguilla</p>
          </a>
          <a>
            <i className="icon icon-email"></i>
            <h3>Correo</h3>
            <p>reservas@donquezo.com</p>
          </a>
          <a>
            <i className="icon icon-phone-handset"></i>
            <h3>Teléfono</h3>
            <p>+51987407185</p>
          </a>
        </article>
      </section>
    </div>
  );
};

export default Contacts;
