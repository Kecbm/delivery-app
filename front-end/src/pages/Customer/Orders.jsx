import React from 'react';
import OrderCards from '../../components/Card.orders';
import NavBar from '../../components/NavBar.customers';
import '../../CSS/Orders.css';

function Orders() {
  return (
    <div>
      <NavBar />
      <main className="orders">
        <OrderCards />
      </main>
    </div>
  );
}

export default Orders;
