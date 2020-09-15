import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class AboutUsScreen extends Component {

  render() {
    return (
      <React.Fragment>
      <div className="back-to-result">
      <Link to="/">&#8592;Back to Results</Link>
      </div>
            <div className="about-section">
            <h2>About Us</h2>
            <h4>We at Tiny Teasures would like to help your tiny ones find the best products at the most reasonable prices possible. After having my little one, I realized having kids is costly ! I wanted to open up a shop whereby I can help source the best bargains for your little ones! </h4>

            <h2>Shipping Fees</h2>
            <h4>SF express will be used to deliver all items to you, it will take around 7 to 10 days for the items to arrive. The minimum shipping fee is 28 HKD.</h4>

            <h2>Terms and Conditions:</h2>
            <h4>Please note Tiny Treasures Hong Kong is not liable for any items that may not be of a high standard or if there is any damage to it. I will do my best to reslove any problems and will waive the service fee should you wish to re-order the same item.
            If any items have been damaged then please take a photo and keep the packaging. Any items that needs to be sent back will have to be paid by you. 
            </h4>
      </div>
  </React.Fragment>
    )
  }
}
