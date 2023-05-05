import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { getAPI, postAPI } from '../../services/fetch';
import NavBar from '../../components/NavBar.customers';
import { formatDate } from '../../utils/data.convertions';
import '../../CSS/Details.customer.css';

function OrderDetailForSeller() {
  const [order, setOrder] = useState({
    status: '',
    saleDate: '',
    totalPrice: 0,
    products: [],
  });

  const { history } = useHistory();

  const { params: { id } } = useRouteMatch();

  const getOrderDetails = async () => {
    try {
      const dataRequest = await getAPI(`sales/${id}`, true);
      setOrder(dataRequest.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusToDelivered = async () => {
    try {
      await postAPI(
        `sales/${id}?status=Entregue`,
        {},
        true,
      );
      history.push(`/customer/orders/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const { saleDate, products } = order;

  useEffect(() => {
    getOrderDetails();
  }, []);

  return order.products.length > 0 && (
    <div>
      <NavBar />
      <main className="mainDetails">
        <h2 id="h1Details">Detalhes do Pedido</h2>
        <section id="sectionDetails">
          <h3
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            { `Pedido ${id}`}
          </h3>
          <h3
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            { `${order.seller.name}`}
          </h3>
          <h3
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            { formatDate(saleDate) }
          </h3>
          <h3
            data-testid={ 'customer_order_details__element-'
          + 'order-details-label-delivery-status' }
            id={ order.status }
          >
            { order.status }
          </h3>
          <button
            data-testid="customer_order_details__button-delivery-check"
            type="button"
            disabled={ order.status !== 'Em Trânsito' }
            onClick={ handleStatusToDelivered }
            id="buttonDetails"
          >
            Marcar como entregue
          </button>
        </section>
        <table id="tableDetails">
          <thead id="theadDetails">
            <tr>
              <th>Item</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor unitário</th>
              <th>Sub-total</th>
            </tr>
          </thead>
          <tbody id="tbodyDetails">
            {products.map((product, index) => (
              <tr key={ index }>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-item-number-${index}`
                  }
                  id="numberDetails"
                >
                  {index + 1 }
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-name-${index}`
                  }
                  id="nameDetails"
                >
                  { product.name }
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-quantity-${index}`
                  }
                  id="quantityDetails"
                >
                  { product.saleProduct.quantity }
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-unit-price-${index}`
                  }
                  id="priceDetails"
                >
                  { product.price }
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-sub-total-${index}`
                  }
                  id="subTotalDetails"
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
          data-testid="customer_order_details__element-order-total-price"
          id="totalPriceDetails"
        >
          { order.totalPrice.replace('.', ',') }
        </h3>
      </main>
    </div>
  );
}

export default OrderDetailForSeller;
