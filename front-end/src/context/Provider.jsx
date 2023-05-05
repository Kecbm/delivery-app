import React, { useContext, useState, createContext, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

const Context = createContext({});

function Provider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
  }, []);

  const context = useMemo(() => ({
  // Estados:
    cart,
    products,
    // Funções Operacionais:
    setCart,
    setProducts,
  }), [cart, products]);

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

const GetContext = () => useContext(Context);

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {
  Provider,
  GetContext,
};
