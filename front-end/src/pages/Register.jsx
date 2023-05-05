import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import { postAPI } from '../services/fetch';
import ibeerLogo from '../images/Ibeer-logo.png';
import '../CSS/Login.css';

function Register({ history }) {
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errorRegister, setErrorRegister] = useState(false);

  const handleInputChange = ({ target: { id, value } }) => (
    setRegister((prevState) => ({ ...prevState, [id]: value }))
  );

  const isDisabled = () => {
    const NAME_LENGTH = 12;
    const PASSWORD_LENGTH = 6;
    const REGEX_EMAIL = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm);
    return register.name.length < NAME_LENGTH
    || register.email.length <= 0
    || !REGEX_EMAIL.test(register.email)
    || register.password.length < PASSWORD_LENGTH;
  };

  const registerRequest = async (event) => {
    event.preventDefault();
    try {
      const dataRequest = await postAPI('register', register);
      localStorage.setItem(
        'user',
        JSON.stringify(dataRequest.data),
      );
      history.push('/customer/products');
    } catch (error) {
      setErrorRegister(true);
    }
  };

  return (
    <section>
      <img src={ ibeerLogo } alt="logo" id="logo" />
      <form id="section">
        <label htmlFor="name">
          <input
            id="name"
            data-testid="common_register__input-name"
            type="email"
            placeholder="Seu nome"
            value={ register.name }
            onChange={ handleInputChange }
            required
            class="button"
          />
        </label>
        <label htmlFor="email">
          <input
            id="email"
            data-testid="common_register__input-email"
            type="email"
            placeholder="seu-email@site.com.br"
            value={ register.email }
            onChange={ handleInputChange }
            required
            class="button"
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            data-testid="common_register__input-password"
            type="password"
            placeholder="********"
            value={ register.password }
            onChange={ handleInputChange }
            required
            class="button"
          />
        </label>
        <Button
          inputName="button-submit-register"
          dataTestId="common_register__button-register"
          innerText="CADASTRAR"
          OnButtonSubmit={ (event) => registerRequest(event) }
          isDisabled={ isDisabled() }
          className="secondButton"
        />
      </form>
      { errorRegister && (
        <p data-testid="common_register__element-invalid_register">
          Usuário já cadastrado
        </p>) }
    </section>
  );
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Register;
