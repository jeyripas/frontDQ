import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './FinalizePurchaseStyle/FPDataClient.css';
import axios from 'axios';
import config from '../../utils/getToken';
import { clearCart } from '../../store/Slices/Cart.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FPDataClient = ({
  calculateTotal,
  userData,
  selectSlide,
  setselectSlide,
  setdataClient,
  dataPay,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [buttonAnimation, setButtonAnimation] = useState(false);
  const [backButtonAnimation, setbackButtonAnimation] = useState(false);
  const [inputsLength, setInputsLength] = useState({});
  const [acceptTerms, setacceptTerms] = useState(false);
  const [alertAceepTerms, setalertAceepTerms] = useState();

  const handleInputChange = (fieldName, value) => {
    setInputsLength({ ...inputsLength, [fieldName]: value.length });
  };

  const saveDataClient = async (data) => {
    await setdataClient(data);
    if (data) {
      setacceptTerms(!acceptTerms);
    }
    setalertAceepTerms();
  };

  const postOrden = () => {
    if (acceptTerms) {
      const url = `${import.meta.env.VITE_URL_API}/client-order/${userData.id}`;

      axios
        .post(url, dataPay, config)
        .then((res) => {
          const userDataJSON = JSON.stringify(dataPay);
          localStorage.setItem('dataPay', userDataJSON);
          dispatch(clearCart());
          navigate('/thank-you');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setalertAceepTerms(
        'Para continuar por favor acepte los Términos y Condiciones'
      );
    }
  };

  return (
    <section
      className={`finalizePurchase__sectionOne ${
        selectSlide === 'dataClient' ? 'finalizePurchase__activeSlide' : ''
      } `}
    >
      <h2>Resumen de tu Pedido:</h2>
      <div className="finalizePurchase__sectionOne__dataOrder">
        <form
          action=""
          className="FPDataClient__form"
          onSubmit={handleSubmit(saveDataClient)}
        >
          <div className="FPDataClient__form__div">
            <label
              htmlFor="name"
              className={` FPDataClient__form__label FPDataClient__form__labelAnimation `}
            >
              Nombre y Apellidos
            </label>
            <input
              {...register('name')}
              name="name"
              id="name"
              type="text"
              defaultValue={`${userData?.name} ${userData?.lastName}`}
              required
            />
          </div>
          <div className="FPDataClient__form__div">
            <label
              htmlFor="phoneNumber"
              className={` FPDataClient__form__label FPDataClient__form__labelAnimation `}
            >
              Celular
            </label>
            <input
              {...register('phoneNumber')}
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              defaultValue={userData?.phoneNumber}
              required
            />
          </div>

          <div className="FPDataClient__form__div">
            <label
              htmlFor="email"
              className={` FPDataClient__form__label FPDataClient__form__labelAnimation `}
            >
              Correo
            </label>
            <input
              {...register('email')}
              name="email"
              id="email"
              type="email"
              defaultValue={userData?.email}
              required
            />
          </div>
          <div className="FPDataClient__form__div">
            <label
              htmlFor="address"
              className={` FPDataClient__form__label ${
                inputsLength?.address > 0
                  ? 'FPDataClient__form__labelAnimation'
                  : ''
              }`}
            >
              Dirección
            </label>
            <input
              {...register('address')}
              name="address"
              id="address"
              type="text"
              onChange={(e) => handleInputChange('address', e.target.value)}
              required
            />
          </div>
          <div className="FPDataClient__form__div">
            <label
              htmlFor="reference"
              className={` FPDataClient__form__label ${
                inputsLength?.reference > 0
                  ? 'FPDataClient__form__labelAnimation'
                  : ''
              }`}
            >
              Referencia
            </label>
            <input
              {...register('reference')}
              name="reference"
              id="reference"
              type="text"
              onChange={(e) => handleInputChange('reference', e.target.value)}
              required
            />
          </div>
          <div className="FPDataClient__form__div">
            <label
              htmlFor="message"
              className={` FPDataClient__form__label ${
                inputsLength?.message > 0
                  ? 'FPDataClient__form__labelAnimation'
                  : ''
              }`}
            >
              Mensaje
            </label>
            <input
              {...register('message')}
              name="message"
              id="message"
              type="text"
              onChange={(e) => handleInputChange('message', e.target.value)}
              required
            />
          </div>
          <div className="finalizePurchase__sectionOne__total">
            <h3>TOTAL: </h3>
            <p>s/{calculateTotal()}</p>
          </div>
          {alertAceepTerms ? (
            <span className="FPDataClient__alertAcceptTerms">
              {alertAceepTerms}
            </span>
          ) : (
            ''
          )}
          <button className="FPDataClient__acceptTerms" type="submit">
            <article className="FPDataClient__acceptTerms__article">
              <span
                className="optionsProduct__sectionAticleTwo__extraCheckout"
                style={{
                  backgroundColor: acceptTerms
                    ? 'var(--text-color-red)'
                    : 'white',
                }}
              >
                <i className="bx bx-check"></i>
              </span>
              <p>Acepto</p>
              <a href="/terms.pdf" target="_blank" rel="noopener noreferrer">
                Términos y Condiciones
              </a>
            </article>

            <span onClick={() => setselectSlide('dataOrder')}>
              Modificar Orden
            </span>
          </button>
        </form>
        <div
          className="finalizePurchase__sectionOne__continue"
          onMouseEnter={() => setButtonAnimation(true)}
          onMouseLeave={() => setButtonAnimation(false)}
          onClick={() => postOrden()} // Change this line
        >
          <p style={buttonAnimation ? { transform: 'translatex(-100%)' } : {}}>
            Pagar
          </p>
          <i
            className="bx bx-chevron-right"
            style={buttonAnimation ? { transform: 'translatex(-90%)' } : {}}
          ></i>
        </div>
        <div
          className="finalizePurchase__sectionOne__back"
          onMouseEnter={() => setbackButtonAnimation(true)}
          onMouseLeave={() => setbackButtonAnimation(false)}
          onClick={() => setselectSlide('dataOrder')}
        >
          <p
            style={
              backButtonAnimation ? { transform: 'translatex(-100%)' } : {}
            }
          >
            Atrás
          </p>
          <i
            className="bx bx-chevron-left"
            style={backButtonAnimation ? { transform: 'translatex(-90%)' } : {}}
          ></i>
        </div>
      </div>
    </section>
  );
};

export default FPDataClient;
