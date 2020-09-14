import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import Tippy from '@tippyjs/react';
import InfoIcon from '@material-ui/icons/Info';
import 'tippy.js/dist/tippy.css';

function PlaceOrderScreen(props) {

  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }

  /* Requested to have full price at cart IF FORMULA CHANGES MODIFY THERE AS WELL*/

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const itemsWeight = cartItems.reduce((a, c) => a + c.weight * c.qty, 0);
  let tempWeight = 0;
  if (itemsWeight<1){
    tempWeight = 28} else {
    tempWeight = 28 + (Math.ceil((itemsWeight-1)*2)*5)
    }
  let tempService = 0;
  if (itemsPrice<100){
    tempService = 15} else {
    tempService = itemsPrice * 0.15
    }
  const shippingPrice = parseFloat(tempWeight.toFixed(2));
  const taxPrice = parseFloat(tempService.toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  /* Requested to have full price at cart IF FORMULA CHANGES MODIFY THERE AS WELL*/

  /*Tippy for Service Charge */


const ServiceChargeIcon = () => (
  <Tippy content={<span>The Service Charge is 15% of the Subtotal. The Minimum Charge is 15 HKD.</span>}>
    <InfoIcon/>
  </Tippy>
)
/*Tippy for Service Charge */

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
      taxPrice, totalPrice, itemsWeight
    }));
    alert("Your Order has been placed. We will get in contact with you very soon!");
    
  }
  
  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }

  }, [success]);

  return <div>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
            Shipping
          </h3>
          <div>
          {cart.shipping.city}, {cart.shipping.postalCode}, {cart.shipping.address},
         {cart.shipping.country}
          </div>
        </div>
        <div>
          <h3>Payment</h3>
          <div>
            <li>
            Payment Method: {cart.payment.paymentMethod}
            </li>
            <ol className="payment-methods">

            <li>
            For HSBC Payme: <a href=" https://payme.hsbc/60261084" target="_blank" rel="noopener noreferrer"> Tap to PayMe!</a>
            </li>
            <img className="payme" src="\images\hsbcpayme.jpg" alt="payme"></img>
            <li>
            For FPS: Payment can be sent to 60261084.
            </li>
            <li>
            For Bank Transfer:
            <p>HSBC bank account 405 222 043 292 (Chan T** W**g)</p>
            </li>
            </ol>


            


          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h3>
                Shopping Cart
          </h3>
              <div>
                Price
          </div>
            </li>
            {
              cartItems.length === 0 ?
                <div>
                  Cart is empty
          </div>
                :
                cartItems.map(item =>
                  <li>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>
                          {item.name}
                        </Link>

                      </div>
                      <div>
                        Qty: {item.qty}
                      </div>
                    </div>
                    <div className="cart-price">
                      ${item.price}
                    </div>
                  </li>
                )
            }
          </ul>
        </div>

      
      </div>
      <div className="placeorder-action">
        <ul>
          <li>
            <button className="button primary full-width" onClick={placeOrderHandler} >Place Order</button>
          </li>
          <li>
            <h3>Order Summary</h3>
          </li>
          <li>
            <div>Items</div>
            <div>${itemsPrice}</div>
          </li>
          <li>
            <div>Shipping</div>
            <div>${shippingPrice}</div>
          </li>
          <li>
            <div>Service Fee <ServiceChargeIcon/></div>
            <div>${taxPrice}</div>
          </li>
          <li>
            <div>Order Total</div>
            <div>${totalPrice}</div>
          </li>
        </ul>    
      </div>

    </div>
  </div>

}

export default PlaceOrderScreen;