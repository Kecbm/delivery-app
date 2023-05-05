import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ButtonCustomer from './Button.customer';
import '../CSS/NavBar.customers.css';

function NavBar() {
  const [user, setUser] = useState({
    name: '',
  });
  const history = useHistory();

  useEffect(() => {
    const userInfos = localStorage.getItem('user');
    setUser(JSON.parse(userInfos));
  }, [setUser]);

  const productsRedirect = (event) => {
    event.preventDefault();
    history.push('/customer/products');
  };

  const ordersRedirect = (event) => {
    event.preventDefault();
    history.push('/customer/orders');
  };

  const logoutRedirect = (event) => {
    event.preventDefault();
    localStorage.removeItem('user');
    history.push('/login');
  };

  return user.name !== '' && (
    <header className="Header">
      <section className="Header">
        <ButtonCustomer
          inputName="input-to-products"
          dataTestId="customer_products__element-navbar-link-products"
          innerText="PRODUTOS"
          OnButtonSubmit={ (event) => productsRedirect(event) }
          isDisabled={ false }
          id="primeiro"
        />
        <ButtonCustomer
          inputName="input-to-orders"
          dataTestId="customer_products__element-navbar-link-orders"
          innerText="MEUS PEDIDOS"
          OnButtonSubmit={ (event) => ordersRedirect(event) }
          isDisabled={ false }
          id="orders"
        />
        <ButtonCustomer
          inputName="input-to-user-page"
          dataTestId="customer_products__element-navbar-user-full-name"
          innerText={ user.name }
          OnButtonSubmit={ () => {} }
          isDisabled={ false }
          id="user"
        />
        <ButtonCustomer
          inputName="input-to-logout"
          dataTestId="customer_products__element-navbar-link-logout"
          innerText="Sair"
          OnButtonSubmit={ (event) => logoutRedirect(event) }
          isDisabled={ false }
          id="logout"
        />
      </section>
    </header>
  );
}

export default NavBar;
