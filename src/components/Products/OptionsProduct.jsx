import React from 'react';
import './productsStyle/optionsProduct.css';
import FormatPrice from '../../hooks/FormatPrice';

const OptionsProduct = ({
  openOption,
  setopenOption,
  product,
  setselectOption,
  selectOption,
  setselectExtra,
  selectExta,
  handleAddToCart,
  setSelectPizza,
  selectPizza,
  setSelectDrink,
  selectDrink,
}) => {
  const priceDiscount = (option) => {
    const totalPrice = option?.price - (option?.price * option?.discount) / 100;
    return totalPrice;
  };

  const handleClickPizza = (pizza) => {
    if (selectPizza.length === 2 && !selectPizza.includes(pizza)) {
      // Si ya se han seleccionado dos pizzas y la pizza actual no está en la selección, no hacemos nada
      return;
    }

    setSelectPizza((prevSelectPizza) =>
      prevSelectPizza.includes(pizza)
        ? prevSelectPizza.filter((item) => item !== pizza)
        : [...prevSelectPizza, pizza]
    );
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
            {product?.productOptions.length > 0 ? <h4>Detalle</h4> : ''}
            {product?.productOptions.map((option) => (
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
            {product?.productPizzas.length > 0 ? <h4>Pizzas</h4> : ''}
            {product?.productPizzas.map((extra) => (
              <li key={extra.id} onClick={() => handleClickPizza(extra)}>
                <p>
                  <span
                    className="optionsProduct__sectionAticleTwo__extraCheckout"
                    style={{
                      backgroundColor: selectPizza.some(
                        (item) => item.id === extra.id
                      )
                        ? 'var(--text-color-red)'
                        : 'white',
                    }}
                  >
                    {selectPizza.includes(extra) && (
                      <i className="bx bx-check"></i>
                    )}
                  </span>
                  {extra.name}
                </p>
              </li>
            ))}
            {product?.productDrinks.length > 0 ? <h4>Bebidas</h4> : ''}
            {product?.productDrinks.map((drink) => (
              <li
                key={drink.id}
                onClick={() => {
                  selectDrink?.id === drink.id
                    ? setSelectDrink(null)
                    : setSelectDrink(drink);
                }}
              >
                <p>
                  <span className="optionsProduct__sectionAticleTwo__optionCheckout">
                    <span
                      className="pseudo-element"
                      style={{
                        position: 'absolute',
                        content: "''",
                        backgroundColor:
                          selectDrink?.id === drink.id
                            ? 'var(--text-color-red)'
                            : 'transparent',
                        width: '11px',
                        height: '11px',
                        borderRadius: '50%',
                      }}
                    ></span>
                  </span>
                  {drink.name}
                </p>
              </li>
            ))}
            {product?.productExtras.length > 0 ? <h4>Extras</h4> : ''}
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
