import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { postAPI } from '../services/fetch';
import ibeerLogo from '../images/Ibeer-logo.png';
import '../CSS/Login.css';

function Login({ history }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [errorLogin, setErrorLogin] = useState(false);
  const handleInputChange = ({ target: { id, value } }) => (
    setLogin((prevState) => ({ ...prevState, [id]: value }))
  );
  const roleRedirect = (role) => {
    if (role === 'seller') {
      history.push('/seller/orders');
    } else if (role === 'customer') {
      history.push('/customer/products');
    }
  };

  const isDisabled = () => {
    const PASSWORD_LENGTH = 6;
    const REGEX_EMAIL = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm);
    return login.email.length <= 0
      || !REGEX_EMAIL.test(login.email)
      || login.password.length < PASSWORD_LENGTH;
  };
  const registerRedirect = async (event) => {
    event.preventDefault();
    history.push('/register');
  };
  const loginRequest = async (event) => {
    event.preventDefault();
    try {
      const dataRequest = await postAPI('login', login);
      localStorage.setItem('user', JSON.stringify(dataRequest.data));
      roleRedirect(dataRequest.data.role);
    } catch (error) {
      console.log(error);
      setErrorLogin(true);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      roleRedirect(user.role);
    }
  }, []);

  return (
    <section>
      <img src={ ibeerLogo } alt="logo" id="logo" />
      <form id="section">
        <label htmlFor="email">
          <input
            id="email"
            data-testid="common_login__input-email"
            type="email"
            placeholder="Email:"
            value={ login.email }
            onChange={ handleInputChange }
            required
            class="button"
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            data-testid="common_login__input-password"
            type="password"
            placeholder="Senha:"
            value={ login.password }
            onChange={ handleInputChange }
            required
            class="button"
          />
        </label>
          <Button
            inputName="button-submit-login"
            dataTestId="common_login__button-login"
            innerText="LOGIN"
            OnButtonSubmit={ (event) => loginRequest(event) }
            isDisabled={ isDisabled() }
            className="secondButton"
          />
          <Button
            inputName="button-submit-register"
            dataTestId="common_login__button-register"
            innerText="Ainda não tenho conta"
            OnButtonSubmit={ (event) => registerRedirect(event) }
            isDisabled={ false }
            className="secondButton"
          />
      </form>
      { errorLogin && (
        <p id="alert" data-testid="common_login__element-invalid-email">
          Usuário ou senha inválidos
        </p>) }
    </section>
  );
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Login;
