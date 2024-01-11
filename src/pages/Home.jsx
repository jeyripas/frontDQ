import React, { useEffect, useState } from 'react';
import './pagesStyle/home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ScrollToTop from '../hooks/ScrollToTop';
const Home = () => {
  const [allSections, setallSections] = useState();
  const [viewWarning, setViewWarning] = useState(true);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/section-product`;

    axios
      .get(url)
      .then((res) => setallSections(res.data.sectionProducts))
      .catch((err) => console.log(err));
  }, []);

  const clickTop = () => {
    const element = document.getElementById('home__section__three');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const closeWarningOnOutsideClick = (event) => {
      if (!event.target.closest('.home__section__four__article')) {
        setViewWarning(false);
      }
    };

    document.addEventListener('click', closeWarningOnOutsideClick);

    return () => {
      document.removeEventListener('click', closeWarningOnOutsideClick);
    };
  }, []);

  return (
    <div className="home__container">
      <section className="home__section__one">
        <span></span>
        <img src="./bg.svg" alt="fondo home Don Quezo" />
        <h1>DON QUEZO</h1>
        <p>
          La Felicidad hecha Pizza. Rápido, seguro y cumpliendo todos los
          protocolos de bioseguridad..
        </p>
        <Link to="/">Pide aquí</Link>
      </section>
      <section className="home__section__two" onClick={clickTop}></section>
      <section className="home__section__three" id="home__section__three">
        <article className="home__section__three-articleOne">
          <div className="home__section__three-line"></div>
          <h2>Ordenar Pizza</h2>
          <p>Elegir entre pizzas, combos ,bebidas</p>
        </article>

        <article className="home__section__three-articleTwo">
          {allSections?.map((section) => (
            <Link to={`/seccion/${section.id}`} key={section.id}>
              <span></span>
              <img
                src={section.sectionProductImg}
                alt="pizzas Don Quezo"
                loading="lazy"
                className="home__section__three-articleTwo-imgbackground"
              />
              <img
                src={section.sectionIcon}
                alt=""
                loading="lazy"
                className="home__section__three-articleTwo-icon"
              />
              <h3>{section.name}</h3>
            </Link>
          ))}
        </article>
        <article className="home__section__three-articleThree">
          <img src="/bg-banner.jpg" alt="" />
          <div>
            <small>ENTREGA A DOMICILIO</small>
            <h2>Don Quezo</h2>
            <p>Te quitamos las dudas. Entra aquí:</p>
            <Link>Preguntas más frecuentes</Link>
          </div>
        </article>
      </section>
      <section
        className={`home__section__four ${
          viewWarning ? '' : 'home__closeSection__four'
        }`}
      >
        <article className="home__section__four__article">
          <button onClick={() => setViewWarning(false)}></button>
          <h5>Aviso</h5>
          <img src="/banner-aviso-inicio.png" alt="aviso de entrega" />
          <div>
            <p onClick={() => setViewWarning(false)}>Cerrar</p>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Home;
