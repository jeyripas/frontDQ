import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './pagesStyle/header.css';
import Cart from './Cart';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Header = ({ userData }) => {
  const cartData = useSelector((state) => state.cart);
  const [openCart, setopenCart] = useState(false);
  const [allSections, setallSections] = useState();
  const [openSections, setopenSections] = useState(false);
  const [openPerfil, setopenPerfil] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/section-product`;

    axios
      .get(url)
      .then((res) => setallSections(res.data.sectionProducts))
      .catch((err) => console.log(err));
  }, []);

  const onclickCloseMenu = () => {
    setOpenMenu(false);
  };

  return (
    <header className="header__container">
      <div className="header__divContainer">
        <Link className="header__logoImg" to="/" onClick={onclickCloseMenu}>
          <img src="./logo.svg" alt="logo DonQuezo" />
        </Link>
        <ul className={`header__ul ${openMenu ? '' : 'header__closeUl'}`}>
          <li>
            <Link to="/" onClick={onclickCloseMenu}>
              Inicio
            </Link>
          </li>

          <li
            className={`header__liSections  ${
              !openSections ? '' : 'header__closeLiSections'
            }`}
            onMouseEnter={() => setopenSections(true)}
            onMouseLeave={() => setopenSections(false)}
            onClick={() => setopenSections(!openSections)}
          >
            <p>
              Secciones <i className="bx bx-chevron-down"></i>
            </p>
            <div
              className={`header__liSections__div  ${
                openSections ? '' : 'header__liSections__closeSections'
              }`}
            >
              {allSections?.map((section) => (
                <Link
                  key={section.id}
                  to={`/seccion/${section.id}`}
                  onClick={onclickCloseMenu}
                >
                  {section.name} <i className="bx bx-chevron-right"></i>
                </Link>
              ))}
            </div>
          </li>
          <li>
            <Link to="/zonas-de-reparto" onClick={onclickCloseMenu}>
              Zonas de Reparto
            </Link>
          </li>
          <li>
            <Link to="/contacts" onClick={onclickCloseMenu}>
              Contacto
            </Link>
          </li>
          <li>
            <a href="tel:+51987407185">
              <i className="icon icon-support"></i>
            </a>
          </li>
        </ul>
        <article
          className="header__cart"
          onClick={() => setopenCart(!openCart)}
        >
          <i className="icon icon-shopping-cart2"></i>
          <span className="header__cartCounter">{cartData?.length}</span>
        </article>
        <article
          className="header__profile"
          onMouseEnter={() => setopenPerfil(true)}
          onMouseLeave={() => setopenPerfil(false)}
          onClick={() => setopenPerfil(!openPerfil)}
        >
          {!userData ? (
            <i className="icon icon-user"></i>
          ) : (
            <img src={userData?.clientImg} alt="" />
          )}
          {userData ? (
            <div
              className={`header__profile__div  ${
                openPerfil ? '' : 'header__closeProfile'
              }`}
            >
              <Link to={`/mi-perfil`} onClick={onclickCloseMenu}>
                Ver Perfil <i className="bx bx-chevron-right"></i>
              </Link>
              <Link
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                  onclickCloseMenu();
                }}
              >
                Cerrar Sesión <i className="bx bx-chevron-right"></i>
              </Link>
            </div>
          ) : (
            <div
              className={`header__profile__div  ${
                openPerfil ? '' : 'header__closeProfile'
              }`}
            >
              <Link to={`/log-in`} onClick={onclickCloseMenu}>
                Ingresar <i className="bx bx-chevron-right"></i>
              </Link>
              <Link to={`/register`} onClick={onclickCloseMenu}>
                Registrame <i className="bx bx-chevron-right"></i>
              </Link>
            </div>
          )}
        </article>
        <article
          className={`header__menu  ${!openMenu ? '' : 'header__closeMenu'}`}
          onClick={() => setOpenMenu(!openMenu)}
        >
          <span></span>
          <span></span>
          <span></span>
        </article>
      </div>
      <Cart
        setopenCart={setopenCart}
        openCart={openCart}
        cartData={cartData}
        userData={userData}
      />
    </header>
  );
};

export default Header;
