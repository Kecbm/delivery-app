import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar.customers';
import StatusOrder from '../../components/Status.order';
import { getAPI, postAPI } from '../../services/fetch';
import { GetContext } from '../../context/Provider';
import '../../CSS/Checkout.css';

function Checkout({ history }) {
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState(2);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');

  const { cart } = GetContext();

  useEffect(() => {
    const fetchSellers = async () => {
      const { data } = await getAPI('sellers');
      setSellers(data);
    };
    fetchSellers();
  }, []);

  const finalizeOrder = async () => {
    const totalPrice = cart.reduce((acc, curr) => acc + Number(curr.subTotal), 0);
    const products = cart.map((item) => ({
      id: item.productId,
      quantity: item.quantity,
    }));
    const body = {
      deliveryAddress,
      deliveryNumber,
      sellerId,
      totalPrice,
      products,
    };

    try {
      const { data: { id } } = await postAPI('sales', body, true);
      localStorage.setItem('cart', JSON.stringify([]));
      history.push(`/customer/orders/${id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <NavBar />
      <main className="mainCheckout">
        <h1 id="h1Checkout">Finalizar Pedido</h1>
        <StatusOrder />
        <section>
          <h2 id="h2Checkout">Detalhes e informações de entrega</h2>
          <div id="secondSection">
            <p>Pessoa Vendedora: </p>
            <select
              data-testid="customer_checkout__select-seller"
              onChange={ ({ target }) => setSellerId(Number(target.value)) }
              className="inputCheckout"
            >
              {
                sellers.length > 0 && sellers.map((seller) => (
                  <option
                    value={ seller.id }
                    key={ seller.id }
                  >
                    {seller.name}
                  </option>
                ))
              }
            </select>
            <p>Endereço: </p>
            <input
              type="text"
              data-testid="customer_checkout__input-address"
              value={ deliveryAddress }
              onChange={ ({ target }) => setDeliveryAddress(target.value) }
              className="inputCheckout"
            />
            <p>Número: </p>
            <input
              type="text"
              data-testid="customer_checkout__input-addressNumber"
              value={ deliveryNumber }
              onChange={ ({ target }) => setDeliveryNumber(target.value) }
              className="inputCheckout"
            />
            <button
              type="button"
              data-testid="customer_checkout__button-submit-order"
              onClick={ finalizeOrder }
              id="customerCheckout"
            >
              Finalizar Pedido
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
