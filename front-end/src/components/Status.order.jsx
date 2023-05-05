import React from 'react';
import { GetContext } from '../context/Provider';
import '../CSS/Status.order.css'

export default function StatusOrder() {
  const { cart, setCart } = GetContext();

  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.productId !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const totalPrice = cart.reduce((acc, curr) => acc + Number(curr.subTotal), 0);

  return (
    <div id="statusOrder">
      <table>
        <thead id="thead">
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Sub-total</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody id="tbody">
          {
            cart.length > 0 && cart.map((item, index) => (
              <tr key={ item.productId }>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                  id="number"
                >
                  {index + 1}
                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-name-${index}` }
                  id="elementName"
                >
                  { item.name }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                  id="elementQuantity"
                >
                  { item.quantity }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                  id="elementPrice"
                >
                  { `${item.unitPrice.replace('.', ',')}` }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                  id="subTotal"
                >
                  { `${item.subTotal.replace('.', ',')}` }
                </td>
                <td id="buttonLine">
                  <button
                    type="button"
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                    onClick={ () => { removeItem(item.productId); } }
                    id="buttonCheckout"
                  >
                    Remover
                  </button>
                </td>
              </tr>

            ))
          }
        </tbody>
      </table>
      <p
        data-testid="customer_checkout__element-order-total-price"
        id="totalPrice"
      >
        {`Total: R$ ${totalPrice.toFixed(2).replace('.', ',')}`}
      </p>
    </div>
  );
}
