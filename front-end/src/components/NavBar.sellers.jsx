import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';
import '../CSS/NavBar.sellers.css';

function NavBarSeller() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));

  const ordersRedirect = (event) => {
    event.preventDefault();
    try {
      history.push('/seller/orders');
    } catch (err) {
      throw new Error(err);
    }
  };

  const usersRedirect = (event) => {
    event.preventDefault();
    try {
      history.push('/user');
    } catch (err) {
      throw new Error(err);
    }
  };

  const logoutRedirect = (event) => {
    event.preventDefault();
    try {
      localStorage.removeItem('user');
      history.push('/login');
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <header className="headerSeller">
      <section className="headerSeller">
        <Button
          inputName="input-to-orders"
          dataTestId="customer_products__element-navbar-link-orders"
          innerText="PEDIDOS"
          OnButtonSubmit={ (event) => ordersRedirect(event) }
          isDisabled={ false }
          className="productsSeller"
        />
        <Button
          inputName="input-to-user-page"
          dataTestId="customer_products__element-navbar-user-full-name"
          innerText={ user.name }
          OnButtonSubmit={ (event) => usersRedirect(event) }
          isDisabled={ false }
          className="userSeller"
        />
        <Button
          inputName="input-to-logout"
          dataTestId="customer_products__element-navbar-link-logout"
          innerText="Sair"
          OnButtonSubmit={ (event) => logoutRedirect(event) }
          isDisabled={ false }
          className="logoutSeller"
        />
      </section>
    </header>
  );
}

export default NavBarSeller;
