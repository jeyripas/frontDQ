import React, { useEffect, useState } from 'react';
import './pagesStyle/home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        {window.innerWidth > 800 ? (
          <img src="./portada.jpg" alt="fondo home Don Quezo" />
        ) : (
          <img src="./portadaMobil.jpg" alt="fondo home Don Quezo" />
        )}

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
                className="home__section__three-articleTwo-imgbackground"
              />
              <img
                src={section.sectionIcon}
                width="64"
                height="64"
                alt="pizzas icono Don Quezo"
                className="home__section__three-articleTwo-icon"
              />
              <h3>{section.name}</h3>
            </Link>
          ))}
        </article>
        <article className="home__section__three-articleThree">
          {' '}
          <img src="/informacion.png" alt="Banner entrega a domicilio" />
          <div>
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
          <button
            id="al"
            aria-label="Name"
            onClick={() => setViewWarning(false)}
          ></button>
          <p>Aviso</p>
          <img src="/banner-aviso-inicio.png" alt="aviso de entrega" />
          <div>
            <span onClick={() => setViewWarning(false)}>Cerrar</span>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Home;
