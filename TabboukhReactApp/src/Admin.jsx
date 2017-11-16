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
      recipeNameError: "",
      ingredientQuantityError: "",
      howToMakeError: "",
      editMode: false,
      recipeBeingEdited: "",
      allIngredients: [],
      allRecipesNames: [],
      currentRecipe: {
        name: "",
        image: "http://lorempixel.com/640/480/food/",
        ingredientsAndQuantities: [],
        howToMake: [],
        ingredients: []
      },
      categories: [
        {
          name: "meats",
          ingredients: []
        },
        {
          name: "fruits",
          ingredients: []
        },
        {
          name: "vegetables",
          ingredients: []
        },
        {
          name: "dairy",
          ingredients: []
        },
        {
          name: "fish",
          ingredients: []
        },
        {
          name: "herbs",
          ingredients: []
        },
        {
          name: "spices",
          ingredients: []
        },
        {
          name: "beverages",
          ingredients: []
        },
        {
          name: "condiments",
          ingredients: []
        },
        {
          name: "other",
          ingredients: []
        }
      ],
      recipes: []
    };
  }

  combineData(categories,recipes){

    let allIngredientsCombined = [];
    let allRecipesCombined = [];

    for (let i = 0; i < categories.length; i++) {
      allIngredientsCombined = [
        ...allIngredientsCombined,
        ...categories[i].ingredients
      ];
    }

    for (let i = 0; i < this.state.recipes.length; i++) {
      allRecipesCombined = [...allRecipesCombined, recipes[i].name];
    }

    this.setState({
      categories,
      recipes,
      allIngredients: allIngredientsCombined,
      allRecipesNames: allRecipesCombined
    });
  }

  componentDidMount() {

    this.getData();

  }

  getData = () => {
    fetch("http://localhost:3001")
      .then(res => res.json())
      .then( ({ingredients,recipes}) =>
        this.combineData(ingredients,recipes)
      )
      .catch(err=>console.log(err))
  };

  saveData = () => {
    const data = {
      ingredients: this.state.categories,
      recipes: this.state.recipes
    };
    fetch("http://localhost:3001/update", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json"
      }
    });
  };

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
        /*
        
        const newIngredients = [ ...this.state.categories ];

        for (let i = 0; i < newIngredients.length; i++) {
          if (newIngredients[i].name === this.state.selectIngredientCategory) {
            newIngredients[i] = { ...newIngredient[i], ingredients:[...newIngredients[i].ingredients,this.state.addIngredientInput] }
            break;
          }
        }
        */
        const newIngredients = this.state.categories.map(
          (category) => ( category.name === this.state.selectIngredientCategory
          ? { ...category,
              ingredients:[...category.ingredients,this.state.addIngredientInput]
            }
          : category
          )
        )
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
        },this.saveData);
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
    },this.saveData);
    
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
    },this.saveData);
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

  handleRecipeNameInput(value) {
    let newCurrentRecipe = this.state.currentRecipe;
    newCurrentRecipe.name = value;
    this.setState({
      currentRecipe: newCurrentRecipe
    });
  }

  handleQuantityInput = (value, index) => {
    let newCurrentRecipe = this.state.currentRecipe;
    newCurrentRecipe.ingredientsAndQuantities[index].quantity = value;
    this.setState({
      currentRecipe: newCurrentRecipe
    });
  };

  handleIngredientSelect = (value, index) => {
    let newCurrentRecipe = this.state.currentRecipe;
    newCurrentRecipe.ingredientsAndQuantities[index].name = value;
    this.setState({
      currentRecipe: newCurrentRecipe
    });
  };

  handleStepInput = (value, index) => {
    let newCurrentRecipe = this.state.currentRecipe;
    newCurrentRecipe.howToMake[index] = value;
    this.setState({
      currentRecipe: newCurrentRecipe
    });
  };

  handleEdit = (recipe, index) => {
    this.setState({
      editMode: true,
      recipeBeingEdited: index,
      currentRecipe: {
        name: recipe.name,
        image: recipe.image,
        ingredientsAndQuantities: recipe.ingredientsAndQuantities,
        howToMake: recipe.howToMake,
        ingredients: recipe.ingredients
      }
    });
  };

  handleAddRecipe = () => {
    if (
      this.state.allRecipesNames.indexOf(this.state.currentRecipe.name) > -1
    ) {
      this.setState({ recipeNameError: "Recipe name already taken" });
    } else {
      this.setState({ recipeNameError: "" });
      if (this.state.currentRecipe.ingredientsAndQuantities.length === 0) {
        this.setState({
          ingredientQuantityError: "Need to add at least one ingredient"
        });
      } else {
        this.setState({
          ingredientQuantityError: ""
        });
        if (this.state.currentRecipe.howToMake.length === 0) {
          this.setState({
            howToMakeError: "Need to have at least one step"
          });
        } else {
          this.setState({
            howToMakeError: ""
          });

          let recipeIngredients = [];
          for (
            let i = 0;
            i < this.state.currentRecipe.ingredientsAndQuantities.length;
            i++
          ) {
            recipeIngredients = [
              ...recipeIngredients,
              this.state.currentRecipe.ingredientsAndQuantities[i].name
            ];
          }

          let recipeToAdd = this.state.currentRecipe;
          recipeToAdd.ingredients = recipeIngredients;
          let newAllRecipes = this.state.recipes;

          if (this.state.editMode) {
            newAllRecipes.splice(this.state.recipeBeingEdited, 1);
          }

          this.setState({
            recipes: [...newAllRecipes, recipeToAdd],
            allRecipesNames: [...this.state.allRecipesNames, recipeToAdd.name],
            currentRecipe: {
              name: "",
              image: "http://lorempixel.com/640/480/food/",
              ingredientsAndQuantities: [],
              howToMake: [],
              ingredients: []
            },
            editMode: false,
            recipeBeingEdited: ""
          },this.saveData);
        }
      }
    }
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
                  <MenuItem value={"meats"} primaryText={"meats"} />
                  <MenuItem value={"fruits"} primaryText={"fruits"} />
                  <MenuItem value={"vegetables"} primaryText={"vegetables"} />
                  <MenuItem value={"dairy"} primaryText={"dairy"} />
                  <MenuItem value={"fish"} primaryText={"fish"} />
                  <MenuItem value={"herbs"} primaryText={"herbs"} />
                  <MenuItem value={"spices"} primaryText={"spices"} />
                  <MenuItem value={"beverages"} primaryText={"beverages"} />
                  <MenuItem value={"condiments"} primaryText={"condiments"} />
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
                  {this.state.recipes.map((recipe, index) => (
                    <TableRow key={index}>
                      <TableRowColumn style={{ paddingLeft: "72px" }}>
                        {recipe.name}
                      </TableRowColumn>
                      <TableRowColumn>
                        <RaisedButton
                          label="Edit"
                          backgroundColor={"#f29c24"}
                          onClick={e => this.handleEdit(recipe, index)}
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
                  onChange={(event, value) => this.handleRecipeNameInput(value)}
                  errorText={this.state.recipeNameError}
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
                    <div key={index}>
                      <TextField
                        hintText="Quantity"
                        style={{ float: "left" }}
                        value={ingredient.quantity}
                        onChange={(event, value) =>
                          this.handleQuantityInput(value, index)}
                      />
                      <SelectField
                        hintText="ingredient"
                        value={ingredient.name}
                        onChange={(event, key, ingredient) =>
                          this.handleIngredientSelect(ingredient, index)}
                      >
                        {this.state.allIngredients.map((ingredient,index) => (
                          <MenuItem
                            value={ingredient}
                            primaryText={ingredient}
                            key={index}
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
                  errorText={this.state.ingredientQuantityError}
                />
                <SelectField
                  hintText="ingredient"
                  disabled={true}
                  errorText={
                    this.state.ingredientQuantityError === "" ? "" : " "
                  }
                />
                <FloatingActionButton
                  mini={true}
                  onClick={e => this.handleAddIngredientToRecipe()}
                >
                  <ContentAdd />
                </FloatingActionButton>
                <br />
                {this.state.currentRecipe.howToMake.map((step, index) => (
                  <div key={index}> 
                    <TextField
                      style={{ width: "80%" }}
                      hintText="How To Make"
                      value={step}
                      onChange={(event, value) =>
                        this.handleStepInput(value, index)}
                        
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
                  errorText={this.state.howToMakeError}
                />{" "}
                <FloatingActionButton
                  mini={true}
                  onClick={e => this.handleAddStepToRecipe()}
                >
                  <ContentAdd />
                </FloatingActionButton>
                <br />
                <RaisedButton
                  label={this.state.editMode ? "Save" : "Add"}
                  backgroundColor={"#1dc600"}
                  onClick={e => this.handleAddRecipe()}
                />
              </div>
            </Tab>
          </Tabs>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Admin;
