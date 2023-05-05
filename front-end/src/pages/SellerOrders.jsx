import React from 'react';
import PropTypes from 'prop-types';
import NavBarSeller from '../components/NavBar.sellers';
import SellerOrderCards from '../components/Seller.card.orders';
/* import Button from './Button';
import users from '../mocks/users.mock'; */
import '../CSS/SellerOrders.css';

function SellerOrders() {
  return (
    <div>
      <NavBarSeller />
      <main className="sellerOrders">
        <SellerOrderCards />
      </main>
    </div>
  );
}

SellerOrders.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default SellerOrders;
