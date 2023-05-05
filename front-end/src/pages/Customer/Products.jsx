import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCards from '../../components/Card.products';
import NavBar from '../../components/NavBar.customers';
import Button from '../../components/Button';
import { GetContext } from '../../context/Provider';
import { getAPI } from '../../services/fetch';
import '../../CSS/Products.css';

function Products({ history }) {
  const { cart, setProducts } = GetContext();

  useEffect(() => {
    const getProductsFroAPI = async () => {
      const getProductsAPI = await getAPI('products', true);
      setProducts(getProductsAPI.data);
    };
    getProductsFroAPI();
  }, [setProducts]);

  const goToCheckout = (event) => {
    event.preventDefault();
    history.push('/customer/checkout');
  };

  const totalCart = cart.reduce((acc, curr) => acc + Number(curr.subTotal), 0);

  return (
    <div>
      <NavBar history={ history } />
      <main className="products">
        <ProductCards />
      </main>
      <div
        data-testid="customer_products__checkout-bottom-value"
        id="divCheckout"
      >
        <Button
          inputName="btn-to-checkout-item"
          dataTestId="customer_products__button-cart"
          innerText={ `${totalCart.toFixed(2).replace('.', ',')}` }
          OnButtonSubmit={ (event) => goToCheckout(event) }
          isDisabled={ cart.length === 0 }
          className="buttonCheckout"
        />
      </div>
    </div>
  );
}

Products.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Products;
