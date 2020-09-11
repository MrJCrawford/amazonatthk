import React, { Component } from 'react'


export default class AboutUsScreen extends Component {

  render() {
    return (
      <React.Fragment>
      <div className="about-section">
            <h2>About Us</h2>
            <h4>We at Tiny Treasures Hong Kong would like to help your tiny ones find the best products at the most reasonable prices possible.
            After having my little one, I noticed while shopping online, people were quoting wide prices and taking advantage of parents whom don't have the time or had difficulty accessing the platform and I wanted to offer my knowledge and services to help source the best bargains for your little ones!
            How does this works?</h4>
            <ol>
            <li className="about-section-list">If you wish to source something not on the product page, please message me directly on Facebook.</li>
            <li className="about-section-list">Go to "Products" - and you will see an array of photos/albums which I have uploaded on some of the treasures I have found that you might be interested in.</li>
            <li className="about-section-list">Simply add them to your cart then checkout and we will contact you shortly in regards to payment.</li>
            </ol>
            <h2>The Fees</h2>
            <ol>
            <li className="about-section-list">There is a 15% service charge PER ORDER.  The minimum fee is $15.  (i.e. - if you order multiple items, the fee will only be HK$15 until your order total is over HK$100 then its 15% s.c. thereafter)</li>
            <li className="about-section-list">I will be using SF Express Delivery and you will have to pay for the shipping fee upon the goods arriving (Note: I can offer you bulk shipping service - so delivery fees will be at a minimum)</li>
            <li className="about-section-list">Orders will be made upon receiving the full amount</li>
            </ol>
            <h2>T&C:</h2>
            <h4>Please note Tiny Treasures Hong Kong is not liable for any items that may not be of a high standard or if there is any damage to it. I will do my best to reslove any problems and will waive the service fee should you wish to re-order the same item.
            If any items have been damaged then please take a photo and keep the packaging. Any items that needs to be sent back will have to be paid by you. 
            </h4>

      </div>
  </React.Fragment>
    )
  }
}
