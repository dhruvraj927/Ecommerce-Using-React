import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import days from 'dayjs'
import './Orders.css'
import { Header } from './header/Header'


export function Orders({ Cart }) {

    const [orders, setorders] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/api/orders?expand=products')
            .then((res) => {
                setorders(res.data);
            });

    }, []);


    return (
        <>
            <title>Orders</title>

            <Header Cart={Cart} />

            <div class="orders-page">
                <div class="page-title">Your Orders</div>

                <div class="orders-grid">
                    {orders.map((order) => {
                        return (
                            <>
                                <div class="order-container">

                                    <div class="order-header">
                                        <div class="order-header-left-section">
                                            <div class="order-date">
                                                <div class="order-header-label">Order Placed:</div>
                                                <div>{days(order.orderTimeMs).format('dddd, MMMM ,D')}</div>
                                            </div>
                                            <div class="order-total">
                                                <div class="order-header-label">Total:</div>
                                                <div>${(order.totalCostCents / 100).toFixed(2)}</div>
                                            </div>
                                        </div>

                                        <div class="order-header-right-section">
                                            <div class="order-header-label">Order ID:</div>
                                            <div>{order.id}</div>
                                        </div>
                                    </div>

                                    <div class="order-details-grid">

                                        {order.products.map((orderProduct) => {
                                            return (
                                                <Fragment key={orderProduct.product}>

                                                    <div className="product-image-container">
                                                        <img src={orderProduct.product.image} />
                                                    </div>
                                                    <div class="product-details">
                                                        <div class="product-name">
                                                            {orderProduct.product.name}
                                                        </div>
                                                        <div class="product-delivery-date">
                                                            Arriving on:{days(orderProduct.estimatedDeliveryTimems).format('MMMM , D')}
                                                        </div>
                                                        <div class="product-quantity">
                                                            Quantity: {orderProduct.quantity}
                                                        </div>
                                                        <button class="buy-again-button button-primary">
                                                            <img class="buy-again-icon" src="images/icons/buy-again.png" />
                                                            <span class="buy-again-message">Add to Cart</span>
                                                        </button>
                                                    </div>

                                                    <div class="product-actions">
                                                        <a href="/tracking">
                                                            <button class="track-package-button button-secondary">
                                                                Track package
                                                            </button>
                                                        </a>
                                                    </div>

                                                </Fragment>
                                            )
                                        }
                                        )}


                                    </div>
                                </div>

                            </>
                        )
                    })}



                </div>
            </div>
        </>
    );
}