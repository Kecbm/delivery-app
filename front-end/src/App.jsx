import React from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Provider } from './context/Provider';
import Login from './pages/Login';
import Orders from './pages/Customer/Orders';
import Products from './pages/Customer/Products';
import Register from './pages/Register';
import SellerOrders from './pages/SellerOrders';
import Checkout from './pages/Customer/Checkout';
import SellerOrderDetail from './pages/Seller/Seller.OrdersDetails';
import Details from './pages/Customer/Details';
import './CSS/App.css';

function App() {
  return (
    <div className="App">
      <Provider>
        <BrowserRouter>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/customer/products" component={ Products } />
          <Route exact path="/customer/orders/:id" component={ Details } />
          <Route exact path="/customer/orders" component={ Orders } />
          <Route exact path="/customer/checkout" component={ Checkout } />
          <Route exact path="/seller/orders" component={ SellerOrders } />
          <Route exact path="/seller/orders/:id" component={ SellerOrderDetail } />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
