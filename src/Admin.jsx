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
          image: "/burger.jpg",
          name: "Burger",
          ingredients: ["potato", "chocolate", "lemon"]
        },
        {
          image: "/cake.jpg",
          name: "Cake",
          ingredients: ["chocolate", "lemon"]
        },
        {
          image: "/burger.jpg",
          name: "Burger",
          ingredients: ["meat", "chocolate", "lemon"]
        },
        {
          image: "/cake.jpg",
          name: "Cake",
          ingredients: ["potato", "chocolate", "salt"]
        },
        {
          image: "/burger.jpg",
          name: "Burger",
          ingredients: ["potato", "chicken", "lemon"]
        },
        {
          image: "/cake.jpg",
          name: "Cake",
          ingredients: [
            "potato",
            "rabbit",
            "lemon",
            "salt",
            "tomatoe",
            "chicken",
            "garlic"
          ]
        },
        {
          image: "/burger.jpg",
          name: "Burger",
          ingredients: ["potato", "tomatoe", "chicken", "garlic"]
        },
        {
          image: "/cake.jpg",
          name: "Cake",
          ingredients: ["potato", "tomatoe", "chicken", "garlic"]
        },
        {
          image: "/burger.jpg",
          name: "Burger",
          ingredients: ["potato", "garlic"]
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

  ingredientAlreadyExists = ingredient => {
    if (this.state.allIngredients.indexOf(ingredient) > -1) return true;
    else return false;
  };

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
                <TextField hintText="Name" />
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
                <TextField hintText="Quantity" style={{ float: "left" }} />
                <SelectField hintText="ingredient" />
                <FloatingActionButton mini={true}>
                  <ContentAdd />
                </FloatingActionButton>
                <br />
                <TextField
                  style={{ width: "80%" }}
                  hintText="How To Make"
                />{" "}
                <FloatingActionButton mini={true}>
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
