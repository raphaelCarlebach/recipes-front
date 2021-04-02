import React, { Component } from "react";
import axios from 'axios';
import Joi from 'joi-browser';

import Swal from 'sweetalert2';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../utility/css/registration.css';


class Registration extends Component {
    state = { login_email: '', login_password: '', sing_username: '', sing_email: '', sing_password: '', login_form: true, sing_Up_form: false }

    singSchema = {
        userName: Joi.string().required(),
        email: Joi.string().email().required(),
        pass: Joi.string().min(5).required()
    };

    loginSchema = {
        email: Joi.string().email().required(),
        pass: Joi.string().min(5).required()
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });

        // console.log("login_email:" + this.state.login_email)
        // console.log("login_password:" +this.state.login_password)
        // console.log("sing_username:" + this.state.sing_username)
        // console.log("sing_email:" + this.state.sing_email)
        // console.log("sing_password:" + this.state.sing_password)
    };

    handleSing = () => {

        var sing_username = this.state.sing_username;
        var sing_email = this.state.sing_email;
        var sing_password = this.state.sing_password;

        if (sing_username == "") {
            document.querySelector(".wonrnig-userN").style.display = "block";
        };

        if (sing_email == "") {
            document.querySelector(".wonrnig-Email2").style.display = "block";
        };

        if (sing_password == "") {
            document.querySelector(".wonrnig-Password2").style.display = "block";
        };



        let myUrl = "http://localhost:4000/regester";

        let data = {
            userName: this.state.sing_username,
            email: this.state.sing_email,
            pass: this.state.sing_password,
        }

        const valid = Joi.validate(data, this.singSchema, {
            abortEarly: false
        });

        if (valid.error) {
            console.log(valid.error);
            toast.error('invalid credentials', {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: "n-toast"
            });
            valid.error.details.forEach(err => {
                console.log(err.message);
                toast.error(err.message, {
                    position: "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    className: "n-toast"
                });
            })
            return;
        } else {
            axios({
                method: 'POST',
                url: myUrl,
                data: data
            })
                .then(myData => {
                    // alert("Sign success, please login now")
                    toast.success('Sign-up successfully, please login now', {
                        position: "bottom-right",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        className: "y-toast"
                    });
                    console.log(myData)
                    // window.location.href = "http://localhost:3000";
                })
                .catch(error => {
                    console.log(error.response)
                    if (error.response.data.code) {
                        toast.error("Email already in use, try another ", {
                            position: "bottom-right",
                            autoClose: 4000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            className: "n-toast"
                        });
                    }
                    else if (error.response.data[0].context.key == "email") {

                        toast.error("Email is not valid, enter anothe one", {
                            position: "bottom-right",
                            autoClose: 4000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            className: "n-toast"
                        });
                    }
                    else {

                        toast.error("there was a problem. please try try again!", {
                            position: "bottom-right",
                            autoClose: 4000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            className: "n-toast"
                        });
                        console.log(error.response)
                    }
                })
        }
    };

    handleLogin = () => {

        var login_email = this.state.login_email;
        var login_password = this.state.login_password

        if (login_email == "") {
            document.querySelector(".wonrnig-Email").style.display = "block";
        };

        if (login_password == "") {
            document.querySelector(".wonrnig-Password").style.display = "block";
        };

        let myUrl = "http://localhost:4000/login";

        let data = {
            email: this.state.login_email,
            pass: this.state.login_password,
        }

        const valid = Joi.validate(data, this.loginSchema, {
            abortEarly: false
        });

        if (valid.error) {
            console.log(valid.error);
            toast.error('invalid credentials', {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: "n-toast"
            });

            valid.error.details.forEach(err => {
                console.log(err.message);
                toast.error(err.message, {
                    position: "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    className: "n-toast"
                });
            })
            return;
        } else {
            axios({
                method: 'POST',
                url: myUrl,
                data: data
            })
                .then(myData => {
                    console.log(myData.data.user_info);
                    toast.success('logged in', {
                        position: "bottom-right",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        className: "y-toast"
                    });
                    localStorage.setItem("token", JSON.stringify(myData.data.user_info));
                    window.location.href = "http://localhost:3000";

                })
                .catch(error => {
                    toast.error('invalid email or password try agin', {
                        position: "bottom-right",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        className: "n-toast"
                    });
                })
        }


    };

    hadelTogelForm = (val) => {
        var login = this.state.login_form;
        var sing_in = this.state.sing_in_form;

        if (val == "L") {
            this.setState({ login_form: true });
            this.setState({ sing_Up_form: false });
        }

        if (val == "S") {
            this.setState({ login_form: false });
            this.setState({ sing_Up_form: true });
        }


    }

    render() {

        var login = this.state.login_form;
        var sing_in = this.state.sing_Up_form;

        return (

            <div className="registration" >

                <div className="toastim">
                    <ToastContainer
                        position="bottom-right"
                        autoClose={4000}
                        hideProgressBar={true}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>

                <div className="mt-5 reg-forms">

                    {login == true ?
                        <div className="login">


                            <div>
                                <h3 className="y-color"> Login</h3>
                            </div>

                            <div>
                                <form>
                                    <div>
                                        <div>
                                            <label className="ml-1">Email * </label>
                                        </div>
                                        <div>
                                            <input autoComplete="off" type="text" className="reg-input" placeholder="email@email.com" id="login_email" name="login_email" onChange={this.handleChange} />

                                        </div>
                                        <div>
                                            <span className="wonrnig-Email"> *Email is required </span>
                                        </div>

                                    </div>

                                    <div className="mt-3">
                                        <div>
                                            <label className="ml-1">Password * </label>
                                        </div>
                                        <div>
                                            <input type="password" className="reg-input" placeholder="Password" id="login_password" name="login_password" onChange={this.handleChange} />
                                        </div>

                                        <div>
                                            <span className="wonrnig-Password"> *Password is required </span>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <button type="button" id="login_btn" onClick={this.handleLogin} > login</button>
                                    </div>
                                </form>

                                <div className="mt-3 clikbel">
                                    <div onClick={() => this.hadelTogelForm("S")}>Don't have an account yet?  Sign Up</div>
                                </div>

                            </div>


                        </div>
                        :
                        <div className="alternative">
                            <h2 className="y-color" onClick={() => this.hadelTogelForm("L")}>Login</h2>
                        </div>}

                    {sing_in == true ?
                        <div className="sing-Up">
                            <div>
                                <h3 className="y-color"> Sing-Up</h3>

                            </div>
                            <div>
                                <form>
                                    <div>
                                        <div>
                                            <label className="ml-1">User name *</label>
                                        </div>
                                        <input type="text" className="reg-input" placeholder="name" id="sing_userName" onChange={this.handleChange} name="sing_username" />

                                        <div>
                                            <span className="wonrnig-userN"> *User name is required </span>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <div>
                                            <label className="ml-1">Email *</label>
                                        </div>
                                        <input type="email" className="reg-input" placeholder="email@email.com" id="sing_email" onChange={this.handleChange} name="sing_email" />

                                        <div>
                                            <span className="wonrnig-Email2"> *Email is required </span>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <div>
                                            <label className="ml-1">Password *</label>
                                        </div>
                                        <input type="password" className="reg-input" placeholder="Password" id="sing_password" onChange={this.handleChange} name="sing_password" />

                                        <div>
                                            <span className="wonrnig-Password2"> *Password is required </span>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <button type="button" id="sing_btn" onClick={this.handleSing}> sing-Up</button>
                                    </div>
                                </form>

                                <div className="mt-3 clikbel">
                                    <div onClick={() => this.hadelTogelForm("L")}>Already have an account? Login</div>
                                </div>

                            </div>
                        </div>

                        :
                        <div className="alternative">
                            <h2 className="y-color" onClick={() => this.hadelTogelForm("S")}>Sing-Up</h2>
                        </div>
                    }



                </div>

            </div>

        );
    }
}

export default Registration;