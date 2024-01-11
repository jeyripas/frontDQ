import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './myProfileStyle/updateImgProfile.css';
import config from '../../utils/getToken';

const UpdateImgProfile = ({ userData, setopenUpdateImg, openUpdateImg }) => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setloading] = useState(false);

  const submit = async () => {
    setloading(true);

    const url = `${import.meta.env.VITE_URL_API}/client/update-img/${
      userData?.id
    }`;
    const formData = new FormData();

    if (selectedFile) {
      formData.append('clientImg', selectedFile);
    }

    axios
      .patch(url, formData, config)
      .then((res) => {
        console.log(res);
        setopenUpdateImg(false);
        setloading(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    reset();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setSelectedFile(file);
  };

  const handleOnClick = () => {
    document.getElementById('clientImg').click();
  };

  return (
    <div
      className={`updateImgProfile__container  ${
        !openUpdateImg ? 'updateImgProfile__closeContainer' : ''
      }`}
    >
      {!loading ? (
        <form
          className="updateImgProfile__form"
          onSubmit={handleSubmit(submit)}
        >
          <h3>Actualizar la imagen de Perfil </h3>

          <div className="updateImgProfile__formDiv">
            <label htmlFor="clientImg">Seleccionar Imagen:</label>
            <div className="custom-file-input">
              <input
                id="clientImg"
                type="file"
                onChange={handleImageChange}
                required
                style={{ display: 'none' }}
              />
              <i className="bx bxs-image-add" onClick={handleOnClick}></i>
            </div>
            <div className="image__preview">
              {selectedImage && <img src={selectedImage} alt="Preview" />}
            </div>
          </div>
          <div className="updateImgProfile__formButton">
            <button type="submit" className="crud__button">
              Actualizar Perfil
            </button>
            <button onClick={() => setopenUpdateImg(false)}>Cancelar</button>
          </div>
        </form>
      ) : (
        <div className="updateImgProfile__loader">
          <i className="bx bx-loader-alt bx-spin bx-flip-horizontal"></i>
          <p>cargando ...</p>
        </div>
      )}
    </div>
  );
};

export default UpdateImgProfile;
