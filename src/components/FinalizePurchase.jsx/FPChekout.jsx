import React from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const FPChekout = () => {
  const createPay = async () => {
    const transactionId = uuidv4().replace(/\D/g, '');
    const options = {
      method: 'POST',
      url: 'https://testapi-pw.izipay.pe/gateway/api/v1/proxy-cors/https://testapi-pw.izipay.pe/security/v1/Token/Generate',
      headers: {
        transactionId: transactionId,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: {
        requestSource: 'ECOMMERCE',
        merchantCode: '4001834',
        orderNumber: 'R202211101518',
        publicKey: 'VErethUtraQuxas57wuMuquprADrAHAb',
        amount: '1.00',
      },
    };

    try {
      const { data } = await axios.request(options);
      console.log(data);
      const iziConfig = {
        config: {
          transactionId: '1312312121165',
          action: 'pay',
          merchantCode: '14730041',
          order: {
            orderNumber: '1',
            currency: 'PEN',
            amount: '1.50',
            processType: 'AT',
            merchantBuyerId: '14730041',
            dateTimeTransaction: '1670258741603000',
          },
          billing: {
            firstName: 'Juan',
            lastName: 'Wick Quispe',
            email: 'jwickq@izi.com',
            phoneNumber: '958745896',
            street: 'Av. Jorge Chávez 275',
            city: 'Lima',
            state: 'Lima',
            country: 'PE',
            postalCode: '15038',
            documentType: 'DNI',
            document: '21458796',
          },
          render: {
            typeForm: 'embedded',
            container: 'my-form-payment',
            showButtonProcessForm: true,
          },
        },
      };

      try {
        const checkout = new Izipay({ config: iziConfig });
        console.log(checkout);
      } catch (error) {
        console.log(error.message, error.Errors, error.date);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="my-form-payment">
      <button id="boton-comercio" onClick={createPay}>
        sssas
      </button>
    </div>
  );
};

export default FPChekout;
