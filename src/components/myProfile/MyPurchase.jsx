import React from 'react';
import './myProfileStyle/myPurchase.css';

const MyPurchase = ({
  viewYourDate,
  clientDataOrder,
  setCurrentPage,
  currentPage,
}) => {
  const getStatusLabel = (order) => {
    let backgroundColor, label;

    switch (order.statusOrder) {
      case 'onTheWay':
        backgroundColor = 'var(--body-yeloow)';
        label = 'Por Entregar';
        break;
      case 'delivered':
        backgroundColor = '#069d27';
        label = 'Entregado';
        break;
      case 'cancel':
        backgroundColor = 'var(--body-red)';
        label = 'Cancelado';
        break;
      default:
        return null;
    }

    return (
      <p
        style={{
          backgroundColor,
          padding: '8px',
          color: '#fff',
          textAlign: 'center',
          fontWeight: '600',
        }}
      >
        {label}
      </p>
    );
  };

  return (
    <div
      className={`MyPurchase__container  ${
        viewYourDate ? 'MyPurchase__closeContainer' : ''
      }`}
    >
      {clientDataOrder?.clientOrders?.map((order) => (
        <article key={order.id} className="MyPurchase__article">
          <div>
            <h3>Fecha y Hora</h3>
            <ul>
              <li>{order.date}</li>
              <li>{order.hour}</li>
            </ul>
          </div>
          <div>
            <h3>Datos del Cliente</h3>
            <ul>
              <li>Nombre: {order.name}</li>
              <li>Correo:{order.email}</li>
              <li>Celular: {order.phoneNumber}</li>
              <li>Dirección: {order.address}</li>
              <li>Referencia: {order.reference}</li>
              <li>Mensaje: {order.message}</li>
            </ul>
          </div>
          <div>
            <h3>Datos de la Orden</h3>
            {order?.orders.map((order, index) => (
              <ul key={order.id}>
                <li>Orden {index + 1}:</li>
                <li>
                  {order.numberOrder}, {order.name}, {order.option}
                </li>
                {order.extras.length > 0 ? (
                  <li style={{ marginTop: '-0.3em' }}>
                    {order.extras.map((extra) => extra.name)}
                  </li>
                ) : (
                  ''
                )}
              </ul>
            ))}
          </div>
          <div>
            <h3>Total</h3>
            <p>s/{order.total}</p>
          </div>
          <div>
            <h3>Estado</h3>
            {getStatusLabel(order)}
          </div>
        </article>
      ))}
      {clientDataOrder?.totalPages > 0 && (
        <section className="MyPurchase__pages">
          <h3>Pagina</h3>
          <div>
            <i
              className="bx bx-chevron-left bx-flip-vertical"
              onClick={() =>
                setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
              }
            ></i>
            {Array.from({ length: clientDataOrder?.totalPages }, (_, index) => (
              <p
                className={`${
                  currentPage == index + 1 ? 'MyPurchase__pages__pActive' : ''
                }`}
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </p>
            ))}
            <i
              className="bx bx-chevron-right bx-flip-vertical"
              onClick={() =>
                setCurrentPage(
                  currentPage < clientDataOrder?.totalPages
                    ? currentPage + 1
                    : currentPage
                )
              }
            ></i>
          </div>
        </section>
      )}
    </div>
  );
};

export default MyPurchase;
