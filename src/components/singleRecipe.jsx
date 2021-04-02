import React, { Component } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiHash } from "react-icons/fi";

import noPic from '../utility/images/noPic.jpg';
import milk from '../utility/images/milk.png';

import '../utility/css/singleRecipe.css';

class SingleRecipe extends Component {
    state = { recipe_id: "", user_id: "", recipe_info: [], user_info: [], user_logged: null, rating_avg: "", review: "", rate: null, Rating: [] }



    componentDidMount() {

        let urlid = this.props.location.search.split('=').pop()
        console.log(this.props.location)

        if (!urlid) {

            if (!this.props.location.state.r_id) {
                var recipeID = this.props.location.state;
                this.setState({ recipe_id: recipeID });
                var id = recipeID;
            } else {
                var recipeID = this.props.location.state.r_id;
                this.setState({ recipe_id: recipeID });
                var id = recipeID;
                var logged = this.props.location.state.logged;
                this.setState({ user_logged: logged });

            };

        } else {
            var recipeID = urlid;
            this.setState({ recipe_id: recipeID });
            var id = recipeID;
        };

        var self = this;

        axios.get('http://localhost:4000/singleRecipe', { params: { id } })
            .then(function (res) {
                let recipe_info = res.data[0];
                self.setState({ recipe_info: recipe_info });
                var userID = recipe_info.UthorID;
                self.setState({ user_id: userID });

                self.genUser();
                self.avgRatingAndReview();



            }).catch(error => {
                console.log(error)
            });



    };

    genUser = () => {
        var user_id = this.state.user_id;
        var self = this;

        axios.get('http://localhost:4000/singelUser', { params: { user_id } })
            .then(function (res) {
                // console.log(res.data)
                self.setState({ user_info: res.data });

            }).catch(error => {
                console.log(error)
            });

    };

