import axios from 'axios';
import dayjs from 'dayjs'
import { useState, useEffect } from 'react';
import './Checkout.css'
import './checkout_header.css'

export function Checkoutpage({ Cart }) {
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
            <div class="checkout-header">
                <div class="header-content">
                    <div class="checkout-header-left-section">
                        <a href="/">
                            <img class="logo" src="images/logo.png" />
                            <img class="mobile-logo" src="images/mobile-logo.png" />
                        </a>
                    </div>

                    <div class="checkout-header-middle-section">
                        Checkout (<a class="return-to-home-link"
                            href="/">{count} items</a>)
                    </div>

                    <div class="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div class="checkout-page">
                <div class="page-title">Review your order</div>

                <div class="checkout-grid">
                    <div class="order-summary">
                        {delivery.length > 0 && Cart.map((items) => {

                            const selectDeliveyoption = delivery.find((deliveryOption) => {
                                return deliveryOption.id = items.deliveryOptionId;
                            })
                            return (
                                <>
                                    <div key={items.productId} class="cart-item-container">
                                        <div class="delivery-date">
                                            Delivery date: {dayjs(selectDeliveyoption.estimatedDeliveryTimeMs).format('dddd , MMMM , D')}
                                        </div>

                                        <div class="cart-item-details-grid">
                                            <img class="product-image"
                                                src={items.product.image} />

                                            <div class="cart-item-details">
                                                <div class="product-name">
                                                    {items.product.name}
                                                </div>
                                                <div class="product-price">
                                                    ${(items.product.priceCents / 100).toFixed(2)}
                                                </div>
                                                <div class="product-quantity">
                                                    <span>
                                                        Quantity: <span class="quantity-label">{items.quantity}</span>
                                                    </span>
                                                    <span class="update-quantity-link link-primary">
                                                        Update
                                                    </span>
                                                    <span class="delete-quantity-link link-primary">
                                                        Delete
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="delivery-options">
                                                <div class="delivery-options-title">
                                                    Choose a delivery option:
                                                </div>
                                                {delivery.map((del) => {
                                                    let priceString = "FREE Shipping";
                                                    if (del.priceCents > 0) {
                                                        priceString = `$${(del.priceCents / 100).toFixed(2)} - Shipping `;
                                                    }
                                                    return (
                                                        <div class="delivery-option">
                                                            <input type="radio" 
                                                                 //checked = {del.id==items.deliveryOptionId}
                                                                class="delivery-option-input"
                                                                name={`delivery-option-${items.productId}` }/>
                                                            <div>
                                                                <div class="delivery-option-date">
                                                                     {dayjs(delivery.estimatedDeliveryTimeMs).format('dddd , MMMM , D')}
                                                                </div>
                                                                <div class="delivery-option-price">
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

                    <div class="payment-summary">
                        <div class="payment-summary-title">
                            Payment Summary
                        </div>

                        <div class="payment-summary-row">
                            <div>Items ({count}):</div>
                            <div class="payment-summary-money">$42.75</div>
                        </div>

                        <div class="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div class="payment-summary-money">$4.99</div>
                        </div>

                        <div class="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div class="payment-summary-money">$47.74</div>
                        </div>

                        <div class="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div class="payment-summary-money">$4.77</div>
                        </div>

                        <div class="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div class="payment-summary-money">$52.51</div>
                        </div>

                        <button class="place-order-button button-primary">
                            Place your order
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

}