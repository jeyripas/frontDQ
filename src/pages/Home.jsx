import React, { useEffect, useRef, useState } from 'react';
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
  const splideRef = useRef();
  const [allSections, setallSections] = useState();
  const [viewWarning, setViewWarning] = useState(true);
  const [maxWindow, setMaxWindow] = useState(true);

  // console.log(splideRef.current.splide.Components.Arrows.arrows.next);

  useEffect(() => {
    if (splideRef.current) {
      // Accede al botón "next" del Splide
      const nextButton = splideRef.current.splide.Components.Arrows.arrows.next;

      // Crear el nuevo botón con el HTML proporcionado
      const newButtonHTML = `
      <button class="newButton_rigth" style="background: transparent;">
        <svg
            id="Capa_2"
            data-name="Capa 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 217.11 362.1"
          >
            <g id="Capa_1-2" data-name="Capa 1">
              <path d="M217.11,180.85c.02,10.8-3.83,19.8-11.67,27.33-10.44,10.03-20.55,20.4-30.87,30.56-22.22,21.88-44.48,43.71-66.71,65.58-16.13,15.88-32.24,31.78-48.34,47.69-15.06,14.87-39.96,13.07-52.46-3.81-10.36-13.99-9.11-33.12,3.22-45.38,18.92-18.8,38-37.44,56.98-56.17,10.03-9.9,19.98-19.87,30.01-29.77,11.1-10.95,22.25-21.84,33.38-32.77,.39-.39,.71-.86,1.14-1.2,1.76-1.42,1.38-2.59-.12-4.05-8.91-8.66-17.75-17.39-26.6-26.11-21.71-21.38-43.4-42.78-65.11-64.16-9.92-9.78-20-19.4-29.72-29.37C.5,49.22-2.37,37.14,1.97,23.93,6.35,10.61,15.93,2.64,29.83,.46c11.54-1.81,21.59,1.72,29.93,9.9,14.86,14.57,29.7,29.16,44.52,43.77,11.94,11.78,23.83,23.62,35.77,35.4,21.46,21.18,42.85,42.43,64.47,63.44,6.43,6.25,10.88,13.3,12.19,22.2,.27,1.87,.28,3.78,.41,5.67Z" />
            </g>
          </svg>
        </button>
      `;

      // Reemplazar el contenido del botón "next" con el nuevo HTML
      nextButton.innerHTML = newButtonHTML;
    }
  }, []);

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
      {/* <button className="newButton_rigth">
        <svg
          id="Capa_2"
          data-name="Capa 2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 217.11 362.1"
        >
          <g id="Capa_1-2" data-name="Capa 1">
            <path d="M217.11,180.85c.02,10.8-3.83,19.8-11.67,27.33-10.44,10.03-20.55,20.4-30.87,30.56-22.22,21.88-44.48,43.71-66.71,65.58-16.13,15.88-32.24,31.78-48.34,47.69-15.06,14.87-39.96,13.07-52.46-3.81-10.36-13.99-9.11-33.12,3.22-45.38,18.92-18.8,38-37.44,56.98-56.17,10.03-9.9,19.98-19.87,30.01-29.77,11.1-10.95,22.25-21.84,33.38-32.77,.39-.39,.71-.86,1.14-1.2,1.76-1.42,1.38-2.59-.12-4.05-8.91-8.66-17.75-17.39-26.6-26.11-21.71-21.38-43.4-42.78-65.11-64.16-9.92-9.78-20-19.4-29.72-29.37C.5,49.22-2.37,37.14,1.97,23.93,6.35,10.61,15.93,2.64,29.83,.46c11.54-1.81,21.59,1.72,29.93,9.9,14.86,14.57,29.7,29.16,44.52,43.77,11.94,11.78,23.83,23.62,35.77,35.4,21.46,21.18,42.85,42.43,64.47,63.44,6.43,6.25,10.88,13.3,12.19,22.2,.27,1.87,.28,3.78,.41,5.67Z" />
          </g>
        </svg>
      </button> */}
      <section className="home__section__one">
        <Splide
          ref={splideRef}
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
