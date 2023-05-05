import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { GetContext } from '../context/Provider';
import '../CSS/Quantity.products.css'

function QuantityProducts({ dataTestIndex, item }) {
  const [quantity, setQuantity] = useState(0);
  const { setCart } = GetContext();

  const addQuantity = () => {
    setQuantity((prevState) => (prevState + 1));
    setCart((prevState) => {
      const product = prevState.some((el) => el.productId === item.id);
      if (product) {
        prevState.map((el) => {
          if (el.productId === item.id) {
            el.quantity = quantity + 1;
            el.subTotal = (el.quantity * el.unitPrice).toFixed(2);
          }
          return el;
        });
        return [...prevState];
      }
      return [
        ...prevState,
        {
          productId: item.id,
          quantity: 1,
          name: item.name,
          unitPrice: item.price,
          subTotal: item.price,
        }];
    });
  };

  const removeQuantity = () => {
    setQuantity((prevState) => (prevState - 1));
    setCart((prevState) => {
      const product = prevState.some((el) => el.productId === item.id);
      if (product && quantity > 1) {
        prevState.map((el) => {
          if (el.productId === item.id) {
            el.quantity = quantity - 1;
            el.subTotal = (el.quantity * el.unitPrice).toFixed(2);
          }
          return el;
        });
        return [...prevState];
      }
      return [...prevState.filter((el) => el.productId !== item.id)];
    });
  };

  const onChangeInput = ({ value }) => {
    setQuantity(Number(value));

    setCart((prevState) => {
      if (Number(value) === 0) {
        return [...prevState.filter((el) => el.productId !== item.id)];
      }
      const product = prevState.some((el) => el.productId === item.id);
      if (product) {
        prevState.map((el) => {
          if (el.productId === item.id) {
            el.quantity = Number(value);
            el.subTotal = (el.quantity * el.unitPrice).toFixed(2);
          }
          return el;
        });
        return [...prevState];
      }
      return [
        ...prevState,
        {
          productId: item.id,
          quantity: Number(value),
          name: item.name,
          unitPrice: item.price,
          subTotal: (Number(value) * item.price).toFixed(2),
        }];
    });
  };

  return (
    <section>
      <div id="divQuantity">
        <Button
          inputName="btn-rm-item"
          dataTestId={ `customer_products__button-card-rm-item-${dataTestIndex}` }
          innerText="-"
          OnButtonSubmit={ removeQuantity }
          isDisabled={ quantity === 0 }
          className="buttonQuantity"
        />
        <input
          name="input-qty"
          data-testid={ `customer_products__input-card-quantity-${dataTestIndex}` }
          value={ quantity < 0 ? setQuantity(0) : quantity }
          onChange={ (event) => onChangeInput(event.target) }
          id="inputQuantity"
        />
        <Button
          inputName="btn-add-item"
          dataTestId={ `customer_products__button-card-add-item-${dataTestIndex}` }
          innerText="+"
          OnButtonSubmit={ addQuantity }
          isDisabled={ false }
          className="buttonQuantity"
        />
      </div>
    </section>
  );
}

QuantityProducts.propTypes = {
  dataTestIndex: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default QuantityProducts;
