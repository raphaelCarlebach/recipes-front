import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../utility/images/logo.png'
import { FaBars } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import '../utility/css/header.css';


class Header extends Component {
    state = {}

    logoutFunc = () => {

        Swal.fire({
            title: 'Are you sure you want to log-out?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                window.location.href = "http://localhost:3000/registration";
            }
        })

        // localStorage.clear();
        // back to login
    };

    handelNavBar = () => {
        var element = document.querySelector(".alt-nav");

        if (element.style.display === "none") {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        };

    };

    render() {
        var { user } = this.props;
        var token = '';
        if (user) {
            token = user.token;
            var username = user.user_info.userName;
            // console.log(user)
        }

        return (

            <div className="w-100">
                <nav id="up">
                    <div className="links">
                        <div className="logo">
                            <Link to="/">
                                <img src={logo} alt="logo" />
                            </Link>
                        </div>

                        <div className="between">
                            <div className="links">
                                <div className="nav-item">
                                    <NavLink to="/">
                                        Home
                                </NavLink>
                                </div>

                                {token && (
                                    <div className="nav-item">
                                        <NavLink to="/profile">
                                            My Profile
                                </NavLink>
                                    </div>

                                )}

                                <div className="nav-item">
                                    <NavLink to="/about">
                                        About
                                </NavLink>
                                </div>
                               
                            </div>

                            <div className="links">
                                {token
                                    ? <div className="nav-item links">
                                        <div className="nav-item">
                                            <NavLink to="/profile">Hello {username} </NavLink>
                                        </div>
                                        <div className="nav-item">

                                            <a href="#" onClick={() => this.logoutFunc()} className="out-icon">  <FaSignOutAlt /> </a>
                                        </div>
                                    </div>

                                    : <div className="nav-item">
                                        <div className="nav-item">
                                            <NavLink to="/registration">registration</NavLink>
                                        </div>

                                    </div>
                                }

                                <div>
                                    <div className="burger clikbel" id="nav-btn" onClick={this.handelNavBar}>
                                        <FaBars className="burger-icon" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </nav>

                <div className="alt-nav" style={{ display: "none" }}>
                    <div className="center content">

                        <nav>
                            <div className="alt-nav-item">
                                <NavLink to="/">
                                    <h2 onClick={this.handelNavBar}>Home</h2>
                                </NavLink>
                            </div>

                            {token && (
                                <div className="alt-nav-item">
                                    <NavLink to="/profile">
                                        <h2 onClick={this.handelNavBar}>My Profile</h2>
                                    </NavLink>
                                </div>

                            )}

                            <div className="alt-nav-item">
                                <NavLink to="/about">
                                    <h2 onClick={this.handelNavBar}>About</h2>
                                </NavLink>
                            </div>

                           

                            {token
                                ?
                                <div className="alt-nav-item">
                                    <a href="#" onClick={() => this.logoutFunc()}> <h2 onClick={this.handelNavBar}> <FaSignOutAlt /></h2> </a>
                                </div>


                                :
                                <div className="alt-nav-item">
                                    <NavLink to="/registration"><h2 onClick={this.handelNavBar}>registration</h2></NavLink>
                                </div>
                            }
                        </nav>

                    </div>
                </div>
            </div>


        );
    }
}

export default Header;