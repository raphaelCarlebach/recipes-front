import React, { Component } from "react";

import logo from '../utility/images/logo.png'
import '../utility/css/footer.css';

class Footer extends Component {
    state = {}
    render() {
        return (
            <div className="footer-sec">
                <div className="w-75 mt-4">
                    <div className="center-flex">

                        <div className="footer-hr">
                            <hr/>                         
                        </div>

                        <div>
                            <img src={logo} alt="logo" />
                        </div>

                        <div className="footer-hr2">
                            <hr/>
                        </div>
                    </div>

                    <span className="ml-2"> © Raphael Carlebach 2021 </span>


                </div>
            </div>
        );
    }
}

export default Footer;