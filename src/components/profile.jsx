import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Swal from 'sweetalert2';

import { BsFillXCircleFill } from "react-icons/bs";

import noPic from '../utility/images/noPic.jpg'

import '../utility/css/profile.css';

class Profile extends Component {
    state = { myRecipes: [], user_info: null, faivorit_list: [], faivorit_recipes: [] }


    componentDidMount() {
        this.getUserRecipes();
        this.getUserInfo();
        this.getUserFavoriteRecipes();

    };

    getUserInfo = () => {
        var user = this.props.user.user_info;
        this.setState({ user_info: user });
    };

    getUserRecipes = () => {
        var myRecipes = this.state.myRecipes;
        var self = this;
        var token = this.props.user.token;

        axios.get('http://localhost:4000/userRecipes', {
            headers: {
                'x-auth-token': token
            }
        })
            .then(function (res) {
                // console.log(res.data)
                let temp_arr = res.data;
                self.setState({ myRecipes: temp_arr });


            }).catch(error => {
                console.log(error)
                // alert("token exp make 404 page")
                window.location.href="http://localhost:3000/404"
            });

    };

    getUserFavoriteRecipes = () => {
        var token = this.props.user.token;
        var self = this;

        // console.log(token)

        axios.get('http://localhost:4000/userFavoriteRecipes', {
            headers: {
                'x-auth-token': token
            }
        })
            .then(function (res) {
                self.setState({ faivorit_list: res.data[0].favorites })
                self.FavoriteRecipes();
            }).catch(error => {
                console.log(error)
                // alert("token exp make 404 page")
                window.location.href="http://localhost:3000/404"

            });
    };

    FavoriteRecipes = () => {
        var faivorit_list = this.state.faivorit_list;
        var faivorit_recipes = [...this.state.faivorit_recipes];
        var self = this;

        faivorit_list.forEach(data_item => {
            var id = data_item.recipeID;

            axios.get('http://localhost:4000/singleRecipe', { params: { id } })
                .then(function (res) {
                    faivorit_recipes.push({ item: res.data[0] });
                    self.setState({ faivorit_recipes })

                }).catch(error => {
                    console.log(error)
                });
        });
    };


