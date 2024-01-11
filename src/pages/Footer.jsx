import React from 'react';
import { Link } from 'react-router-dom';
import './pagesStyle/footer.css';

const Footer = () => {
  return (
    <footer className="footer__contianer">
      <div className="footer__divOne">
        <section className="footer__divOne-sectionOne">
          <h5>Menu Links</h5>
          <ul>
            <li>
              <i className="bx bx-chevron-right"></i>
              <Link>Inicio</Link>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
              <Link>FAQ</Link>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
              <Link>Contacto</Link>
            </li>
          </ul>
        </section>
        <section className="footer__divOne-sectionTwo">
          <h5>Contacto</h5>
          <ul>
            <li>
              <i className="icon icon-map-marker"></i>
              <a
                href="https://goo.gl/maps/95q99GHCUrj966iVA"
                className="footer-link"
                target="_blank"
              >
                Dirección: Av. Micaela Bastidas Zn "F" Mz D Lt 5
                Cieneguilla
              </a>
            </li>
            <li>
              <i className="icon icon-envelope3"></i>
              <a
                href="mailto:ventas@donquezo.com"
                className="footer-link"
              >
                Correo: ventas@donquezo.com
              </a>
            </li>
            <li>
              <i className="icon icon-phone2"></i>
              <a href="tel:+51987407185" className="footer-link">
                Teléfono: +51987407185
              </a>
            </li>
          </ul>
        </section>
        <section className="footer__divOne-sectionThree">
          <h5>Síguenos en:</h5>
          <ul>
            <li>
              <a
                href="https://www.facebook.com/donquezopizzas"
                className="social-link"
                target="_blank"
              >
                <i className="icon icon-facebook"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/donquezo_pizzas/"
                className="social-link"
                target="_blank"
              >
                <i className="icon icon-instagram"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@donquezopizzas"
                className="social-link"
                target="_blank"
              >
                <i className="bx bxl-tiktok"></i>
              </a>
            </li>
          </ul>
        </section>
      </div>
      <div className="footer__divTwo">
        <hr />
        <section>
          <article>
            <a href="https://idotcode.com" target="_blank">
              con
              <i className="bx bxs-heart"></i>
              by IdotCode
            </a>
          </article>
          <article>© 2023 Don Quezo</article>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
