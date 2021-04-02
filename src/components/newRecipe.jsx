import React, { Component } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Joi from 'joi-browser';
import { BsFillPlusCircleFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { FiHash, FiUpload } from "react-icons/fi";
import '../utility/css/newRecipe.css';


class NewRecipe extends Component {
    state = {
        recipe_title: "",
        recipe_image: null,
        recipe_description: "",
        recipe_category: "",
        recipe_ingredients: [],
        product_name: "",
        product_quantity: "",
        weight_type: "",
        recipe_instructions: [],
        step: ""

    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        // console.log({ [event.target.name]: event.target.value })


    };

    filleSelector = (event) => {
        console.log(event.target.files[0]);
        this.setState({ recipe_image: event.target.files[0] });
        // console.log( this.state.recipe_image)
    };

    IngredientSchema = {
        ProductName: Joi.string().min(1).required(),
        ProductQuantity: Joi.number().min(0).required(),
        WeightType: Joi.string().min(1).required(),

    };

    AddNewIngredient = () => {

        document.querySelector(".wonrnig-Item").style.display = "none";
        document.querySelector(".wonrnig-Quantity").style.display = "none";
        document.querySelector(".wonrnig-Measurement").style.display = "none";

        var product_name = this.state.product_name;
        var product_quantity = this.state.product_quantity;
        var weight_type = this.state.weight_type;
        var recipe_ingredients = this.state.recipe_ingredients;

        let temp_ar = {
            ProductName: product_name,
            ProductQuantity: product_quantity,
            WeightType: weight_type,
        };

        var valid = Joi.validate(temp_ar, this.IngredientSchema, {
            abortEarly: false
        });

        if (valid.error) {
            console.log(valid.error)
            if (valid.error.toString().includes("ProductName")) {
                document.querySelector(".wonrnig-Item").style.display = "block";
            };

            if (valid.error.toString().includes("ProductQuantity")) {
                document.querySelector(".wonrnig-Quantity").style.display = "block";
            };

            if (valid.error.toString().includes("WeightType")) {
                document.querySelector(".wonrnig-Measurement").style.display = "block";
            };

        } else {
            recipe_ingredients.push(temp_ar);
            this.setState({ recipe_ingredients: recipe_ingredients });
            this.setState({ product_name: "" });
            this.setState({ product_quantity: "" });
            this.setState({ weight_type: "" });
            // console.log(this.state.recipe_ingredients);

            document.querySelector("#ProductName").value = "";
            document.querySelector("#ProductQuantity").value = "";
            document.querySelector("#WeightType").value = "";
        }
    };



    addInstructions = (event) => {

        document.querySelector(".wonrnig-instructions").style.display = "none";

        var recipe_instructions = this.state.recipe_instructions;
        var step = this.state.step;
        let temp = step;

        if (temp == "") {
            document.querySelector(".wonrnig-instructions").style.display = "block";

        } else {

            recipe_instructions.push(temp);
            // console.log(recipe_instructions);
            // console.log(step);
            this.setState({ recipe_instructions: recipe_instructions });
            this.setState({ step: "" });

            document.querySelector("#recipe_instructions").value = "";
        }
    };

    delInstruct = (i) => {
        var recipe_ingredients = this.state.recipe_ingredients;
        recipe_ingredients.splice(i, 1);
        // console.log(recipe_ingredients)        
        this.setState({ recipe_ingredients: recipe_ingredients })

    };



    delinstruction = (i) => {
        var recipe_instructions = this.state.recipe_instructions;
        recipe_instructions.splice(i, 1);
        // console.log(recipe_instructions)        
        this.setState({ recipe_instructions: recipe_instructions })
    };


    formSchema = {
        Title: Joi.string().required(),
        // Description: Joi.string(),
        Category: Joi.string().required(),
        Ingredients: Joi.array().min(1).required(),
        Instructions: Joi.array().min(1).required(),
        Image: Joi.object().required(),
    };



    recipeUpload = (event) => {

        document.querySelector(".wonrnig-Title").style.display = "none";
        document.querySelector(".wonrnig-category").style.display = "none";
        document.querySelector(".wonrnig-Ingredients").style.display = "none";
        document.querySelector(".wonrnig-instructions").style.display = "none";
        document.querySelector(".wonrnig-img").style.display = "none";

        var recipe_title = this.state.recipe_title;
        var recipe_description = this.state.recipe_description;
        var recipe_category = this.state.recipe_category;
        var recipe_ingredients = this.state.recipe_ingredients;
        var recipe_instructions = this.state.recipe_instructions;
        var recipe_image = this.state.recipe_image;
        console.log(recipe_image)

        let data = {
            Title: recipe_title,
            // Description: recipe_description,
            Category: recipe_category,
            Ingredients: recipe_ingredients,
            Instructions: recipe_instructions,
            Image: recipe_image,
        }

        console.log(data)

        var valid = Joi.validate(data, this.formSchema, {
            abortEarly: false
        });

        var token = this.props.user.token;

        if (valid.error) {
            console.log(valid.error);

            if (valid.error.toString().includes("Title")) {
                var res = valid.error.toString().includes("Title")
                // alert("Title")
                document.querySelector(".wonrnig-Title").style.display = "block";
            };

            if (valid.error.toString().includes("Category")) {
                // alert("Category")
                document.querySelector(".wonrnig-category").style.display = "block";
            };

            if (valid.error.toString().includes("Ingredients")) {
                // alert("Ingredients")
                document.querySelector(".wonrnig-Ingredients").style.display = "block";
            };

            if (valid.error.toString().includes("Instructions")) {
                // alert("Instructions")
                document.querySelector(".wonrnig-instructions").style.display = "block";
            };

            if (valid.error.toString().includes("Image")) {
                // alert("Image")
                document.querySelector(".wonrnig-img").style.display = "block";
            };

        } else {
            var formData = new FormData();

            formData.append('Title', recipe_title);
            formData.append('Description', recipe_description);
            formData.append('Category', recipe_category);
            formData.append('Ingredients', JSON.stringify(recipe_ingredients));
            formData.append('Instructions', JSON.stringify(recipe_instructions));
            formData.append('Image', recipe_image);


            axios.post('http://localhost:4000/addRecipe', formData, {
                headers: {
                    'x-auth-token': token
                },
            })
                .then(function (res) {
                    console.log(res);
                    toast.success('added successful', {
                        position: "bottom-right",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        className: "new-recipe-y-toast"
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
                        className: "new-recipe-n-toast"
                    });
                });

        }

    };




    render() {
        var recipe_ingredients = this.state.recipe_ingredients;
        var recipe_instructions = this.state.recipe_instructions;
        var recipe_image = this.state.recipe_image;


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

                <div className="center-flex">
                    <h3 className="y-color"> add a new recipe </h3>
                </div>


                <div className="new-re">


                    <form className="w-75" >

                        <div className="form-row1">
                            <div className="titel">
                                <label>Title *</label>
                                <div>
                                    <input className="my-input" type="text" id="recipe_title" name="recipe_title" onChange={this.handleChange} placeholder="recipe title..." />

                                    <span className="wonrnig-Title"> *title is required </span>
                                </div>

                            </div>

                            <div className="category">
                                <label> Category *</label>

                                <div>
                                    <select className="my-input" id="recipe_category" name="recipe_category" onChange={this.handleChange}>
                                        <option defaultValue="selected" hidden="hidden"></option>
                                        <option className="black">Meat</option>
                                        <option className="black">Vegen</option>
                                        <option className="black">Milk</option>
                                        <option className="black">Salads</option>
                                        <option className="black"> Soups</option>
                                        <option className="black">Desserts</option>
                                        <option className="black">Breads</option>
                                        <option className="black">Pasta</option>
                                        <option className="black">Drinks</option>
                                        <option className="black">Other</option>
                                    </select>
                                </div>
                                <span className="wonrnig-category"> *category is required </span>
                            </div>
                        </div>

                        <div className="mt-3">
                            <label> Description </label>

                            <div>
                                <textarea rows="4" type="text" className="Description my-textarea" placeholder="recipe description..." id="recipe_description" name="recipe_description" onChange={this.handleChange} ></textarea>
                            </div>

                        </div>

                        <div className="Ingredients mt-3">

                            <label>List your ingredients one at a time *  <span className="wonrnig-Ingredients"> *must be at least one Item</span></label>

                            <div className="ingredients">

                                <div className="item">
                                    <label>Item </label>
                                    <div>
                                        <input className="my-input" placeholder="Item" type="text" id="ProductName" name="product_name" onChange={this.handleChange} />
                                    </div>

                                    <span className="wonrnig-Item"> *Item is required </span>
                                </div>

                                <div className="Quantity">
                                    <label>Quantity </label>
                                    <div>
                                        <input className="my-input" placeholder="Qty" type="number" id="ProductQuantity" step="0.05" name="product_quantity" onChange={this.handleChange} />
                                    </div>
                                    <span className="wonrnig-Quantity"> *Quantity is required</span>

                                </div>

                                <div className="Measurement">
                                    <label>Measurement </label>
                                    <div>
                                        <select className="my-textarea" placeholder="Measurement" id="WeightType" name="weight_type" onChange={this.handleChange}>
                                            <option defaultValue="selected" hidden="hidden"></option>
                                            <option className="black">unit</option>
                                            <option className="black">ml</option>
                                            <option className="black">L</option>
                                            <option className="black">G</option>
                                            <option className="black">kg</option>
                                            <option className="black">cup</option>
                                            <option className="black">spoon</option>
                                        </select>
                                    </div>

                                    <span className="wonrnig-Measurement"> *Measurement is required</span>

                                </div>


                            </div>

                            <div className="mt-4">
                                <div>
                                    <span className="click" onClick={this.AddNewIngredient}>
                                        <span className="mr-2">add ingredient</span>
                                        <BsFillPlusCircleFill className="y-color addInstruction" />
                                    </span>
                                </div>
                            </div>

                            <div className="ingredients_list">
                                {recipe_ingredients.map((item, index) => (
                                    <div key={index} className="prod">
                                        <div><FiHash className="y-color" /> {item.ProductName} - {item.ProductQuantity}  {item.WeightType} </div>

                                        <div>
                                            <span onClick={() => this.delInstruct(index)} className="remove-Instruct"><ImCross className="y-color" /></span>
                                        </div>
                                    </div>

                                    
                                ))}
                            </div>

                        </div>

                        <div id="instructions">
                            <label>Add your instructions one at a time *   <span className="wonrnig-instructions"> *must be at least one Step</span></label>

                            <div>
                                <textarea rows="4" placeholder="recipe instructions..." type="text" className="my-textarea" id="recipe_instructions" name="step" onChange={this.handleChange} />
                            </div>

                            <div>
                                <div className="mt-3">
                                    <span className="click" onClick={this.addInstructions}>
                                        <span className="mr-2">add instruction</span>
                                        <BsFillPlusCircleFill className="y-color addInstruction" />
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className="instructions_list">
                                    {recipe_instructions.map((item, index) => (
                                        <div key={index} className="prod">

                                            <div>
                                                <div><span className="y-color"><FiHash /> </span>  {item}  </div>
                                            </div>

                                            <div>
                                                <div>
                                                    <span onClick={() => this.delinstruction(index)} className="remove-Instruct"><ImCross className="y-color" /></span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div id="form-img" className="mt-4">
                            <label >Image *   <span className="wonrnig-img"> *an Image is required</span></label>
                            <div className="mt-2">
                                <label htmlFor="recipe_image" id="choose-file">
                                    <span className="uplod-file">
                                        choose-file<FiUpload className="y-color ml-2" />
                                    </span>
                                    <span className="ml-3">
                                        <strong className="">chosen file: </strong>
                                        <span id="file-name">{!recipe_image ? <span>none</span> : <span>{recipe_image.name}</span>}</span>
                                    </span>
                                </label>
                            </div>
                            <div>
                                <input type="file" id="recipe_image" name="recipe_image" onChange={this.filleSelector} accept="image/x-png,image/gif,image/jpeg" />
                            </div>


                        </div>



                        <div className="mt-4 center-flex">
                            <button type="button" id="form-submit" onClick={this.recipeUpload} > PUBLISH! </button>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

export default NewRecipe;