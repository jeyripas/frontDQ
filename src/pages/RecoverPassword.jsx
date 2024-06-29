import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './pagesStyle/RecoverPassword.css';
import axios from 'axios';

const RecoverPassword = () => {
  const { register, handleSubmit, reset } = useForm();
  const [error, seterror] = useState();
  const [sendEmail, setsendEmail] = useState();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/client/link-password`;

    axios
      .post(url, data)
      .then((res) => {
        setsendEmail(res.data.client);
      })

      .catch((err) => {
        console.log(err.response);
        seterror(err.response.data.error);
      });
  };

  return (
    <div className="RecoverPassword__container">
      <h1>RECUPERA TU CONTRASEÑA</h1>
      <div>
        {sendEmail ? (
          <section>
            Se envio un link de recuperacion de contraseña a su correo{' '}
            <span>{sendEmail?.email}</span>
          </section>
        ) : (
          <form
            className="RecoverPassword__form"
            onSubmit={handleSubmit(submit)}
          >
            <div>
              <label htmlFor="email">Ingrese su Correo</label>
              <input
                {...register('email')}
                id="email"
                type="email"
                required
                placeholder="email"
              />
            </div>
            {error && <span>{error}</span>}
            <button type="submit">Recuperar Contraseña</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecoverPassword;
