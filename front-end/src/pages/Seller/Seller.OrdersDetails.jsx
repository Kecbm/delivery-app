import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getAPI, patchAPI } from '../../services/fetch';
import NavBar from '../../components/NavBar.sellers';
import { formatDate } from '../../utils/data.convertions';
import '../../CSS/Seller.orders.details.css';

function OrderDetailForSeller() {
  const [order, setOrder] = useState({
    status: '',
    saleDate: '',
    totalPrice: '',
    products: [],
  });

  const { params: { id } } = useRouteMatch();

  const getOrderDetails = async () => {
    try {
      const dataRequest = await getAPI(`sales/${id}`, true);
      setOrder(dataRequest.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusBtnClick = async ({ target }) => {
    const { name } = target;
    try {
      await patchAPI(
        `seller/orders/${id}`,
        { saleId: id, status: name },
        true,
      );
      getOrderDetails();
    } catch (error) {
      console.log(error);
    }
  };

  const { saleDate, products, totalPrice } = order;

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <div>
      <NavBar />
      <main id="sellerDetails">
        <h2 id="h1Seller">Detalhes do Pedido</h2>
        <section id="sectionSeller">
            <h3
              data-testid="seller_order_details__element-order-details-label-order-id"
            >
              { `Pedido ${id}`}
            </h3>
            <h3
              data-testid="seller_order_details__element-order-details-label-order-date"
            >
              { formatDate(saleDate) }
            </h3>
            <h3
              data-testid="seller_order_details__element-order-details-label-delivery-status"
              id={ order.status }
            >
              { order.status }
            </h3>
            <button
              data-testid="seller_order_details__button-preparing-check"
              type="button"
              name="Preparando"
              onClick={ handleStatusBtnClick }
              disabled={ order.status === 'Preparando' || order.status === 'Em Trânsito' }
              id="buttonSeller"
            >
              Preparo
            </button>
            <button
              data-testid="seller_order_details__button-dispatch-check"
              type="button"
              name="Em Trânsito"
              onClick={ handleStatusBtnClick }
              disabled={ order.status !== 'Preparando' }
              id="buttonSeller"
            >
              Saiu para entrega
            </button>
        </section>
        <table id="tableSeller">
          <thead id="theadSeller">
            <tr>
              <th>Item</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor unitário</th>
              <th>Sub-total</th>
            </tr>
          </thead>
          <tbody id="tbodySeller">
            {products.map((product) => (
              <tr key={ product.id }>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-item-number-${product.id}`
                  }
                  id="numberSeller"
                >
                  {product.id}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-name-${product.id}`
                  }
                  id="nameSeller"
                >
                  { product.name }
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-quantity-${product.id}`
                  }
                  id="quantitySeller"
                >
                  { product.saleProduct.quantity }
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-unit-price-${product.id}`
                  }
                  id="priceSellerDetails"
                >
                  { product.price }
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-sub-total-${product.id}`
                  }
                  id="subTotalSeller"
                >
                  {
                    (product.saleProduct.quantity * Number(product.price))
                      .toFixed(2).replace('.', ',')
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3
          data-testid="seller_order_details__element-order-total-price"
          id="totalPriceSellerDetails"
        >
          { totalPrice.replace('.', ',') }
        </h3>
      </main>
    </div>
  );
}

export default OrderDetailForSeller;
