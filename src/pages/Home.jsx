import React, { useEffect, useState } from 'react';
import './pagesStyle/home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Splide, SplideSlide } from '@splidejs/react-splide';

// Default theme
import '@splidejs/react-splide/css';

// or other themes
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';

// or only core styles
import '@splidejs/react-splide/css/core';
const Home = () => {
  const [allSections, setallSections] = useState();
  const [viewWarning, setViewWarning] = useState(true);
  const [maxWindow, setMaxWindow] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setMaxWindow(true);
      } else {
        setMaxWindow(false);
      }
    };

    // Agregar el listener para el evento resize
    window.addEventListener('resize', handleResize);

    // Llama a handleResize una vez para establecer el valor inicial
    handleResize();

    // Eliminar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]); // Dependencia actualizada para que el efecto se vuelva a ejecutar cuando cambie el tamaño de la ventana

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/section-product`;

    axios.get(url).then((res) => setallSections(res.data.sectionProducts));
  }, []);

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

  const options = {
    type: 'loop',
    autoplay: true,
    pauseOnHover: false,
    resetProgress: false,
  };

  return (
    <div className="home__container">
      <section className="home__section__one">
        <Splide
          options={options}
          aria-labelledby="autoplay-example-heading"
          className="home__section__one home__section__carousel"
        >
          <SplideSlide>
            {maxWindow ? (
              <img src="./banner1.png" alt="fondo home Don Quezo" />
            ) : (
              <img src="./banner1Mobil.png" alt="fondo home Don Quezo" />
            )}
          </SplideSlide>
          <SplideSlide>
            {maxWindow ? (
              <img src="./banner2.png" alt="fondo home Don Quezo" />
            ) : (
              <img src="./banner2Mobil.png" alt="fondo home Don Quezo" />
            )}
          </SplideSlide>
          <SplideSlide>
            {maxWindow ? (
              <img src="./banner3.png" alt="fondo home Don Quezo" />
            ) : (
              <img src="./banner3Mobil.png" alt="fondo home Don Quezo" />
            )}
          </SplideSlide>
        </Splide>
      </section>

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
              {/* <img
                src={section.sectionIcon}
                width="64"
                height="64"
                alt="pizzas icono Don Quezo"
                className="home__section__three-articleTwo-icon"
              />
              <h3>{section.name}</h3> */}
            </Link>
          ))}
        </article>
      </section>
      <article className="home__section__three-articleThree">
        {maxWindow ? (
          <img src="/informacion.png" alt="Banner entrega a domicilio" />
        ) : (
          <img src="/informacionMobil.png" alt="Banner entrega a domicilio" />
        )}
      </article>
      <section
        className={`home__section__four ${
          viewWarning ? '' : 'home__closeSection__four'
        }`}
      >
        <article className="home__section__four__article">
          <p>Aviso</p>
          <img src="/homePop.png" alt="aviso de entrega" />
          <div>
            <span onClick={() => setViewWarning(false)}>Cerrar</span>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Home;
