import React, { useEffect, useState } from 'react';
import './pagesStyle/home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [allSections, setallSections] = useState();
  const [viewWarning, setViewWarning] = useState(true);
  const [viewSlideImg, setviewSlideImg] = useState(1);
  const [playSlide, setplaySlide] = useState(true);
  console.log(playSlide);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/section-product`;

    axios
      .get(url)
      .then((res) => setallSections(res.data.sectionProducts))
      .catch((err) => console.log(err));
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

  setTimeout(() => {
    if (playSlide === true) {
      setviewSlideImg(viewSlideImg < 5 ? viewSlideImg + 1 : 1);
    }
  }, 3000);

  return (
    <div className="home__container">
      <section className="home__section__one">
        <article className="home__section__carousel">
          <i
            class="bx bx-chevron-left carrusel__left"
            onClick={() => {
              setplaySlide(false),
                setviewSlideImg(viewSlideImg > 1 ? viewSlideImg - 1 : 5);
            }}
          ></i>
          <div style={viewSlideImg === 1 ? { opacity: '1' } : { opacity: '0' }}>
            {window.innerWidth > 800 ? (
              <img src="./banner1.png" alt="fondo home Don Quezo" />
            ) : (
              <img src="./banner1.png" alt="fondo home Don Quezo" />
            )}
          </div>
          <div style={viewSlideImg === 2 ? { opacity: '1' } : { opacity: '0' }}>
            {window.innerWidth > 800 ? (
              <img src="./banner2.png" alt="fondo home Don Quezo" />
            ) : (
              <img src="./banner2.png" alt="fondo home Don Quezo" />
            )}
          </div>
          <div style={viewSlideImg === 3 ? { opacity: '1' } : { opacity: '0' }}>
            {window.innerWidth > 800 ? (
              <img src="./banner3.png" alt="fondo home Don Quezo" />
            ) : (
              <img src="./banner3.png" alt="fondo home Don Quezo" />
            )}
          </div>
          <div style={viewSlideImg === 4 ? { opacity: '1' } : { opacity: '0' }}>
            {window.innerWidth > 800 ? (
              <img src="./banner4.png" alt="fondo home Don Quezo" />
            ) : (
              <img src="./banner4.png" alt="fondo home Don Quezo" />
            )}
          </div>
          <div style={viewSlideImg === 5 ? { opacity: '1' } : { opacity: '0' }}>
            {window.innerWidth > 800 ? (
              <img src="./banner6.png" alt="fondo home Don Quezo" />
            ) : (
              <img src="./banner6.png" alt="fondo home Don Quezo" />
            )}
          </div>
          <i
            class="bx bx-chevron-right carrusel__right"
            onClick={() => {
              setplaySlide(false),
                setviewSlideImg(viewSlideImg < 5 ? viewSlideImg + 1 : 1);
            }}
          ></i>
        </article>

        <article className="carusel__pin">
          <span
            onClick={() => {
              setplaySlide(false), setviewSlideImg(1);
            }}
            style={viewSlideImg === 1 ? { backgroundColor: 'white' } : null}
          ></span>
          <span
            onClick={() => {
              setplaySlide(false), setviewSlideImg(2);
            }}
            style={viewSlideImg === 2 ? { backgroundColor: 'white' } : null}
          ></span>
          <span
            onClick={() => {
              setplaySlide(false), setviewSlideImg(3);
            }}
            style={viewSlideImg === 3 ? { backgroundColor: 'white' } : null}
          ></span>
          <span
            onClick={() => {
              setplaySlide(false), setviewSlideImg(4);
            }}
            style={viewSlideImg === 4 ? { backgroundColor: 'white' } : null}
          ></span>
          <span
            onClick={() => {
              setplaySlide(false), setviewSlideImg(5);
            }}
            style={viewSlideImg === 5 ? { backgroundColor: 'white' } : null}
          ></span>
        </article>
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
          {window.innerWidth > 800 ? (
            <img src="/informacion.png" alt="Banner entrega a domicilio" />
          ) : (
            <img src="/informacion.png" alt="Banner entrega a domicilio" />
          )}
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
