import React from 'react';
import PropTypes from 'prop-types';

function ButtonCustomer({
  inputName,
  dataTestId,
  innerText,
  OnButtonSubmit,
  isDisabled,
  id,
}) {
  return (
    <button
      name={ inputName }
      type="button"
      data-testid={ dataTestId }
      disabled={ isDisabled }
      onClick={ (e) => OnButtonSubmit(e) }
      id={ id }
    >
      { innerText }
    </button>
  );
}

ButtonCustomer.propTypes = {
  inputName: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  innerText: PropTypes.string.isRequired,
  OnButtonSubmit: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default ButtonCustomer;
