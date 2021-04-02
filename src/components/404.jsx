import React, { Component } from "react";
import oliverTwist from '../utility/images/404kid.png';
import '../utility/css/404.css';


class NotFoundPage extends Component {
    state = {}


    render() {
        return (
            <div className="error-page">
                <div>
                    <h2>Oops!</h2>
                    <p> Something went wrong. Please try to relogin.<br />
                    Doesn't work ?? try again later. </p>
                </div>

                <div>
                    <img src={oliverTwist} alt="oliverTwist" />
                </div>
            </div>
        );
    }
}

export default NotFoundPage;