import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './utils/ProtecteRoutes';
import Login from './pages/Login';
import Header from './pages/Header';
import './icomoon/css/iconfont.css';
import './icomoon/css/iconfont.min.css';
import Home from './pages/Home';
import Footer from './pages/Footer';
import Products from './pages/Products';
import FinalizePurchase from './pages/FinalizePurchase';
import Register from './pages/Register';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DeliveryArea from './pages/DeliveryArea';
import MyProfile from './pages/MyProfile';
import Contacts from './pages/Contacts';
import ThankYou from './pages/ThankYou';
import ScrollToTop from './hooks/ScrollToTop';

function App() {
  const userDataJSON = localStorage.getItem('userData');
  const userStorage = JSON.parse(userDataJSON);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/client/${
      userStorage?.client?.id
    }`;

    if (userStorage) {
      axios
        .get(url)
        .then((res) => {
          const userDataJSON = JSON.stringify(res.data);
          localStorage.setItem('userData', userDataJSON);
        })

        .catch((err) => {
          console.log(err);
          localStorage.clear();
        });
    }
  }, [userDataJSON]);

  return (
    <div className="app_container">
      <ScrollToTop />
      <Header userData={userStorage?.client} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seccion/:id" element={<Products />} />
        <Route path="/zonas-de-reparto" element={<DeliveryArea />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contacts" element={<Contacts />} />

        <Route element={<ProtectedRoutes />}>
          <Route
            path="/finalizar-compra"
            element={<FinalizePurchase userData={userStorage?.client} />}
          />
          <Route
            path="/mi-perfil"
            element={<MyProfile userData={userStorage?.client} />}
          />
          <Route path="/thank-you" element={<ThankYou />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
