import React from 'react';
import './productsStyle/optionsProduct.css';
import FormatPrice from '../../hooks/FormatPrice';

const OptionsProduct = ({
  productOptions,
  openOption,
  setopenOption,
  product,
  setselectOption,
  selectOption,
  setselectExtra,
  selectExta,
  handleAddToCart,
}) => {
  const priceDiscount = (option) => {
    const totalPrice = option?.price - (option?.price * option?.discount) / 100;
    return totalPrice;
  };

  return (
    <div
      className={`optionsProduct__container ${
        openOption ? '' : 'closeOptionProduct'
      }`}
    >
      <section className="optionsProduct__section">
        <article className="optionsProduct__sectionAticleOne">
          <h3>{product.name}</h3>
          <p onClick={() => setopenOption(false)}></p>
        </article>
        <article className="optionsProduct__sectionAticleTwo">
          <ul>
            {productOptions?.map((option) => (
              <li key={option.id} onClick={() => setselectOption(option)}>
                <p>
                  <span className="optionsProduct__sectionAticleTwo__optionCheckout">
                    <span
                      className="pseudo-element"
                      style={{
                        position: 'absolute',
                        content: "''",
                        backgroundColor:
                          selectOption?.id === option.id
                            ? 'var(--text-color-red)'
                            : 'transparent',
                        width: '11px',
                        height: '11px',
                        borderRadius: '50%',
                      }}
                    ></span>
                  </span>
                  {option.name}: {option.size}
                </p>

                <div className="optionsProduct__sectionAticleTwo__divPrices">
                  {option?.discount > 0 ? <p>- {option.discount}%</p> : null}
                  <p
                    style={
                      option?.discount > 0
                        ? {
                            textDecoration: 'line-through',
                            color: '#666666cc',
                          }
                        : {}
                    }
                  >
                    S/
                    {option ? <FormatPrice price={option.price} /> : '0.00'}
                  </p>{' '}
                  {option?.discount > 0 ? (
                    <p>
                      S/
                      {option ? (
                        <FormatPrice price={priceDiscount(option)} />
                      ) : (
                        '0.00'
                      )}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
            {product?.productExtras.map((extra) => (
              <li
                key={extra.id}
                onClick={() => {
                  Array.isArray(selectExta) && selectExta.includes(extra)
                    ? setselectExtra((prevSelectExta) =>
                        prevSelectExta.filter((item) => item !== extra)
                      )
                    : setselectExtra((prevSelectExta) => [
                        ...prevSelectExta,
                        extra,
                      ]);
                }}
              >
                <p>
                  <span
                    className="optionsProduct__sectionAticleTwo__extraCheckout"
                    style={{
                      backgroundColor:
                        Array.isArray(selectExta) &&
                        selectExta.some((item) => item.id === extra.id)
                          ? 'var(--text-color-red)'
                          : 'white',
                    }}
                  >
                    <i className="bx bx-check"></i>
                  </span>

                  {extra.name}
                </p>
                <p>s/{<FormatPrice price={extra.price} />}</p>
              </li>
            ))}
          </ul>
        </article>
        <article className="optionsProduct__sectionAticleThree">
          <p onClick={() => setopenOption(false)}>close</p>
          <button
            onClick={() => {
              handleAddToCart();
              setopenOption(false);
            }}
          >
            Agregar al carrito
          </button>
        </article>
      </section>
    </div>
  );
};

export default OptionsProduct;