    delFromFavi = (item, index) => {
        var faivorit_recipes = this.state.faivorit_recipes;
        // console.log(faivorit_recipes)
        // console.log(index)

        Swal.fire({
            title: 'Are you sure?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                // if yes
                var token = this.props.user.token;
                var self = this;
                var data = {
                    recipeID: item
                };

                axios.post('http://localhost:4000/delFromFavorites', data, {
                    headers: {
                        'x-auth-token': token
                    },
                }).then(function (res) {
                    // console.log(res);

                    toast.success('removed', {
                        position: "bottom-right",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        className: "favi-y-toast"
                    });

                    var temp_arr = self.state.faivorit_recipes;

                    temp_arr.splice(index, 1);

                    self.setState({ faivorit_recipes: temp_arr });

                }).catch(error => {
                    console.log(error)

                    toast.error('something went wrong try again later', {
                        position: "bottom-right",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        className: "favi-n-toast"
                    });
                });
            };
        });


    };

    deleteRecipe = (rec_id, index) => {

        var myRecipes = this.state.myRecipes;

        Swal.fire({
            title: 'Are you sure?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {

                var token = this.props.user.token;
                var self = this;
                var data = {
                    recipeID: rec_id
                };

                axios.post('http://localhost:4000/deleteRecipes', data, {
                    headers: {
                        'x-auth-token': token
                    },
                }).then(function (res) {
                    // console.log(res);

                    toast.success('deleted', {
                        position: "bottom-right",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        className: "del-recipe-y-toast"
                    });

                    var temp_arr = myRecipes;

                    temp_arr.splice(index, 1);

                    self.setState({ myRecipes: temp_arr });

                }).catch(error => {
                    console.log(error)

                    toast.error('something went wrong try again later', {
                        position: "bottom-right",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        className: "del-recipe-n-toast"
                    });
                });
            }
        });
    };


    avgRating = (arr) => {
        // console.log(arr)  

        let sum = 0;
        let length = arr.length;
        let avg = 0;
        let rating_avg = 0;

        arr.forEach(each => {
            // console.log(each.Stars);
            sum += each.Stars;
            avg = parseInt(sum / length)
            rating_avg = Math.round(avg);
        });

        //  console.log(rating_avg)

        if (rating_avg <= 0) {
            return (<div>
                <span className="l-star-off"> ★ </span>
                <span className="l-star-off"> ★ </span>
                <span className="l-star-off"> ★ </span>
                <span className="l-star-off"> ★ </span>
                <span className="l-star-off"> ★ </span>
            </div>
            )

        } else if (rating_avg == 1) {
            return (<div>
                <span className="l-star-on"> ★ </span>
                <span className="l-star-off"> ★ </span>
                <span className="l-star-off"> ★ </span>
                <span className="l-star-off"> ★ </span>
                <span className="l-star-off"> ★ </span>
            </div>
            )

        } else if (rating_avg == 2) {
            return (<div>
                <span className="l-star-on"> ★ </span>
                <span className="l-star-on"> ★ </span>
                <span className="l-star-off"> ★ </span>
                <span className="l-star-off"> ★ </span>
                <span className="l-star-off"> ★ </span>
            </div>
            )
        } else if (rating_avg == 3) {
            return (<div>
                <span className="l-star-on"> ★ </span>
                <span className="l-star-on"> ★ </span>
                <span className="l-star-on"> ★ </span>
                <span className="l-star-off"> ★ </span>
                <span className="l-star-off"> ★ </span>
            </div>
            )
        } else if (rating_avg == 4) {
            return (<div>
                <span className="l-star-on"> ★ </span>
                <span className="l-star-on"> ★ </span>
                <span className="l-star-on"> ★ </span>
                <span className="l-star-on"> ★ </span>
                <span className="l-star-off"> ★ </span>
            </div>
            )
        } else if (rating_avg >= 5) {
            return (<div>
                <span className="l-star-on"> ★ </span>
                <span className="l-star-on"> ★ </span>
                <span className="l-star-on"> ★ </span>
                <span className="l-star-on"> ★ </span>
                <span className="l-star-on"> ★ </span>
            </div>
            )
        } else {
            return (<div>
                <span className="l-star-off"> ★ </span>
                <span className="l-star-off"> ★ </span>
                <span className="l-star-off"> ★ </span>
                <span className="l-star-off"> ★ </span>
                <span className="l-star-off"> ★ </span>
            </div>
            )
        };

    };



    render() {
        var serverURL = "http://localhost:4000/";
        var myRecipes = this.state.myRecipes;
        var user = this.state.user_info;
        var faivorit_recipes = this.state.faivorit_recipes;
        var faivorit_list = this.state.faivorit_list;


        return (
            <div>
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

                <div className="welcome-user center-flex y-color">
                    <h2> Hello {!user ? null : <span>  {user.userName} </span>}</h2>
                </div>

                <div className="add-new-recipe center-flex">
                    <Link className="link" to="/newRecipe">
                       Create Your Own Recipe +
                    </Link>
                </div>



                <div className="mt-4">
                    <div className="sub-head">
                        <h3 className="y-color"> my recipes </h3>
                    </div>
                    {myRecipes.length == 0 ? <p className="sub-head">no recipes written</p> :
                        <div className="my_recipes">

                            {myRecipes.map((item, index) => (

                                <div className="recipe-card search-res" key={index}>


                                    <div className="box-img" >
                                        <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + item._id, state: item._id }}>
                                            <div>

                                                {!item.Image
                                                    ? <img src={noPic} alt="no pic" />
                                                    : <img src={serverURL + item.Image} alt={item.Title} />}

                                            </div>
                                        </Link>
                                    </div>


                                    <div className="box-body">

                                        <div className="res-row justify-content-between mt-1">
                                            <div className="rank">

                                                {item.Rating.length == 0
                                                    ? <div key={index} className="stars-show">
                                                        <span className="l-star-off"> ★ </span>
                                                        <span className="l-star-off"> ★ </span>
                                                        <span className="l-star-off"> ★ </span>
                                                        <span className="l-star-off"> ★ </span>
                                                        <span className="l-star-off"> ★ </span>
                                                    </div>

                                                    : this.avgRating(item.Rating)

                                                }
                                            </div>


                                            <div>
                                                <div className="del-btn" type="button" onClick={() => this.deleteRecipe(item._id, index)} title="delete recipe"><BsFillXCircleFill /></div>
                                            </div>




                                        </div>


                                        <div >
                                            <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + item._id, state: item._id }}>
                                                <h5> {item.Title} </h5>
                                            </Link>
                                        </div>

                                    </div>


                                </div>
                            ))}
                        </div>}
                </div>



                <div className="mt-3">

                    <div className="sub-head d-flex">
                        <h3 className="y-color"> my favorites </h3>
                        <span className="ml-3 mt-2">(items may be deleted by the original author)</span>
                    </div>
                    {faivorit_recipes.length == 0 || !faivorit_recipes
                        ? <p className="sub-head"> no favorites were chosen</p>
                        : <div className="my_recipes">

                            {faivorit_recipes.map((recipe, index) => (

                                <div key={index}>
                                    {!recipe.item ?
                                        null
                                        :

                                        <div className="recipe-card search-res" key={index}>


                                            <div className="box-img" >
                                                <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe.item._id, state: recipe.item._id }}>
                                                    <div>
                                                        {!recipe.item.Image
                                                            ? <img src={noPic} alt="no pic" />
                                                            : <img src={serverURL + recipe.item.Image} alt={recipe.item.Title} />
                                                        }
                                                    </div>
                                                </Link>
                                            </div>


                                            <div className="box-body">

                                                <div className="res-row justify-content-between mt-1">
                                                    <div className="rank">

                                                        {recipe.item.Rating.length == 0
                                                            ? <div key={index} className="stars-show">
                                                                <span className="l-star-off"> ★ </span>
                                                                <span className="l-star-off"> ★ </span>
                                                                <span className="l-star-off"> ★ </span>
                                                                <span className="l-star-off"> ★ </span>
                                                                <span className="l-star-off"> ★ </span>
                                                            </div>

                                                            : this.avgRating(recipe.item.Rating)

                                                        }
                                                    </div>


                                                    <div>
                                                        <div className="del-btn" type="button" onClick={() => this.delFromFavi(recipe.item._id, index)} title="remove from favi"><BsFillXCircleFill /></div>
                                                    </div>




                                                </div>


                                                <div >
                                                    <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe.item._id, state: recipe.item._id }}>
                                                        <h5> {recipe.item.Title} </h5>
                                                    </Link>
                                                </div>

                                            </div>

                                        </div>

                                    }
                                </div>


                            ))}


                        </div>}


                </div>


            </div>

        );
    }
}

export default Profile;