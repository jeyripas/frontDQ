import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './pagesStyle/login.css';
import { useState } from 'react';

const Login = ({}) => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [error, seterror] = useState();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/client/login`;

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
        console.log(err);
      });
  };

  return (
    <div className="longin__container">
      <section className="longin__section">
        <img src="/logo.svg" alt="" />
        <h2>INICIAR SESION</h2>
        <form className="login__form" onSubmit={handleSubmit(submit)}>
          <div className="login__div">
            <label htmlFor="email">
              <i className="bx bxs-user"></i>
            </label>
            <input
              {...register('email')}
              id="email"
              type="email"
              required
              placeholder="Correo electronico"
            />
          </div>

          {error?.error === 'Email no found' ? (
            <span>
              El correo electrónico no se encuetra registrado, por favor
              registrese
            </span>
          ) : (
            ''
          )}

          <div className="login__div">
            <label htmlFor="password">
              <i className="icon icon-padlock-1"></i>
            </label>
            <input
              {...register('password')}
              id="password"
              type="password"
              placeholder="Contraseña"
              required
            />
          </div>

          {error?.error === 'Password incorrect' ? (
            <span>La contraseña es incorrecta</span>
          ) : (
            ''
          )}

          <button>Iniciar Sesión</button>
        </form>

        <article className="longinSection__article">
          <span>¿No tienes una cuenta?</span>
          <p onClick={() => navigate('/register')}>Registrate</p>
        </article>
      </section>
    </div>
  );
};

export default Login;
