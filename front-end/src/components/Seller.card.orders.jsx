import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAPI } from '../services/fetch';
import { formatDate } from '../utils/data.convertions';
import '../CSS/Seller.card.orders.css';

function SellerOrderCards() {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  const getOrders = async () => {
    const dataRequest = await getAPI('seller/orders', true);
    console.log(dataRequest.data);
    setOrders(dataRequest.data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <section>
      {
        orders.map((item, index) => (
          <button
            key={ index }
            type="button"
            id="sellerButton"
            onClick={ () => history.push(`/seller/orders/${item.id}`) }
          >
              <p
                data-testid={ `seller_orders__element-order-id-${item.id}` }
                id="idSeller"
              >
                { `Pedido ${item.id}`}

              </p>
              <p
                data-testid={ `seller_orders__element-delivery-status-${item.id}` }
                className={ item.status }
              >
                { `${item.status}` }

              </p>
              <p
                data-testid={ `seller_orders__element-order-date-${item.id}` }
                id="dateSeller"
              >
                { formatDate(item.saleDate) }

              </p>
              <p
                data-testid={ `seller_orders__element-card-price-${item.id}` }
                id="priceSeller"
              >
                { `R$ ${item.totalPrice.replace('.', ',')}` }

              </p>
              <p
                data-testid={ `seller_orders__element-card-address-${index}` }
                id="addressSeller"
              >
                { `${item.deliveryAddress}` }

              </p>
          </button>
        ))
      }
    </section>
  );
}

export default SellerOrderCards;
