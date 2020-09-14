import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen(props) {

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    props.history.push('payment');
  }
  return <div>
    <CheckoutSteps step1 step2 ></CheckoutSteps>
    <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Shipping</h2>
          </li>
          <li>
            <label htmlFor="name">
              Name
          </label>
            <input type="text" name="name" id="frmNameA" placeholder="Full Name" required autocomplete="name" onChange={(e) => setCity(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="frmPhoneNumA">
              Contact Number
          </label>
            <input type="tel" name="phone" id="frmPhoneNumA" placeholder="95675678" required autocomplete="tel" onChange={(e) => setPostalCode(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="frmAddressS">
              Address
          </label>
            <input type="text" name="ship-address" id="frmAddressS" placeholder="Flat 20A, 20/F, Tower 11 Example Bay TAI KOK TSUI KOWLOON" required autocomplete="shipping street-address" onChange={(e) => setAddress(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="text">
              Special Requests (if any)
          </label>
            <input type="text" name="text" id="text" onChange={(e) => setCountry(e.target.value)}>
            </input>
          </li>


          <li>
            <button type="submit" className="button primary">Continue</button>
          </li>

        </ul>
      </form>
    </div>
  </div>

}
export default ShippingScreen;