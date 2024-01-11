import React, { useState } from 'react';
import './productsStyle/categoryProduct.css';

const CategoryProduct = ({
  setSelectCategory,
  selectCategory,
  seccionCategories,
  setfilterTextProduct,
  filterTextProduct,
}) => {
  const [openSelectCategory, setOpenSelectCategory] = useState(false);

  return (
    <section className="categoryProduct__container">
      <article className="categoryProduct__articleOne">
        <h3>Categorías</h3>
        <span
          onClick={() => {
            setSelectCategory('Todas');
            setfilterTextProduct('');
          }}
        >
          Borrar Filtros
        </span>
      </article>
      <article className="categoryProduct__articleTwo">
        <div
          className="categoryProduct__articleTwo__divOne"
          tabIndex={0}
          onBlur={() => setOpenSelectCategory(false)}
          onClick={() => setOpenSelectCategory(!openSelectCategory)}
        >
          <p>{selectCategory === 'Todas' ? 'Todas' : selectCategory?.name}</p>
          <i></i>
          <ul
            className={`categoryProduct__articleTwo__ul  ${
              openSelectCategory ? '' : 'closeSelectCategory'
            }`}
          >
            <li
              onClick={() => {
                setSelectCategory('Todas');
                setOpenSelectCategory(false);
              }}
              style={{
                fontWeight: selectCategory === 'Todas' ? '600' : '400',
              }}
            >
              Todas
            </li>
            {seccionCategories?.categoryProducts?.map((category) => (
              <li
                key={category.id}
                onClick={() => {
                  setSelectCategory(category);
                  setOpenSelectCategory(false);
                }}
                style={{
                  fontWeight:
                    selectCategory?.id === category.id ? '600' : '400',
                }}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="categoryProduct__articleTwo__divTwo">
          <input
            type="text"
            placeholder="Buscar..."
            onChange={(e) => setfilterTextProduct(e.target.value)}
            value={filterTextProduct}
          />
          <i className="icon icon-search"></i>
        </div>
      </article>
    </section>
  );
};

export default CategoryProduct;
