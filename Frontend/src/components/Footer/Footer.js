import React, {Component} from "react";

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="inner-footer">
                    <div className="footer-items">
                        <h1>TRIP MAN</h1>
                        <p>
                            These tourism websites still have improvement to make in terms of featuring real-time social
                            activity and reaching visitors on mobile. But their design sense is right on and should be
                            an example to destinations still stuck in the era of online brochures.
                        </p>
                    </div>

                    <div className="footer-items">
                        <h2>Quick Links</h2>
                        <div className="border">
                        </div>
                        <ul>
                            <a href="">
                                <li>Places</li>
                            </a>
                            <a href="">
                                <li>New Places</li>
                            </a>
                            <a href="">
                                <li>Packages</li>
                            </a>
                            <a href="">
                                <li>Top Trips</li>
                            </a>
                        </ul>
                    </div>

                    <div className="footer-items">
                        <h2>PLACES</h2>
                        <div className="border">
                        </div>
                        <ul>
                            <a href="">
                                <li>Local</li>
                            </a>
                            <a href="">
                                <li>Adventure</li>
                            </a>
                            <a href="">
                                <li>Dangerous</li>
                            </a>
                            <a href="">
                                <li>Nature</li>
                            </a>
                        </ul>
                    </div>

                    <div className="footer-items">
                        <h2>Contact </h2>
                        <div className="border">
                        </div>
                        <ul>
                            <li><i className="fa fa-map-marker"></i>New Kandy Road, Malabe</li>
                            <li><i className="fa fa-phone"></i>034 2243456</li>
                            <li><i className="fa fa-envelope"></i>Support@gmail.com</li>
                        </ul>
                        <div className="social-media">
                            <a href=""><i className="fa fa-facebook" aria-hidden="true"></i></a>
                            <a href=""><i className="fa fa-twitter" aria-hidden="true"></i></a>
                            <a href=""><i className="fa fa-instagram" aria-hidden="true"></i></a>
                            <a href=""><i className="fa fa-google-plus" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    Copyright @copy; TRIP MAN 2020. All rights reserved.
                </div>
            </div>


        )
    }

}

export default Footer;
