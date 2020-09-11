import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PlaceOrderSCreen from "./PlaceOrderScreen"
function CartScreen(props) {

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

/* Requested to have full price at cart IF FORMULA CHANGES MODIFY HERE*/
const itemsWeight = cartItems.reduce((a, c) => a + c.weight * c.qty, 0);
let tempWeight = 0;
if (itemsWeight<1){
  tempWeight = 28} else {
  tempWeight = 28 + (Math.ceil((itemsWeight-1)*2)*5)
  }
const shippingPrice = tempWeight;
const subTotal= cartItems.reduce((a, c) => a + c.price * c.qty, 0);
const serviceFee= subTotal*0.15
const total = subTotal + serviceFee + shippingPrice
/* Requested to have full price at cart IF FORMULA CHANGES MODIFY HERE*/

  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }

  return <div className="cart">
    <div className="cart-list">
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
                    Qty:
                  <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                      {[...Array(item.countInStock).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
                    </select>
                    <button type="button" className="delete-button" onClick={() => removeFromCartHandler(item.product)} >
                      Delete
                    </button>
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
    <div className="cart-action">
      <h4>
        Subtotal ( {cartItems.reduce((a, c) => +a + +c.qty, 0)} items)
        :
         $ {subTotal}

         
      </h4>
      <h4>
      Shipping: $ {shippingPrice}
      </h4>
      <h4>
      Service Fee: $ {serviceFee}
      </h4>
      <h4>
      Total : $ {total} HKD
      </h4>

      </div>    
      <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
        Proceed to Checkout
      </button>

  </div>
}

export default CartScreen;