    avgRatingAndReview = () => {
        var recipe_info = this.state.recipe_info;
        var sum = 0;
        var length = 0;
        var user_id;

        recipe_info.Rating.forEach(rat => {
            sum += parseInt(rat.Stars);
            length = recipe_info.Rating.length;
            user_id = rat.User;


        });

        var avg = sum / length;
        var rating_avg = Math.round(avg);
        this.setState({ rating_avg: rating_avg });


    };

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
        console.log({ [event.target.name]: event.target.value })


    };

    sendReview = () => {
        var rate = this.state.rate;
        var review = this.state.review;
        var recipe_info = this.state.recipe_info;
        var id = recipe_info._id;
        var user_info = this.state.user_info;


        if (!user_info[0]) {
            var name = "anonymos";
        } else {
            var name = user_info[0].userName
            //  console.log(user_info[0].userName)
        }


        var data = {
            recipe_id: id,
            Stars: parseInt(rate),
            Review: review,
            User: name
        };

        console.log(recipe_info)

        axios.post('http://localhost:4000/addReview', data
        ).then(function (res) {
            console.log(res);
            toast.success('send', {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: "review-y-toast"
            });

            window.location.reload()

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
                className: "review-n-toast"
            });
        });
    };




    render() {

        var serverURL = "http://localhost:4000/";

        var recipe_id = this.state.recipe_id;
        var recipe_info = this.state.recipe_info;
        var user_info = this.state.user_info;
        var rating_avg = this.state.rating_avg;              

        var html_stars;

        if (rating_avg <= 0) {
            html_stars = <div>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
            </div>

        } else if (rating_avg == 1) {
            html_stars = <div>
                <span className="star-on"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
            </div>

        } else if (rating_avg == 2) {
            html_stars = <div>
                <span className="star-on"> ★ </span>
                <span className="star-on"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
            </div>
        } else if (rating_avg == 3) {
            html_stars = <div>
                <span className="star-on"> ★ </span>
                <span className="star-on"> ★ </span>
                <span className="star-on"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
            </div>
        } else if (rating_avg == 4) {
            html_stars = <div>
                <span className="star-on"> ★ </span>
                <span className="star-on"> ★ </span>
                <span className="star-on"> ★ </span>
                <span className="star-on"> ★ </span>
                <span className="star-off"> ★ </span>
            </div>
        } else if (rating_avg >= 5) {
            html_stars = <div>
                <span className="star-on"> ★ </span>
                <span className="star-on"> ★ </span>
                <span className="star-on"> ★ </span>
                <span className="star-on"> ★ </span>
                <span className="star-on"> ★ </span>
            </div>
        } else {
            html_stars = <div> <span> no rating </span></div>
        };



        return (
            <div className="single-recipe">
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

                <div className="singel-container">

                    <div className="recipe">


                        <div className="recipe-head">
                            <div >
                                <h3 className="y-color"> {recipe_info.Title} </h3>
                                <p>{!recipe_info.Description ? <span> no description available </span> : <span>{recipe_info.Description}</span>}</p>
                            </div>

                            <div className="mt-3">
                                {!recipe_info.Image
                                    ? <img src={noPic} alt="no pic" />
                                    : <img src={serverURL + recipe_info.Image} alt={recipe_info.Title} />}

                                <div> publised by: {!user_info[0] ? <span> anonymos </span> : <span>{user_info[0].userName}</span>} , {recipe_info.Date} </div>

                                <div>  {!rating_avg ? <span> no rating </span> : <span> {html_stars} </span>}</div>
                            </div>
                        </div>

                        <div className="mt-3">
                            <h5> Ingredients </h5>

                            {!recipe_info.Ingredients ? <p> no Ingredients listed</p> : recipe_info.Ingredients.map((item, index) => (
                                <div key={item._id} className="mb-2">
                                    <div>  <FiHash className="y-color" /> {item.ProductName} - {item.ProductQuantity}  {item.WeightType}
                                    </div>
                                </div>
                            ))}

                        </div>

                        <div className="mt-4">
                            <h5> Instructions </h5>

                            {!recipe_info.Instructions ? <p> no Instructions listed </p> : recipe_info.Instructions.map((item, index) => (
                                <div key={index} className="mb-3"><FiHash className="y-color" /> {item} </div>
                            ))}

                        </div>

                    </div>

                    <div className="commercial">
                        <div className="sticy">
                            <a href="https://mykolet-front.herokuapp.com/" target="_blank" className="commercial-link">
                                <div className="sticy-content" style={{ backgroundImage: `url(${milk})` }}>
                                    <div className="sticy-content-inner">
                                        <div>myKolet</div>
                                        <div>The Grocery Shopping List App</div>
                                        <div>CLICK HEAR!</div>
                                    </div>
                                </div>

                            </a>

                            {/* <img src={mykolet} alt="mykolet"/> */}
                        </div>
                    </div>

                </div>

                <div className="w-100">
                    <hr className="hr" />
                </div>

                <div className="mistake">
                    <a href="mailto:archibnanas@gmail.com?
                             &subject=recipe%mistake
                             &body=hello%i%20want%20to%20complain"> found a mistake? please tell us</a>
                </div>


                <div className="rating">

                    <div>leave a review</div>

                    <div className="review mt-2">
                        <input autoComplete="off" type="text" className="my-input w-50" id="review" name="review" onChange={this.handleChange} placeholder="leave review..." />
                    </div>

                    <div className="rate">
                        <input type="radio" id="star5" name="rate" value="5" onChange={this.handleChange} />
                        <label htmlFor="star5" title="5">5 stars</label>
                        <input type="radio" id="star4" name="rate" value="4" onChange={this.handleChange} />
                        <label htmlFor="star4" title="4">4 stars</label>
                        <input type="radio" id="star3" name="rate" value="3" onChange={this.handleChange} />
                        <label htmlFor="star3" title="3">3 stars</label>
                        <input type="radio" id="star2" name="rate" value="2" onChange={this.handleChange} />
                        <label htmlFor="star2" title="2">2 stars</label>
                        <input type="radio" id="star1" name="rate" value="1" onChange={this.handleChange} />
                        <label htmlFor="star1" title="1">1 star</label>
                    </div>

                    <br /><br />

                    <div>
                        <button className="post-review-btn" onClick={this.sendReview}> post </button>
                    </div>


                </div>

                <div>
                    {!recipe_info.Rating ? <span> no reviews listed</span> : recipe_info.Rating.map((item, index) => (
                        <div key={index}>
                            <div className="posts">
                                <div className="review-uthor">
                                    {item.Review}
                                </div>

                                <div className="review-details">
                                    {item.Date_Review} | by: {!item.User ? <span> anonymos </span> : <span> {item.User} </span>}
                                </div>
                            </div>


                        </div>
                    ))}
                </div>


            </div>

        );
    }
}

export default SingleRecipe;