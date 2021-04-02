import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

// icons
import { FaThumbsUp } from 'react-icons/fa';

import noPic from '../utility/images/noPic.jpg'

class Category extends Component {
    state = { category_name: "", recipes: [] }

    componentDidMount() {
        console.log(this.props.location)

        var url_cat = this.props.location.search.split('=').pop();
        var cat = this.props.location.pathname.split('=').pop();

        if (!url_cat) {
            var category_name = cat;
            this.setState({ category_name: category_name });
        } else {
            var category_name = url_cat;
            this.setState({ category_name: category_name });
        };

        var category = category_name;
        var self = this;

        console.log(category);

        if (category == "all") {


            axios.get('http://localhost:4000/allRecipes')
                .then(function (res) {
                    console.log(res)
                    self.setState({ recipes: res.data })
                }).catch(error => {
                    console.log(error)


                });
        } else {
            axios.get('http://localhost:4000/catRecipes', { params: { category } })
                .then(function (res) {
                    console.log(res.data)
                    self.setState({ recipes: res.data })

                }).catch(error => {
                    console.log(error)
                });
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
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
            </div>
            )

        } else if (rating_avg == 1) {
            return (<div>
                <span className="star-on"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
            </div>
            )

        } else if (rating_avg == 2) {
            return (<div>
                <span className="star-on"> ★ </span>
                <span className="star-on"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
            </div>
            )
        } else if (rating_avg == 3) {
            return (<div>
                <span className="star-on"> ★ </span>
                <span className="star-on"> ★ </span>
                <span className="star-on"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
            </div>
            )
        } else if (rating_avg == 4) {
            return (<div>
                <span className="star-on"> ★ </span>
                <span className="star-on"> ★ </span>
                <span className="star-on"> ★ </span>
                <span className="star-on"> ★ </span>
                <span className="star-off"> ★ </span>
            </div>
            )
        } else if (rating_avg >= 5) {
            return (<div>
                <span className="star-on"> ★ </span>
                <span className="star-on"> ★ </span>
                <span className="star-on"> ★ </span>
                <span className="star-on"> ★ </span>
                <span className="star-on"> ★ </span>
            </div>
            )
        } else {
            return (<div>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
                <span className="star-off"> ★ </span>
            </div>
            )
        };

    };

    render() {
        var serverURL = "http://localhost:4000/";
        var category_name = this.state.category_name;
        var recipes = this.state.recipes;

        console.log(recipes)

        return (
            <div>
                 <div className="sub-head">
                        <h3 className="y-color"> {category_name} </h3>
                    </div>
              

                <div className="my_recipes">
                    {recipes.map((recipe, index) => (



                        <div className="recipe-card" key={index}>


                            <div className="box-img" >
                                <Link className="recipe-link" to={{ pathname: "/singleRecipe/?=" + recipe._id, state: recipe._id }}>
                                    <div>
                                        <img src={serverURL + recipe.Image} alt={recipe.Title} />
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

                    ))}
                </div>

            </div>
        );
    }
}

export default Category;