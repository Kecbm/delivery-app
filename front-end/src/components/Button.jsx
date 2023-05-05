import React from 'react';
import PropTypes from 'prop-types';

function Button({
  inputName,
  dataTestId,
  innerText,
  OnButtonSubmit,
  isDisabled,
  className,
}) {
  return (
    <button
      name={ inputName }
      type="button"
      data-testid={ dataTestId }
      disabled={ isDisabled }
      onClick={ (e) => OnButtonSubmit(e) }
      class={ className }
    >
      { innerText }
    </button>
  );
}

Button.propTypes = {
  inputName: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  innerText: PropTypes.string.isRequired,
  OnButtonSubmit: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default Button;
