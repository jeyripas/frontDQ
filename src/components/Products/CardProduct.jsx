import React, { useState, useEffect } from 'react';
import FormatPrice from '../../hooks/FormatPrice';
import './productsStyle/cardProduct.css';
import OptionsProduct from './OptionsProduct';
import { useDispatch } from 'react-redux';
import { setCart } from '../../store/Slices/Cart.slice';

const CardProduct = ({ product, selectCategory, filterTextProduct }) => {
  const [openOption, setopenOption] = useState(false);
  const [selectOption, setselectOption] = useState(null);
  const [selectDefaultOption, setselectDefaultOption] = useState(null);
  const [selectExta, setselectExtra] = useState([]);
  const [selectPizza, setSelectPizza] = useState([]);
  const [selectDrink, setSelectDrink] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const configureProductOptions = () => {
      const options = product.productOptions.map((option) => option);

      const defaultOption = options.find(
        (option) => option.name.toLowerCase() === 'grande'
      );
      setselectDefaultOption(defaultOption || options[0]);
      setselectOption(defaultOption || options[0]);
    };

    configureProductOptions();
  }, [product]);

  const productLowerCaseName = product.name.toLowerCase();
  const filterTextLower = filterTextProduct.toLowerCase();

  const isTextMatch =
    filterTextLower.length === 0 ||
    productLowerCaseName.includes(filterTextLower) ||
    product.description.toLowerCase().includes(filterTextLower);

  const isCategoryMatch =
    selectCategory === 'Todas' ||
    product.categoryProductId === selectCategory?.id;

  const shouldShowProduct = isCategoryMatch && isTextMatch;

  const validFilterProduct = shouldShowProduct
    ? ''
    : 'cardProduct__containerFilter';

  const handleAddToCart = () => {
    const cartItem = {
      product: product,
      selectExtra: selectExta,
      selectOption: selectOption,
      selectPizza: selectPizza,
      selectDrink: selectDrink,
      priceDiscount,
      counter: 1,
    };

    if (selectOption) {
      dispatch(setCart([cartItem]));
    } else {
      setselectExtra([]);
      setSelectPizza([]);
    }
  };

  const priceDiscount =
    selectOption?.price - (selectOption?.price * selectOption?.discount) / 100;

  const priceDiscountDefault =
    selectDefaultOption?.price -
    (selectDefaultOption?.price * selectDefaultOption?.discount) / 100;

  return (
    <div className={`cardProduct__container ${validFilterProduct}`}>
      <article
        className="cardProduct__articleOne"
        onClick={() => setopenOption(true)}
      >
        <img src={product.productImg} alt={product?.name} />
        <div>
          <h3>{product.name}</h3>
          <small>{product.description}</small>
          <p>{selectOption?.name}</p>
        </div>
        {product.label === 'no' ? (
          ''
        ) : (
          <span
            className="cardProduct__articleOne__label"
            style={{ backgroundColor: `${product.labelColor}` }}
          >
            {product.label}
          </span>
        )}
        {selectOption?.discount > 0 ? (
          <span className="cardProduct__articleOne__labelDescount">
            - {selectOption.discount}%
          </span>
        ) : (
          ''
        )}
      </article>
      <article className="cardProduct__articleTwo">
        <ul>
          <li
            className="cardProduct__articleTwo__options"
            onClick={() => setopenOption(true)}
          >
            Opciones
          </li>

          <li className="cardProduct__articleTwo__price">
            {selectDefaultOption?.discount > 0 ? (
              <p>
                S/
                {selectDefaultOption ? (
                  <FormatPrice price={priceDiscountDefault} />
                ) : (
                  '0.00'
                )}
              </p>
            ) : null}
            <p
              style={
                selectOption?.discount > 0
                  ? {
                      textDecoration: 'line-through',
                      color: '#666666cc',
                    }
                  : {}
              }
            >
              S/
              {selectOption ? (
                <FormatPrice price={selectOption.price} />
              ) : (
                '0.00'
              )}
            </p>
          </li>

          <li
            className=" cardProduct__articleTwo__addCart"
            onClick={handleAddToCart}
          >
            Agregar
          </li>
        </ul>
      </article>
      <OptionsProduct
        openOption={openOption}
        setopenOption={setopenOption}
        product={product}
        setselectOption={setselectOption}
        selectOption={selectOption}
        setselectExtra={setselectExtra}
        selectExta={selectExta}
        handleAddToCart={handleAddToCart}
        setSelectPizza={setSelectPizza}
        selectPizza={selectPizza}
        setSelectDrink={setSelectDrink}
        selectDrink={selectDrink}
      />
    </div>
  );
};

export default CardProduct;
