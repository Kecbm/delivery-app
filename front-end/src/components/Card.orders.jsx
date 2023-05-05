import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAPI } from '../services/fetch';
import '../CSS/Card.orders.css';

function OrderCards() {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  const ordersRequest = async () => {
    try {
      const dataRequest = await getAPI('sales', true);
      setOrders(dataRequest.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    ordersRequest();
  }, []);

  return (
    <section>
      {
        orders.map((item) => (
          <button
            key={ item.id }
            type="button"
            onClick={ () => history.push(`/customer/orders/${item.id}`) }
            id="itemButton"
          >
            <p
              data-testid={ `customer_orders__element-order-id-${item.id}` }
              id="itemId"
            >
              { `Pedido ${item.id}`}

            </p>
            <p
              data-testid={ `customer_orders__element-delivery-status-${item.id}` }
              className={ item.status }
            >
              { item.status }

            </p>
            <p
              data-testid={ `customer_orders__element-order-date-${item.id}` }
              id="itemDate"
            >
              { formatDate(item.saleDate) }

            </p>
            <p
              data-testid={ `customer_orders__element-card-price-${item.id}` }
              id="itemPrice"
            >
              {item.totalPrice.replace('.', ',')}

            </p>
          </button>
        ))
      }
    </section>
  );
}

export default OrderCards;
