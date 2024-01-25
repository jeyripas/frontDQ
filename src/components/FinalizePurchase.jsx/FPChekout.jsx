import React from 'react';
import { useState, useEffect } from 'react';
import KRGlue from '@lyracom/embedded-form-glue';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../store/Slices/Cart.slice';
import './FinalizePurchaseStyle/FPCheckout.css';

const FPChekout = ({ dataPay, selectSlide, setselectSlide, userData }) => {
  const [message, setMessage] = useState('');
  const [buttonAnimation, setButtonAnimation] = useState(false);
  const [backButtonAnimation, setbackButtonAnimation] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let formToken = 'DEMO-TOKEN-TO-BE-REPLACED';
  useEffect(() => {
    async function setupPaymentForm() {
      const endpoint = 'https://api.micuentaweb.pe';
      const publicKey =
        '14730041:testpublickey_FATajW42loV33ie2uXAfvJi3bb4tMitbZ7q9g6Z04kakI';

      const url = 'http://localhost:3031/api/v1/izipay/createPayment';

      try {
        await axios
          .post(url, dataPay)
          .then((res) => (formToken = res.data))
          .catch((err) => console.log(err));

        const { KR } = await KRGlue.loadLibrary(
          endpoint,
          publicKey
        ); /* Load the remote library */

        await KR.setFormConfig({
          /* set the minimal configuration */
          formToken: formToken,
          'kr-language': 'es-ES' /* to update initialization parameter */,
        });

        await KR.onSubmit(async (paymentData) => {
          const data = { paymentData, dataPay, userData };
          const urlValidPayment = `http://localhost:3031/api/v1/izipay/validatePayment`;

          try {
            const response = await axios.post(urlValidPayment, data);

            if (response.status === 200) {
              setMessage('Payment successful!');
              const userDataJSON = JSON.stringify(dataPay);
              localStorage.setItem('dataPay', userDataJSON);
              dispatch(clearCart());
              navigate('/thank-you');
            }
          } catch (error) {
            console.error('Error validating payment:', error);
          }

          return false; // Return false to prevent the redirection
        });

        await KR.renderElements(
          '#myPaymentForm'
        ); /* Render the payment form into myPaymentForm div */
      } catch (error) {
        console.log(error);
      }
    }

    setupPaymentForm();
  }, [selectSlide]);

  return (
    <section
      className={`finalizePurchase__sectionOne ${
        selectSlide === 'chekout' ? 'finalizePurchase__activeSlide' : ''
      } `}
    >
      <h2>Pagar</h2>

      <div className="finalizePurchase__sectionOne__dataOrder">
        <article className="FPCheckout__cards">
          <h3>Paga con Tarjeta de crédito o débito</h3>
          <ul>
            <li>
              <img src="/visa.png" alt="Don quezo visa" />
            </li>
            <li>
              <img src="/americanExpres.png" alt="Don quezo American Express" />
            </li>
            <li>
              <img src="/master.png" alt="Don quezo Master Card" />
            </li>
            <li>
              <img src="/direct.png" alt="Don quezo Diners Club" />
            </li>
          </ul>
        </article>

        <div id="myPaymentForm">
          <div className="kr-embedded" kr-form-token={formToken}></div>
        </div>
        <div data-test="payment-message">{message}</div>

        <div
          className="finalizePurchase__sectionOne__back FPCheckout__buttonBack"
          onMouseEnter={() => setbackButtonAnimation(true)}
          onMouseLeave={() => setbackButtonAnimation(false)}
          onClick={() => setselectSlide('dataClient')}
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

export default FPChekout;
