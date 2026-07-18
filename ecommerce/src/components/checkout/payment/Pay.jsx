import axios from "axios";
 import{useNavigate} from 'react-router-dom';

export function Pay({payment , loadcart}){
    
       const navigate = useNavigate();
    const createOrder = async () => {
        await axios.post('http://localhost:3000/api/orders');
        await loadcart();
        // console.log(res.data);
        navigate('/orders');
    }

    return (

        <div className="payment-summary">
                    
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>
                        
                        {payment && (
                            <>
                           <div className="payment-summary-row">
                            <div>Items ({payment.totalItems}):</div>
                            <div className="payment-summary-money">$ {(payment.productCostCents /100 ).toFixed(2)}</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div className="payment-summary-money">$ {(payment.shippingCostCents /100 ).toFixed(2)}</div>
                        </div>

                        <div className="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div className="payment-summary-money">$ {(payment.totalCostBeforeTaxCents /100 ).toFixed(2)} </div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div className="payment-summary-money">$ {(payment.taxCents /100 ).toFixed(2)}</div>
                        </div>

                        <div className="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div className="payment-summary-money">$ {(payment.totalCostCents /100 ).toFixed(2)}</div>
                        </div>
                        </>
                    )
                    }

                     

                        <button className="place-order-button button-primary"
                        onClick={createOrder}
                        >
                            Place your order
                        </button>
                    </div>
                    

    )
}