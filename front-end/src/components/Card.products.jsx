import React from 'react';
import QuantityProducts from './Quantity.products';
import { GetContext } from '../context/Provider';
import '../CSS/Card.products.css';

function ProductCards() {
  const { products } = GetContext();
  return (
    <section className="product-list">
      { products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        products.map((item, index) => (
          <div
            id={ item.id }
            key={ index }
            className="card"
          >
            <p
              id="price"
              value={ item.price }
              data-testid={ `customer_products__element-card-price-${item.id}` }
              className="text"
            >
              { `R$ ${(item.price).replace('.', ',')}` }

            </p>
            <img
              data-testid={ `customer_products__img-card-bg-image-${item.id}` }
              src={ item.urlImage }
              alt={ `Uma foto de ${item.name}` }
              className="img"
            />
            <div className="endCard">
              <p
                id="name"
                value={ item.name }
                data-testid={ `customer_products__element-card-title-${item.id}` }
                className="text"
              >
                {item.name}

              </p>
              <QuantityProducts
                dataTestIndex={ item.id }
                item={ item }
                className="buttonProduct"
              />
            </div>
          </div>
        ))

      )}
    </section>
  );
}

export default ProductCards;
