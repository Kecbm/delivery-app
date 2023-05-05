import React from 'react';

function OrderCardForSeller(order) {
  const { id, status, saleDate, totalPrice, deliveryAddress } = order;

  return (
    <div>
      <div>
        <h3>Pedido</h3>
        <h3 data-testid={ `seller_orders__element-order-id-${id}` }>{ id }</h3>
      </div>
      <h3
        data-testid={ `seller_orders__element-delivery-status-${id}` }
      >
        { status }
      </h3>
      <div>
        <h3
          data-testid={ `seller_orders__element-order-date-${id}` }
        >
          { saleDate }
        </h3>
        <h3
          data-testid={ `seller_orders__element-card-price-${id}` }
        >
          { totalPrice }
        </h3>
      </div>
      <h3
        data-testid={ `seller_orders__element-card-address-${id}` }
      >
        { deliveryAddress }
      </h3>
    </div>
  );
}

export default OrderCardForSeller;
