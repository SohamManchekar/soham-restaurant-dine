import React from 'react'
import "./css/footer.css"

const Footer = () => {
  return (
    <div className="footer-comp">
        <div className="footer-comp-head-text">
           Soham
        </div>
        <div className="footer-comp-main">
            <div className="rows">
                <div className="row">
                    <div className="col">
                        <ul className='col-ul'>
                            <h4>About Soham</h4>
                            <li className='col-ul-li'>About us</li>
                            <li className='col-ul-li'>Blog</li>
                            <li className='col-ul-li'>Report fraud</li>
                            <li className='col-ul-li'>Community</li>
                            <li className='col-ul-li'>Contact us</li>
                        </ul>
                    </div>
                    <div className="col">
                        <ul className='col-ul'>
                            <h4>Customer care</h4>
                            <li className='col-ul-li'>Privacy</li>
                            <li className='col-ul-li'>Terms</li>
                            <li className='col-ul-li'>Security</li>
                            <li className='col-ul-li'>Branches</li>
                        </ul>
                    </div>
                    <div className="col">
                        <ul className='col-ul'>
                            <h4>Social links</h4>
                            <li className='col-ul-li'><img className='col-ul-li-img' src="https://img.icons8.com/color/2x/twitter.png" alt="" title='Visit Twitter' /></li>
                            <li className='col-ul-li'><img className='col-ul-li-img' src="https://img.icons8.com/fluency/2x/facebook-new.png" alt="" title='Visit Facebook' /></li>
                            <li className='col-ul-li'><img className='col-ul-li-img' src="https://img.icons8.com/fluency/2x/instagram-new.png" alt="" title='Visit Instagram' /></li>
                        </ul>
                    </div>
                </div>
                <div className="download-section">
                    <div className="download-app-head-text">Download app from</div>
                    <div className="download-app-head-img">
                        <img className='download-app-from-gp' src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="" title="Download Soham from Google Play" />
                        <img className='download-app-from-as' src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="" title="Download Soham from App Store" />
                    </div>
                </div>
            </div>
        </div>
        <div className="copyright-text">
            You agree to our Terms of Service, Cookie Policy, Privacy Policy. © 2022, soham-restaurant-dine.netlify.app . All Rights Reserved.
        </div>
    </div>
  )
}

export default Footer