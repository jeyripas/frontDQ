import React, { useEffect, useState } from 'react';
import './pagesStyle/myProfile.css';
import UpdateImgProfile from '../components/myProfile/UpdateImgProfile';
import MyPurchase from '../components/myProfile/MyPurchase';
import axios from 'axios';
import config from '../utils/getToken';
import MyData from '../components/myProfile/MyData';

const MyProfile = ({ userData }) => {
  const [openUpdateImg, setopenUpdateImg] = useState(false);
  const [clientDataOrder, setClientDataOrder] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [viewYourDate, setviewYourDate] = useState(false);

  useEffect(() => {
    if (userData?.id) {
      const url = `${import.meta.env.VITE_URL_API}/client-order/oneClient/${
        userData?.id
      }?page=${currentPage}`;

      axios
        .get(url, config)
        .then((res) => {
          setClientDataOrder(res.data);
        })

        .catch((err) => {
          console.log(err);
        });
    }
  }, [userData, openUpdateImg, currentPage]);

  return (
    <div className="myProfile__container">
      <section className="myProfile__sectionOne">
        <article className="myProfileSectionOne__articleOne">
          <i
            className="bx bxs-edit-alt"
            onClick={() => setopenUpdateImg(true)}
          ></i>
          <img src={userData?.clientImg} alt="" />
        </article>{' '}
        <article className="myProfileSectionOne__articleTwo">
          <p>
            {userData?.name} {userData?.lastName}
          </p>
        </article>
      </section>
      <section className="myProfile__sectionTwo">
        <ul>
          <li
            onClick={() => setviewYourDate(false)}
            style={
              !viewYourDate
                ? {
                    color: 'var(--text-color-red)',
                    borderBottom: '2px solid var(--body-red)',
                  }
                : {}
            }
          >
            Tus Compras
          </li>
          <li
            onClick={() => setviewYourDate(true)}
            style={
              viewYourDate
                ? {
                    color: 'var(--text-color-red)',
                    borderBottom: '2px solid var(--body-red)',
                  }
                : {}
            }
          >
            Tus Datos
          </li>
        </ul>
      </section>
      <section className="myProfile__sectionThree">
        <MyPurchase
          viewYourDate={viewYourDate}
          clientDataOrder={clientDataOrder}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <MyData userData={userData} viewYourDate={viewYourDate} />
      </section>

      <UpdateImgProfile
        userData={userData}
        setopenUpdateImg={setopenUpdateImg}
        openUpdateImg={openUpdateImg}
      />
    </div>
  );
};

export default MyProfile;
