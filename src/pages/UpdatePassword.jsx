import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdatePassword = () => {
  const { register, handleSubmit, reset, watch } = useForm();

  const { clientId, code } = useParams();
  const [passwordUpdate, setpasswordUpdate] = useState(false);
  const [errorPassword, seterrorPassword] = useState();
  const [error, seterror] = useState();

  const password = watch('newPassword');
  const repeatedPassword = watch('repeatPassword');

  const submit = (data) => {
    if (password === repeatedPassword) {
      seterrorPassword();

      const url = `${
        import.meta.env.VITE_URL_API
      }/client/${clientId}/code/${code}`;

      axios
        .post(url, data)
        .then((res) => {
          setpasswordUpdate(true);
        })

        .catch((err) => {
          seterror(err.response.data.error);
        });
    } else {
      seterrorPassword('Las contraseñas no coinciden');
    }
  };

  return (
    <div className="RecoverPassword__container">
      <h1>CAMBIA TU CONTRASEÑA</h1>
      <div>
        {passwordUpdate ? (
          <section>
            La contraseña se actualizo correctamente{' '}
            <Link to="/log-in">INICIAR SESION</Link>
          </section>
        ) : (
          <section className="longin__section">
            <img src="/logo.svg" alt="" />
            <h2 style={{ textAlign: 'center' }}>INGRESE SU NUEVA CONTRASEÑA</h2>
            <form className="login__form" onSubmit={handleSubmit(submit)}>
              <div className="login__div">
                <label htmlFor="newPassword">
                  <i className="icon icon-padlock-1"></i>
                </label>
                <input
                  {...register('newPassword')}
                  id="newPassword"
                  type="password"
                  placeholder="Nueva Contraseña"
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
                  placeholder="repita su contraseña"
                  minLength={6}
                  required
                />
              </div>
              {error && <span>{error}</span>}
              <button type="submit">Recuperar Contraseña</button>
            </form>
          </section>
        )}
      </div>
    </div>
  );
};

export default UpdatePassword;
