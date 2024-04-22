import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './pagesStyle/login.css';
import { useState } from 'react';

const Register = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const navigate = useNavigate();
  const [error, seterror] = useState();
  const [errorPassword, seterrorPassword] = useState();

  const password = watch('password');
  const repeatedPassword = watch('repeatPassword');

  const submit = (data) => {
    if (password === repeatedPassword) {
      const url = `${import.meta.env.VITE_URL_API}/client/signup`;

      axios
        .post(url, data)
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          const userDataJSON = JSON.stringify(res.data);
          localStorage.setItem('userData', userDataJSON);
          navigate('/');
          window.location.reload();
        })

        .catch((err) => {
          seterror(err.response.data);
        });
    } else {
      seterrorPassword('Las contraseñas no coinciden');
    }
  };

  const soloNumerosYSimbolos = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    // Permitir números del 0 al 9 (48-57), y algunos signos de puntuación comunes
    if (
      (charCode >= 48 && charCode <= 57) || // Números
      (charCode >= 33 && charCode <= 47) || // Signos de puntuación (!"#$%&'()*+,-./)
      (charCode >= 58 && charCode <= 64) || // Signos de puntuación (:;<=>?@)
      (charCode >= 91 && charCode <= 96) || // Signos de puntuación ([\]^_`)
      (charCode >= 123 && charCode <= 126) || // Signos de puntuación ({|}~)
      charCode === 32 || // Espacio
      charCode === 8 // Tecla de retroceso
    ) {
      return true;
    } else {
      event.preventDefault();
    }
  };

  return (
    <div className="longin__container">
      <section className="longin__section">
        <img src="/logo.svg" alt="" />
        <h2>REGISTRARME</h2>
        <form className="login__form" onSubmit={handleSubmit(submit)}>
          {error ? (
            <span>El Correo o el DNI ya se encuantran registrado</span>
          ) : (
            ''
          )}
          <div className="login__div">
            <label htmlFor="name">
              <i className="bx bxs-user"></i>
            </label>
            <input
              {...register('name')}
              id="name"
              type="text"
              required
              placeholder="Nombres"
            />
          </div>
          <div className="login__div">
            <label htmlFor="lastName">
              <i className="bx bxs-user-detail"></i>
            </label>
            <input
              {...register('lastName')}
              id="lastName"
              type="text"
              required
              placeholder="Apellidos"
            />
          </div>
          <div className="login__div">
            <label htmlFor="email">
              <i className="bx bxs-envelope"></i>
            </label>
            <input
              {...register('email')}
              id="email"
              type="email"
              required
              placeholder="Correo electronico"
            />
          </div>
          <div className="login__div" style={{ width: '47%' }}>
            <label htmlFor="dni">
              <i className="bx bxs-user-badge"></i>
            </label>
            <input
              {...register('dni')}
              id="dni"
              type="text"
              onInput={(e) => (e.target.value = e.target.value.slice(0, 8))}
              onKeyPress={soloNumerosYSimbolos}
              required
              placeholder="DNI"
            />
          </div>
          <div className="login__div" style={{ width: '47%' }}>
            <label htmlFor="phoneNumber">
              <i className="bx bxs-phone"></i>
            </label>
            <input
              {...register('phoneNumber')}
              id="phoneNumber"
              type="text"
              onKeyPress={soloNumerosYSimbolos}
              required
              placeholder="Celular"
            />
          </div>
          <div className="login__div" style={{ marginTop: '20px' }}>
            <p style={{ fontSize: '14px', left: '0' }}>Cumpleaños</p>
            <label htmlFor="date">
              <i className="bx bxs-calendar"></i>
            </label>
            <input {...register('date')} id="date" type="date" required />
          </div>
          <div className="login__div">
            <label htmlFor="address">
              <i className="bx bxs-map"></i>
            </label>
            <input
              {...register('address')}
              id="address"
              type="text"
              required
              placeholder="Dirección"
            />
          </div>
          <div className="login__div">
            <label htmlFor="password">
              <i className="icon icon-padlock-1"></i>
            </label>
            <input
              {...register('password')}
              id="password"
              type="password"
              placeholder="Contraseña"
              minLength={6}
              required
            />
          </div>
          {errorPassword ? (
            <span style={{ margin: '-0.5em' }}>{errorPassword}</span>
          ) : (
            ''
          )}
          <div className="login__div">
            <label htmlFor="repeatPassword">
              <i className="icon icon-padlock-1"></i>
            </label>
            <input
              {...register('repeatPassword')}
              id="repeatPassword"
              type="password"
              placeholder="Repita su contraseña"
              minLength={6}
              required
            />
          </div>

          <button>Registrarme</button>
        </form>

        <article className="longinSection__article">
          <span>¿Ya cuentas con una cuenta ?</span>
          <p onClick={() => navigate('/log-in')}>Iniciar sesión</p>
        </article>
      </section>
    </div>
  );
};

export default Register;
