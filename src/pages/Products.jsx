import React, { useEffect, useState } from 'react';
import './pagesStyle/product.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CardProduct from '../components/Products/CardProduct';
import CategoryProduct from '../components/Products/CategoryProduct';

const Products = () => {
  const { id } = useParams();

  const [selectCategory, setSelectCategory] = useState('Todas');
  const [allProduct, setAllProduct] = useState();
  const [seccionCategories, setSeccionCategories] = useState();
  const [filterTextProduct, setfilterTextProduct] = useState('');
  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/section-product/${id}`;

    axios
      .get(url)
      .then((res) => setSeccionCategories(res.data.sectionProduct))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/category-product/all-products/${id}`;

    axios
      .get(url)
      .then((res) => setAllProduct(res.data.categoryProducts))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="product__container">
      <h1>{seccionCategories?.name}</h1>
      <CategoryProduct
        setSelectCategory={setSelectCategory}
        selectCategory={selectCategory}
        seccionCategories={seccionCategories}
        setfilterTextProduct={setfilterTextProduct}
        filterTextProduct={filterTextProduct}
      />
      <section className="product__cardsContianer">
        {allProduct?.flatMap((categoryProduct) =>
          categoryProduct.products.map((product) => (
            <CardProduct
              key={product.id}
              product={product}
              selectCategory={selectCategory}
              filterTextProduct={filterTextProduct}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default Products;
