import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './myProfileStyle/myData.css';
import config from '../../utils/getToken';

const MyData = ({ userData, viewYourDate }) => {
  const { handleSubmit } = useForm();
  const [updateData, setupdateData] = useState(false);
  const [dataForm, setdataForm] = useState();

  useEffect(() => {
    setdataForm({
      name: userData?.name,
      lastName: userData?.lastName,
      phoneNumber: userData?.phoneNumber,
      address: userData?.address,
    });
  }, [userData]);

  const submit = async () => {
    const url = `${import.meta.env.VITE_URL_API}/client//${userData?.id}`;

    axios
      .patch(url, dataForm, config)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className={`myData__container  ${
        !viewYourDate ? 'myData__closecontainer' : ''
      }`}
    >
      <article className="myData__articleOne">
        <ul>
          <li>
            <p>Nombre y Apellido:</p>
            <span>
              {userData?.name} {userData?.lastName}
            </span>
          </li>
          <li>
            <p>Correo:</p>
            <span>{userData?.email}</span>
          </li>
          <li>
            <p>Dni:</p>
            <span>{userData?.dni}</span>
          </li>
          <li>
            <p>Celular:</p>
            <span>{userData?.phoneNumber}</span>
          </li>
          <li>
            <p>Dirección:</p>
            <span>{userData?.address}</span>
          </li>
        </ul>

        <p
          className="myData__articleOne__updateData"
          onClick={() => setupdateData(true)}
        >
          Editar Datos
        </p>
      </article>
      <div
        className={`updateImgProfile__container  ${
          !updateData ? 'updateImgProfile__closeContainer' : ''
        }`}
      >
        <form
          className="updateImgProfile__form"
          onSubmit={handleSubmit(submit)}
        >
          <h3>Actualizar Datos </h3>

          <div className="login__div">
            <label htmlFor="name">
              <i className="bx bxs-user"></i>
              <p>Nombre</p>
            </label>
            <input
              id="name"
              type="text"
              required
              onChange={(e) =>
                setdataForm({ ...dataForm, name: e.target.value || '' })
              }
              defaultValue={dataForm?.name}
            />
          </div>
          <div className="login__div">
            <label htmlFor="lastName">
              <i className="bx bxs-user-detail"></i>
              <p>Apellidos</p>
            </label>
            <input
              id="lastName"
              type="text"
              required
              onChange={(e) =>
                setdataForm({ ...dataForm, lastName: e.target.value || '' })
              }
              defaultValue={dataForm?.lastName}
            />
          </div>

          <div className="login__div" style={{ width: '47%' }}>
            <label htmlFor="phoneNumber">
              <i className="bx bxs-phone"></i>
              <p>Telefono</p>
            </label>
            <input
              id="phoneNumber"
              type="text"
              required
              onChange={(e) =>
                setdataForm({ ...dataForm, phoneNumber: e.target.value || '' })
              }
              defaultValue={dataForm?.phoneNumber}
            />
          </div>
          <div className="login__div">
            <label htmlFor="address">
              <i className="bx bxs-map"></i>
              <p>Dirección</p>
            </label>
            <input
              id="address"
              type="text"
              required
              onChange={(e) =>
                setdataForm({ ...dataForm, address: e.target.value || '' })
              }
              defaultValue={dataForm?.address}
            />
          </div>
          <div className="updateImgProfile__formButton">
            <button type="submit" className="crud__button">
              Actualizar Perfil
            </button>
            <button type="button" onClick={() => setupdateData(false)}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyData;
