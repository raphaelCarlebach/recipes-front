import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';

// import AOS from 'aos';
// import "aos/dist/aos.css"

// icons
import { FaThumbsUp, FaAngleDoubleUp } from 'react-icons/fa';

import noPic from '../utility/images/noPic.jpg'

import '../utility/css/main.css';


class Main extends Component {
    state = {
        recipes: [],
        searchInput: "",
        search_opsions: [],
        category_recipes: [],
        categorys: ["Vegen", "Milk", "Salads", "Soups", "Desserts", "Breads", "Pasta", "Drinks", "Meat"],
        Vegen_cat: [],
        Milk_cat: [],
        Salads_cat: [],
        Soups_cat: [],
        Desserts_cat: [],
        Breads_cat: [],
        Pasta_cat: [],
        Drinks_cat: [],
        Meat_cat: [],
        loading: true
    }



    componentDidMount() {

        this.getAllRecipes();

        if (!this.props.user) {
            console.log(this.props.user)
        } else {
            this.getUserInfo()
        };

        this.scrollfunc();
    };

    getAllRecipes = () => {
        var self = this;

        axios.get('http://localhost:4000/allRecipes')
            .then(function (res) {
                let temp_arr = res.data;
                self.setState({ recipes: temp_arr });
                // self.setState({ loading: false });

            }).catch(error => {
                console.log(error)


            });

        this.getRecopeByCategory()
    };

    getUserInfo = () => {
        var user = this.props.user.user_info;
        this.setState({ user_info: user });
        // console.log(user)
    };

