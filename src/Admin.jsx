import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Tabs, Tab } from "material-ui/Tabs";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import ContentRemove from "material-ui/svg-icons/content/remove";
import FloatingActionButton from "material-ui/FloatingActionButton";
import VerticalAlignTop from "material-ui/svg-icons/editor/vertical-align-top";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addIngredientInput: "",
      selectIngredientCategory: "",
      addIngredientError: "",
      selectCategoryError: "",
      allIngredients: [],
      currentRecipe: {
        name: "Cake",
        image: "/cake.jpg",
        ingredientsAndQuantities: [
          {
            name: "potato",
            quantity: "1/2 cup"
          },
          {
            name: "potato",
            quantity: "1 tbsp"
          },
          {
            name: "potato",
            quantity: "2 cubes"
          },
          {
            name: "potato",
            quantity: "2"
          },
          {
            name: "meat",
            quantity: "1 gallon"
          },
          {
            name: "peach",
            quantity: "1 bucket"
          }
        ],
        howToMake: [
          "Add 1 bucket of creme and stir it up real good",
          "Praise Satan",
          "Crack eggs",
          "Mix everything up and put inside oven",
          "Eat"
        ],
        ingredients: []
      },
      categories: [
        {
          name: "meats",
          ingredients: ["meat", "chicken"]
        },
        {
          name: "fruits",
          ingredients: ["apple", "banana", "peach"]
        },
        {
          name: "vegetables",
          ingredients: ["lettuce", "cucumber", "cabbage", "potato", "lemon"]
        },
        {
          name: "spices",
          ingredients: ["salt", "pepper"]
        },
        {
          name: "other",
          ingredients: ["chocolate"]
        }
      ],
      recipes: [
        {
          name: "Cake",
          image: "/cake.jpg",
          ingredientsAndQuantities: [
            {
              name: "potato",
              quantity: "1/2 cup"
            },
            {
              name: "potato",
              quantity: "1 tbsp"
            },
            {
              name: "potato",
              quantity: "2 cubes"
            },
            {
              name: "potato",
              quantity: "2"
            },
            {
              name: "meat",
              quantity: "1 gallon"
            },
            {
              name: "peach",
              quantity: "1 bucket"
            }
          ],
          howToMake: [
            "Add 1 bucket of creme and stir it up real good",
            "Praise Satan",
            "Crack eggs",
            "Mix everything up and put inside oven",
            "Eat"
          ],
          ingredients: []
        }
      ]
    };
  }
  componentDidMount() {
    let allIngredientsCombined = [];
    for (let i = 0; i < this.state.categories.length; i++) {
      allIngredientsCombined = [
        ...allIngredientsCombined,
        ...this.state.categories[i].ingredients
      ];
    }
    this.setState({
      allIngredients: allIngredientsCombined
    });
  }

  handleIngredientInput = ingredient => {
    this.setState({
      addIngredientInput: ingredient
    });
  };

  handleCategorySelect = category => {
    this.setState({
      selectIngredientCategory: category
    });
  };

  handleAddIngredientClick = () => {
    if (this.state.addIngredientInput === "") {
      this.setState({
        addIngredientError: "Ingredient can't be empty"
      });
    } else if (this.ingredientAlreadyExists(this.state.addIngredientInput)) {
      this.setState({
        addIngredientError: "Ingredient already exists"
      });
    } else {
      this.setState({
        addIngredientError: ""
      });
      if (this.state.selectIngredientCategory === "") {
        this.setState({
          selectCategoryError: "Select a category"
        });
      } else {
        let newIngredients = [];
        for (let i = 0; i < this.state.categories.length; i++) {
          newIngredients = [...newIngredients, this.state.categories[i]];
          if (newIngredients[i].name === this.state.selectIngredientCategory) {
            newIngredients[i].ingredients = [
              ...newIngredients[i].ingredients,
              this.state.addIngredientInput
            ];
          }
        }
        this.setState({
          addIngredientInput: "",
          selectIngredientCategory: "",
          addIngredientError: "",
          selectCategoryError: "",
          categories: newIngredients,
          allIngredients: [
            ...this.state.allIngredients,
            this.state.addIngredientInput
          ]
        });
      }
    }
  };

  handleDeleteIngredient = (categoryName, ingredient) => {
    let newIngredients = [];
    let ingredientArrayToDeleteFrom = [];

    for (let i = 0; i < this.state.categories.length; i++) {
      newIngredients = [...newIngredients, this.state.categories[i]];
      if (newIngredients[i].name === categoryName) {
        ingredientArrayToDeleteFrom = newIngredients[i].ingredients;
        ingredientArrayToDeleteFrom.splice(
          ingredientArrayToDeleteFrom.indexOf(ingredient),
          1
        );
        newIngredients[i].ingredients = ingredientArrayToDeleteFrom;
      }
    }

    this.setState({
      categories: newIngredients,
      allIngredients: this.state.allIngredients.filter(
        ingredientInArray => ingredientInArray !== ingredient
      )
    });
  };

  handleDeleteRecipe = recipeName => {
    let newRecipes = [];
    for (let i = 0; i < this.state.recipes.length; i++) {
      if (!(this.state.recipes[i].name === recipeName)) {
        newRecipes = [...newRecipes, this.state.recipes[i]];
      }
    }
    this.setState({
      recipes: newRecipes
    });
  };

  handleAddIngredientToRecipe = () => {
    let newRecipe = this.state.currentRecipe;
    let newIngredient = { name: "", quantity: "" };
    newRecipe.ingredientsAndQuantities = [
      ...newRecipe.ingredientsAndQuantities,
      newIngredient
    ];
    this.setState({ currentRecipe: newRecipe });
  };

  handleAddStepToRecipe = () => {
    let newRecipe = this.state.currentRecipe;
    let newStep = "";
    newRecipe.howToMake = [...newRecipe.howToMake, newStep];
    this.setState({ currentRecipe: newRecipe });
  };

  handleRemoveIngredientFromRecipe = index => {
    let newRecipe = this.state.currentRecipe;
    newRecipe.ingredientsAndQuantities.splice(index, 1);
    this.setState({
      currentRecipe: newRecipe
    });
  };

  handleRemoveStepFromRecipe = index => {
    let newRecipe = this.state.currentRecipe;
    newRecipe.howToMake.splice(index, 1);
    this.setState({
      currentRecipe: newRecipe
    });
  };

  ingredientAlreadyExists = ingredient => {
    if (this.state.allIngredients.indexOf(ingredient) > -1) return true;
    else return false;
  };

  ingredientAlreadyExists = recipeName => {
    for (let i = 0; i < this.state.recipes.length; i++) {
      if (this.state.recipes[i].name === recipeName) return true;
    }
    return false;
  };

  handleRecipeInput(value) {
    let newCurrentRecipe;
    newCurrentRecipe = this.state.currentRecipe;
    newCurrentRecipe.name = value;
    this.setState({
      currentRecipe: newCurrentRecipe
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Tabs>
            <Tab label="Ingredients">
              <Table
                style={{
                  width: "70%",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
                height={"340px"}
                selectable={false}
              >
                <TableHeader displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Category</TableHeaderColumn>
                    <TableHeaderColumn>Delete</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {this.state.categories.map(category =>
                    category.ingredients.map(ingredient => (
                      <TableRow>
                        <TableRowColumn style={{ paddingLeft: "72px" }}>
                          {ingredient}
                        </TableRowColumn>
                        <TableRowColumn style={{ paddingLeft: "56px" }}>
                          {category.name}
                        </TableRowColumn>
                        <TableRowColumn>
                          <RaisedButton
                            label="Delete"
                            backgroundColor={"red"}
                            onClick={e =>
                              this.handleDeleteIngredient(
                                category.name,
                                ingredient
                              )}
                          />
                        </TableRowColumn>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              <div
                style={{
                  width: "70%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "20px"
                }}
              >
                <TextField
                  hintText="Add You Ingredient Here"
                  style={{ width: "45%", float: "left" }}
                  onChange={(e, ingredient) =>
                    this.handleIngredientInput(ingredient)}
                  value={this.state.addIngredientInput}
                  errorText={this.state.addIngredientError}
                />
                <SelectField
                  style={{ width: "30%", float: "left" }}
                  hintText="Category"
                  value={this.state.selectIngredientCategory}
                  onChange={(event, key, category) =>
                    this.handleCategorySelect(category)}
                  errorText={this.state.selectCategoryError}
                >
                  <MenuItem value={"fruits"} primaryText={"fruits"} />
                  <MenuItem value={"vegetables"} primaryText={"vegetables"} />
                  <MenuItem value={"meats"} primaryText={"meats"} />
                  <MenuItem value={"spices"} primaryText={"spices"} />
                  <MenuItem value={"other"} primaryText={"other"} />
                </SelectField>
                <RaisedButton
                  label="Add Ingredient"
                  primary={true}
                  style={{ width: "25%" }}
                  onClick={e => this.handleAddIngredientClick()}
                />
              </div>
            </Tab>
            {/*
              *
              *
              *
              *
              *
              *
              *
              *
              *
              *
              *
              *
              */}
            <Tab label="Recipes">
              <Table
                style={{
                  width: "70%",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
                height={"340px"}
                selectable={false}
              >
                <TableHeader displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Edit</TableHeaderColumn>
                    <TableHeaderColumn>Delete</TableHeaderColumn>
                  </TableRow>
                </TableHeader>

                <TableBody displayRowCheckbox={false}>
                  {this.state.recipes.map(recipe => (
                    <TableRow>
                      <TableRowColumn style={{ paddingLeft: "72px" }}>
                        {recipe.name}
                      </TableRowColumn>
                      <TableRowColumn>
                        <RaisedButton
                          label="Edit"
                          backgroundColor={"#f29c24"}
                        />
                      </TableRowColumn>
                      <TableRowColumn>
                        <RaisedButton
                          label="Delete"
                          onClick={e => this.handleDeleteRecipe(recipe.name)}
                          backgroundColor={"red"}
                        />
                      </TableRowColumn>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div
                style={{
                  width: "70%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "10px",
                  marginBottom: "40px"
                }}
              >
                <TextField
                  hintText="Name"
                  value={this.state.currentRecipe.name}
                  onChange={(event, value) => this.handleRecipeInput(value)}
                />
                <br />
                <RaisedButton
                  style={{ marginTop: "10px" }}
                  label="Recipe Image"
                  labelPosition="before"
                  containerElement="label"
                  icon={<VerticalAlignTop />}
                >
                  <input type="file" style={{ display: "none" }} />
                </RaisedButton>
                <br />
                {this.state.currentRecipe.ingredientsAndQuantities.map(
                  (ingredient, index) => (
                    <div>
                      <TextField
                        hintText="Quantity"
                        style={{ float: "left" }}
                        value={ingredient.quantity}
                      />
                      <SelectField
                        hintText="ingredient"
                        value={ingredient.name}
                      >
                        {this.state.allIngredients.map(ingredient => (
                          <MenuItem
                            value={ingredient}
                            primaryText={ingredient}
                          />
                        ))}
                      </SelectField>
                      <FloatingActionButton
                        mini={true}
                        backgroundColor={"red"}
                        onClick={e =>
                          this.handleRemoveIngredientFromRecipe(index)}
                      >
                        <ContentRemove />
                      </FloatingActionButton>
                      <br />
                    </div>
                  )
                )}
                <TextField
                  hintText="Quantity"
                  style={{ float: "left" }}
                  disabled={true}
                />
                <SelectField hintText="ingredient" disabled={true}>
                  {this.state.allIngredients.map(ingredient => (
                    <MenuItem value={ingredient} primaryText={ingredient} />
                  ))}
                </SelectField>
                <FloatingActionButton
                  mini={true}
                  onClick={e => this.handleAddIngredientToRecipe()}
                >
                  <ContentAdd />
                </FloatingActionButton>
                <br />
                {this.state.currentRecipe.howToMake.map((step, index) => (
                  <div>
                    <TextField
                      style={{ width: "80%" }}
                      hintText="How To Make"
                      value={step}
                    />
                    <FloatingActionButton
                      mini={true}
                      backgroundColor={"red"}
                      onClick={e => this.handleRemoveStepFromRecipe(index)}
                    >
                      <ContentRemove />
                    </FloatingActionButton>
                    <br />
                  </div>
                ))}
                <TextField
                  style={{ width: "80%" }}
                  hintText="How To Make"
                  disabled={true}
                />{" "}
                <FloatingActionButton
                  mini={true}
                  onClick={e => this.handleAddStepToRecipe()}
                >
                  <ContentAdd />
                </FloatingActionButton>
                <br />
                <RaisedButton label="Add" backgroundColor={"#1dc600"} />
                <RaisedButton label="Save" backgroundColor={"#1dc600"} />
              </div>
            </Tab>
          </Tabs>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Admin;
