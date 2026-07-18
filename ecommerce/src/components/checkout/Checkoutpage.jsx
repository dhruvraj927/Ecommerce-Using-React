import axios from 'axios';
import dayjs from 'dayjs'
import { useState, useEffect } from 'react';
import './Checkout.css'
import './checkout_header.css'
import { Pay } from './payment/Pay'


export function Checkoutpage({ Cart , loadcart}) {


    const [delivery, setdelivery] = useState([]);
    const [payment, setpayment] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/delivery-options?expands=estimatedDeliveryTime')
            .then((response) => {
                setdelivery(response.data);
            });

        axios.get('http://localhost:3000/api/payment-summary')
            .then((Response) => {
                setpayment(Response.data);
            });

    }, [])
    let count = 0;
    {
        Cart.map((prt) => {
            count += prt.quantity;
        })
    }

    return (
        <>
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/">
                            <img className="logo" src="images/logo.png" />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<a className="return-to-home-link"
                            href="/">{count} items</a>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {delivery.length > 0 && Cart.map((items) => {

                            const selectDeliveyoption = delivery.find((deliveryOption) => {
                                return deliveryOption.id = items.deliveryOptionId;
                            })
                            return (
                                <>
                                    <div key={items.productId} className="cart-item-container">
                                        <div className="delivery-date">
                                            Delivery date: {dayjs(selectDeliveyoption.estimatedDeliveryTimeMs).format('dddd , MMMM , D')}
                                        </div>

                                        <div className="cart-item-details-grid">
                                            <img className="product-image"
                                                src={items.product.image} />

                                            <div className="cart-item-details">
                                                <div className="product-name">
                                                    {items.product.name}
                                                </div>
                                                <div className="product-price">
                                                    ${(items.product.priceCents / 100).toFixed(2)}
                                                </div>
                                                <div className="product-quantity">
                                                    <span>
                                                        Quantity: <span className="quantity-label">{items.quantity}</span>
                                                    </span>
                                                    <span className="update-quantity-link link-primary">
                                                        Update
                                                    </span>
                                                    <span className="delete-quantity-link link-primary">
                                                        Delete
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="delivery-options">
                                                <div className="delivery-options-title">
                                                    Choose a delivery option:
                                                </div>
                                                {delivery.map((del) => {
                                                    let priceString = "FREE Shipping";
                                                    if (del.priceCents > 0) {
                                                        priceString = `$${(del.priceCents / 100).toFixed(2)} - Shipping `;
                                                    }
                                                    return (
                                                        <div className="delivery-option">
                                                            <input type="radio" 
                                                                 //checked = {del.id==items.deliveryOptionId}
                                                                className="delivery-option-input"
                                                                name={`delivery-option-${items.productId}` }/>
                                                            <div>
                                                                <div className="delivery-option-date">
                                                                     {dayjs(delivery.estimatedDeliveryTimeMs).format('dddd , MMMM , D')}
                                                                </div>
                                                                <div className="delivery-option-price">
                                                                    {/* FREE Shipping */}
                                                                    {priceString}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                               
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}


                    </div>


                    <Pay payment={payment} loadcart={loadcart} />


                </div>
            </div>
        </>
    );

}