    addToFavorites = (recipe, index) => {
        var recipe_id = recipe._id
        var token = this.props.user.token;
        var data = { recipeID: recipe_id };

        axios.post('http://localhost:4000/addToFavorites', data, {
            headers: {
                'x-auth-token': token
            },
        }).then(function (res) {
            console.log(res);
            toast.success('recipe added to faivorits', {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: "favi-y-toast"
            });

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

    searchInput = (event) => {
        var recipe_name = this.state.searchInput;
        var recipes = this.state.recipes;

        // this.setState({ loading: true });

        var result = recipes.filter(item => item.Title.toLowerCase().includes(event.target.value));
        var opsions = result;

        if (!event.target.value) {
            this.setState({ search_opsions: [] })
            // this.setState({ loading: false });
        } else {
            this.setState({ search_opsions: opsions })
            // this.setState({ loading: false });
        }


    };


    getRecopeByCategory = () => {
        // get all = recipes_arr;
        var categorys = this.state.categorys
        var self = this;

        categorys.forEach(category => {
            var category = category;
            var cat_name = category + "_cat";

            axios.get('http://localhost:4000/catRecipes', { params: { category } })
                .then(function (res) {
                    // console.log(res.data)
                    self.setState({ [cat_name]: res.data });
                    setTimeout(
                        () => self.setState({ loading: false }),
                        1000
                    );

                    //  self.setState({ loading: false });

                }).catch(error => {
                    console.log(error)
                });
        });

    };

    scrollfunc = () => {
        var up = document.getElementById("scroll-up");

        window.onscroll = function () { scrollFunction() };

        function scrollFunction() {
            if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
                up.style.display = "block";
            } else {
                up.style.display = "none";
            }
        };
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

        var search_opsions = this.state.search_opsions;

        var category_recipes = this.state.category_recipes;

        var Vegen_cat = this.state.Vegen_cat;
        var Milk_cat = this.state.Milk_cat;
        var Salads_cat = this.state.Salads_cat;
        var Soups_cat = this.state.Soups_cat;
        var Desserts_cat = this.state.Desserts_cat;
        var Breads_cat = this.state.Breads_cat;
        var Pasta_cat = this.state.Pasta_cat;
        var Drinks_cat = this.state.Drinks_cat;
        var Meat_cat = this.state.Meat_cat;
        var recipes_arr = this.state.recipes;

        var slideOptions = {
            type: 'loop',
            perPage: 6,
            perMove: 1,
            breakpoints: {
                1200: {
                    perPage: 5,
                },
                992: {
                    perPage: 4,
                },
                768: {
                    perPage: 3,
                },
                576: {
                    perPage: 2,
                    perMove: 2,
                },
            }
        };

        var loading = this.state.loading;


        return (
            <div className="container-main">

                <div className="extra">

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

                    <div>
                        <a href="#up" id="scroll-up" title="go up"><FaAngleDoubleUp /></a>
                    </div>

                </div>


                {/* <div className="loding">
                    <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div> */}


                {loading == true ?
                    <div className="loding">
                        <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                    :
                    <div id="content">


                        <div className="center-flex">

                            <input autoComplete="off" id="searchInput" type="text" placeholder="search a recipe....." name="searchInput" onChange={this.searchInput} />

                        </div>

                        <div>

                            {search_opsions.length == 0 ?
                                <div>


                                    <div id="nav-menu">
                                        <div className="nav-btns">
                                            <a href="#all" className="cat_name  btn-yellow"  >All</a>
                                            <a href="#Vegen" className="cat_name  btn-yellow" >Vegan</a>
                                            <a href="#Milk" className="cat_name  btn-yellow" >Dairy</a>
                                            <a href="#Salads" className="cat_name  btn-yellow" >Salads</a>
                                            <a href="#Soups" className="cat_name  btn-yellow" >Soups</a>
                                            <a href="#Desserts" className="cat_name  btn-yellow" >Desserts</a>
                                            <a href="#Breads" className="cat_name  btn-yellow" >Breads</a>
                                            <a href="#Pasta" className="cat_name  btn-yellow" >Pasta</a>
                                            <a href="#Drinks" className="cat_name  btn-yellow" >Drinks</a>
                                            <a href="#Meat" className="cat_name  btn-yellow" >Meat</a>
                                        </div>

                                    </div>

                                    <div id="all" className="slider-section mt-5">

                                        <div className="category-head">
                                            <Link className="category-link" to={{ pathname: "/category/?=all" }}>
                                                All  <span className="view-more">- view more</span>
                                            </Link>
                                        </div>


                                        <Splide
                                            options={slideOptions}

                                        >
                                            {recipes_arr.map((recipe, index) => (

                                                <SplideSlide key={recipe._id}>

                                                    <div className="recipe-box">


                                                        <div className="box-img" >
                                                            <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                                <div>
                                                                    {!recipe.Image ?
                                                                        <img src={noPic} alt="no pic" />
                                                                        :
                                                                        <img src={serverURL + recipe.Image} alt={recipe.Title} />
                                                                    }
                                                                </div>
                                                            </Link>
                                                        </div>


                                                        <div className="box-body">

                                                            <div className="d-flex justify-content-between">
                                                                <div className="rank">

                                                                    {recipe.Rating.length == 0
                                                                        ? <div key={index} className="stars-show">
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                        </div>

                                                                        : this.avgRating(recipe.Rating)

                                                                    }
                                                                </div>


                                                                <div className="like">
                                                                    {!this.props.user
                                                                        ? <button disabled className="btn  like-btn not-allowed" type="button" ><FaThumbsUp />  </button>

                                                                        : <button className="btn like-btn" type="button" onClick={() => this.addToFavorites(recipe, index)}><FaThumbsUp />  </button>}

                                                                </div>
                                                            </div>


                                                            <div >
                                                                <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                                    <h5> {recipe.Title} </h5>
                                                                </Link>
                                                            </div>

                                                        </div>


                                                    </div>
                                                </SplideSlide>
                                            ))}


                                        </Splide>
                                    </div>

                                    <div id="Vegen" className="slider-section">

                                        <div className="category-head">
                                            <Link className="category-link" to={{ pathname: "/category/?=Vegen" }}>
                                                Vegan <span className="view-more">- view more</span>
                                            </Link>
                                        </div>



                                        <Splide
                                            options={slideOptions}

                                        >
                                            {Vegen_cat.map((recipe, index) => (
                                                <SplideSlide key={recipe._id}>
                                                    <div className="recipe-box" >


                                                        <div className="box-img" >
                                                            <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                                <div>
                                                                    {!recipe.Image ?
                                                                        <img src={noPic} alt="no pic" />
                                                                        :
                                                                        <img src={serverURL + recipe.Image} alt={recipe.Title} />
                                                                    }
                                                                </div>
                                                            </Link>
                                                        </div>


                                                        <div className="box-body">

                                                            <div className="d-flex justify-content-between">
                                                                <div className="rank">

                                                                    {recipe.Rating.length == 0
                                                                        ? <div key={index} className="stars-show">
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                        </div>

                                                                        : this.avgRating(recipe.Rating)

                                                                    }
                                                                </div>


                                                                <div className="like">
                                                                    {!this.props.user
                                                                        ? <button disabled className="btn  like-btn not-allowed" type="button" ><FaThumbsUp />  </button>

                                                                        : <button className="btn like-btn" type="button" onClick={() => this.addToFavorites(recipe, index)}><FaThumbsUp />  </button>}

                                                                </div>
                                                            </div>


                                                            <div >
                                                                <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                                    <h5> {recipe.Title} </h5>
                                                                </Link>
                                                            </div>

                                                        </div>


                                                    </div>
                                                </SplideSlide>
                                            ))}


                                        </Splide>
                                    </div>



                                    <div id="Pasta" className="slider-section">


                                        <div className="category-head">
                                            <Link className="category-link" to={{ pathname: "/category/?=Pasta" }}>
                                                Pasta <span className="view-more">- view more</span>
                                            </Link>
                                        </div>

                                        <Splide
                                            options={slideOptions}

                                        >
                                            {Pasta_cat.map((recipe, index) => (
                                                <SplideSlide key={recipe._id}>
                                                    <div className="recipe-box" >


                                                        <div className="box-img" >
                                                            <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                                <div>
                                                                    {!recipe.Image ? <img src={noPic} alt="no pic" />
                                                                        : <img src={serverURL + recipe.Image} alt={recipe.Title} />
                                                                    }
                                                                </div>
                                                            </Link>
                                                        </div>


                                                        <div className="box-body">

                                                            <div className="d-flex justify-content-between">
                                                                <div className="rank">

                                                                    {recipe.Rating.length == 0
                                                                        ? <div key={index} className="stars-show">
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                        </div>

                                                                        : this.avgRating(recipe.Rating)

                                                                    }
                                                                </div>


                                                                <div className="like">
                                                                    {!this.props.user
                                                                        ? <button disabled className="btn  like-btn not-allowed" type="button" ><FaThumbsUp />  </button>

                                                                        : <button className="btn like-btn" type="button" onClick={() => this.addToFavorites(recipe, index)}><FaThumbsUp />  </button>}

                                                                </div>
                                                            </div>


                                                            <div >
                                                                <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                                    <h5> {recipe.Title} </h5>
                                                                </Link>
                                                            </div>

                                                        </div>


                                                    </div>
                                                </SplideSlide>
                                            ))}


                                        </Splide>
                                    </div>

                                    <div id="Salads" className="slider-section">

                                        <div className="category-head">
                                            <Link className="category-link" to={{ pathname: "/category/?=Salads" }}>
                                                Salads <span className="view-more">- view more</span>
                                            </Link>
                                        </div>


                                        <Splide
                                            options={slideOptions}

                                        >
                                            {Salads_cat.map((recipe, index) => (
                                                <SplideSlide key={recipe._id}>
                                                    <div className="recipe-box" >


                                                        <div className="box-img" >
                                                            <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                                <div>
                                                                {!recipe.Image ? <img src={noPic} alt="no pic" />
                                                                        : <img src={serverURL + recipe.Image} alt={recipe.Title} />
                                                                    }
                                                                </div>
                                                            </Link>
                                                        </div>


                                                        <div className="box-body">

                                                            <div className="d-flex justify-content-between">
                                                                <div className="rank">

                                                                    {recipe.Rating.length == 0
                                                                        ? <div key={index} className="stars-show">
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                        </div>

                                                                        : this.avgRating(recipe.Rating)

                                                                    }
                                                                </div>


                                                                <div className="like">
                                                                    {!this.props.user
                                                                        ? <button disabled className="btn  like-btn not-allowed" type="button" ><FaThumbsUp />  </button>

                                                                        : <button className="btn like-btn" type="button" onClick={() => this.addToFavorites(recipe, index)}><FaThumbsUp />  </button>}

                                                                </div>
                                                            </div>


                                                            <div >
                                                                <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                                    <h5> {recipe.Title} </h5>
                                                                </Link>
                                                            </div>

                                                        </div>


                                                    </div>
                                                </SplideSlide>
                                            ))}


                                        </Splide>
                                    </div>

                                    <div id="Meat" className="slider-section">


                                        <div className="category-head">
                                            <Link className="category-link" to={{ pathname: "/category/?=Meat" }}>
                                                Meat<span className="view-more">- view more</span>
                                            </Link>
                                        </div>


                                        <Splide
                                            options={slideOptions}

                                        >
                                            {Meat_cat.map((recipe, index) => (
                                                <SplideSlide key={recipe._id}>
                                                    <div className="recipe-box" >


                                                        <div className="box-img" >
                                                            <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                                <div>
                                                                {!recipe.Image ? <img src={noPic} alt="no pic" />
                                                                        : <img src={serverURL + recipe.Image} alt={recipe.Title} />
                                                                    }
                                                                </div>
                                                            </Link>
                                                        </div>


                                                        <div className="box-body">

                                                            <div className="d-flex justify-content-between">
                                                                <div className="rank">

                                                                    {recipe.Rating.length == 0
                                                                        ? <div key={index} className="stars-show">
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                        </div>

                                                                        : this.avgRating(recipe.Rating)

                                                                    }
                                                                </div>


                                                                <div className="like">
                                                                    {!this.props.user
                                                                        ? <button disabled className="btn  like-btn not-allowed" type="button" ><FaThumbsUp />  </button>

                                                                        : <button className="btn like-btn" type="button" onClick={() => this.addToFavorites(recipe, index)}><FaThumbsUp />  </button>}

                                                                </div>
                                                            </div>


                                                            <div >
                                                                <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                                    <h5> {recipe.Title} </h5>
                                                                </Link>
                                                            </div>

                                                        </div>


                                                    </div>
                                                </SplideSlide>
                                            ))}


                                        </Splide>
                                    </div>

                                    <div id="Breads" className="slider-section">


                                        <div className="category-head">
                                            <Link className="category-link" to={{ pathname: "/category/?=Breads" }}>
                                                Breads<span className="view-more">- view more</span>
                                            </Link>
                                        </div>


                                        <Splide
                                            options={slideOptions}

                                        >
                                            {Breads_cat.map((recipe, index) => (
                                                <SplideSlide key={recipe._id}>
                                                    <div className="recipe-box" >


                                                        <div className="box-img" >
                                                            <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                                <div>
                                                                {!recipe.Image ? <img src={noPic} alt="no pic" />
                                                                        : <img src={serverURL + recipe.Image} alt={recipe.Title} />
                                                                    }
                                                                </div>
                                                            </Link>
                                                        </div>


                                                        <div className="box-body">

                                                            <div className="d-flex justify-content-between">
                                                                <div className="rank">

                                                                    {recipe.Rating.length == 0
                                                                        ? <div key={index} className="stars-show">
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                        </div>

                                                                        : this.avgRating(recipe.Rating)

                                                                    }
                                                                </div>


                                                                <div className="like">
                                                                    {!this.props.user
                                                                        ? <button disabled className="btn  like-btn not-allowed" type="button" ><FaThumbsUp />  </button>

                                                                        : <button className="btn like-btn" type="button" onClick={() => this.addToFavorites(recipe, index)}><FaThumbsUp />  </button>}

                                                                </div>
                                                            </div>


                                                            <div >
                                                                <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                                    <h5> {recipe.Title} </h5>
                                                                </Link>
                                                            </div>

                                                        </div>


                                                    </div>
                                                </SplideSlide>
                                            ))}


                                        </Splide>
                                    </div>

                                    <div id="Soups" className="slider-section">


                                        <div className="category-head">
                                            <Link className="category-link" to={{ pathname: "/category/?=Soups" }}>
                                                Soups<span className="view-more">- view more</span>
                                            </Link>
                                        </div>


                                        <Splide
                                            options={slideOptions}

                                        >
                                            {Soups_cat.map((recipe, index) => (
                                                <SplideSlide key={recipe._id}>
                                                    <div className="recipe-box" >


                                                        <div className="box-img" >
                                                            <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                                <div>
                                                                {!recipe.Image ? <img src={noPic} alt="no pic" />
                                                                        : <img src={serverURL + recipe.Image} alt={recipe.Title} />
                                                                    }
                                                                </div>
                                                            </Link>
                                                        </div>


                                                        <div className="box-body">

                                                            <div className="d-flex justify-content-between">
                                                                <div className="rank">

                                                                    {recipe.Rating.length == 0
                                                                        ? <div key={index} className="stars-show">
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                        </div>

                                                                        : this.avgRating(recipe.Rating)

                                                                    }
                                                                </div>


                                                                <div className="like">
                                                                    {!this.props.user
                                                                        ? <button disabled className="btn  like-btn not-allowed" type="button" ><FaThumbsUp />  </button>

                                                                        : <button className="btn like-btn" type="button" onClick={() => this.addToFavorites(recipe, index)}><FaThumbsUp />  </button>}

                                                                </div>
                                                            </div>


                                                            <div >
                                                                <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                                    <h5> {recipe.Title} </h5>
                                                                </Link>
                                                            </div>

                                                        </div>


                                                    </div>
                                                </SplideSlide>
                                            ))}


                                        </Splide>
                                    </div>

                                    <div id="Milk" className="slider-section">


                                        <div className="category-head">
                                            <Link className="category-link" to={{ pathname: "/category/?=Milk" }}>
                                                Dairy<span className="view-more">- view more</span>
                                            </Link>
                                        </div>


                                        <Splide
                                            options={slideOptions}

                                        >
                                            {Milk_cat.map((recipe, index) => (
                                                <SplideSlide key={recipe._id}>
                                                    <div className="recipe-box" >


                                                        <div className="box-img" >
                                                            <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                                <div>
                                                                {!recipe.Image ? <img src={noPic} alt="no pic" />
                                                                        : <img src={serverURL + recipe.Image} alt={recipe.Title} />
                                                                    }
                                                                </div>
                                                            </Link>
                                                        </div>


                                                        <div className="box-body">

                                                            <div className="d-flex justify-content-between">
                                                                <div className="rank">

                                                                    {recipe.Rating.length == 0
                                                                        ? <div key={index} className="stars-show">
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                        </div>

                                                                        : this.avgRating(recipe.Rating)

                                                                    }
                                                                </div>


                                                                <div className="like">
                                                                    {!this.props.user
                                                                        ? <button disabled className="btn  like-btn not-allowed" type="button" ><FaThumbsUp />  </button>

                                                                        : <button className="btn like-btn" type="button" onClick={() => this.addToFavorites(recipe, index)}><FaThumbsUp />  </button>}

                                                                </div>
                                                            </div>


                                                            <div >
                                                                <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                                    <h5> {recipe.Title} </h5>
                                                                </Link>
                                                            </div>

                                                        </div>


                                                    </div>
                                                </SplideSlide>
                                            ))}


                                        </Splide>
                                    </div>

                                    <div id="Desserts" className="slider-section">


                                        <div className="category-head">
                                            <Link className="category-link" to={{ pathname: "/category/?=Desserts" }}>
                                                Desserts<span className="view-more">- view more</span>
                                            </Link>
                                        </div>

                                        <Splide
                                            options={slideOptions}

                                        >
                                            {Desserts_cat.map((recipe, index) => (
                                                <SplideSlide key={recipe._id}>
                                                    <div className="recipe-box" >


                                                        <div className="box-img" >
                                                            <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                                <div>
                                                                {!recipe.Image ? <img src={noPic} alt="no pic" />
                                                                        : <img src={serverURL + recipe.Image} alt={recipe.Title} />
                                                                    }
                                                                </div>
                                                            </Link>
                                                        </div>


                                                        <div className="box-body">

                                                            <div className="d-flex justify-content-between">
                                                                <div className="rank">

                                                                    {recipe.Rating.length == 0
                                                                        ? <div key={index} className="stars-show">
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                        </div>

                                                                        : this.avgRating(recipe.Rating)

                                                                    }
                                                                </div>


                                                                <div className="like">
                                                                    {!this.props.user
                                                                        ? <button disabled className="btn  like-btn not-allowed" type="button" ><FaThumbsUp />  </button>

                                                                        : <button className="btn like-btn" type="button" onClick={() => this.addToFavorites(recipe, index)}><FaThumbsUp />  </button>}

                                                                </div>
                                                            </div>


                                                            <div >
                                                                <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                                    <h5> {recipe.Title} </h5>
                                                                </Link>
                                                            </div>

                                                        </div>


                                                    </div>
                                                </SplideSlide>
                                            ))}


                                        </Splide>
                                    </div>

                                    <div id="Drinks" className="slider-section">


                                        <div className="category-head">
                                            <Link className="category-link" to={{ pathname: "/category/?=Drinks" }}>
                                                Drinks<span className="view-more">- view more</span>
                                            </Link>
                                        </div>

                                        <Splide
                                            options={slideOptions}

                                        >
                                            {Drinks_cat.map((recipe, index) => (
                                                <SplideSlide key={recipe._id}>
                                                    <div className="recipe-box" >


                                                        <div className="box-img" >
                                                            <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                                <div>
                                                                {!recipe.Image ? <img src={noPic} alt="no pic" />
                                                                        : <img src={serverURL + recipe.Image} alt={recipe.Title} />
                                                                    }
                                                                </div>
                                                            </Link>
                                                        </div>


                                                        <div className="box-body">

                                                            <div className="d-flex justify-content-between">
                                                                <div className="rank">

                                                                    {recipe.Rating.length == 0
                                                                        ? <div key={index} className="stars-show">
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                            <span className="l-star-off"> ★ </span>
                                                                        </div>

                                                                        : this.avgRating(recipe.Rating)

                                                                    }
                                                                </div>


                                                                <div className="like">
                                                                    {!this.props.user
                                                                        ? <button disabled className="btn  like-btn not-allowed" type="button" ><FaThumbsUp />  </button>

                                                                        : <button className="btn like-btn" type="button" onClick={() => this.addToFavorites(recipe, index)}><FaThumbsUp />  </button>}

                                                                </div>
                                                            </div>


                                                            <div >
                                                                <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                                    <h5> {recipe.Title} </h5>
                                                                </Link>
                                                            </div>

                                                        </div>


                                                    </div>
                                                </SplideSlide>
                                            ))}


                                        </Splide>
                                    </div>
                                </div>


                                : //on search
                                <div className="search-recipes">

                                    {loading == true ?
                                        <div className="loding">
                                            <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                        </div>
                                        :
                                        search_opsions.map((recipe, index) => (
                                            <div className="recipe-box search-res" key={index}>


                                                <div className="box-img" >
                                                    <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                        <div>
                                                        {!recipe.Image ? <img src={noPic} alt="no pic" />
                                                                        : <img src={serverURL + recipe.Image} alt={recipe.Title} />
                                                                    }
                                                        </div>
                                                    </Link>
                                                </div>


                                                <div className="box-body">

                                                    <div className="res-row">
                                                        <div className="rank">

                                                            {recipe.Rating.length == 0
                                                                ? <div key={index} className="stars-show">
                                                                    <span className="l-star-off"> ★ </span>
                                                                    <span className="l-star-off"> ★ </span>
                                                                    <span className="l-star-off"> ★ </span>
                                                                    <span className="l-star-off"> ★ </span>
                                                                    <span className="l-star-off"> ★ </span>
                                                                </div>

                                                                : this.avgRating(recipe.Rating)

                                                            }
                                                        </div>


                                                        <div className="like">
                                                            {!this.props.user
                                                                ? <button disabled className="btn  like-btn not-allowed" type="button" ><FaThumbsUp />  </button>

                                                                : <button className="btn like-btn" type="button" onClick={() => this.addToFavorites(recipe, index)}><FaThumbsUp />  </button>}

                                                        </div>
                                                    </div>


                                                    <div >
                                                        <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                                            <h5> {recipe.Title} </h5>
                                                        </Link>
                                                    </div>

                                                </div>


                                            </div>
                                        ))
                                    }

                                </div>
                            }
                        </div>

                    </div>
                }

            </div>

        );
    }
}

export default Main;