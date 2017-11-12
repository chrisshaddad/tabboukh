import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import AutoComplete from "material-ui/AutoComplete";
import Chip from "material-ui/Chip";
import { GridList, GridTile } from "material-ui/GridList";
import { List, ListItem } from "material-ui/List";
import Checkbox from "material-ui/Checkbox";
import { Card, CardMedia, CardTitle } from "material-ui/Card";

const styles = {
  chip: {
    margin: 4
  },
  gridList: {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  card: {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "none"
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: true,
      ingredientsCategories: [
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
      availableIngredients: [],
      allIngredients: [],
      recipes: [],
      recipeCols: 3,
      currentRecipe: {
        name: "Cake",
        image: "/cake.jpg",
        ingredientsAndQuantities: [
          {
            name: "potato",
            quantity: "1/2 cup"
          },
          {
            name: "honey",
            quantity: "1 tbsp"
          },
          {
            name: "sugar",
            quantity: "2 cubes"
          },
          {
            name: "eggs",
            quantity: "2"
          },
          {
            name: "milk",
            quantity: "1 gallon"
          },
          {
            name: "creme",
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
    };
  }

  componentDidMount() {
    let allIngredientsCombined = [];
    for (let i = 0; i < this.state.ingredientsCategories.length; i++) {
      allIngredientsCombined = [
        ...allIngredientsCombined,
        ...this.state.ingredientsCategories[i].ingredients
      ];
    }
    this.setState({
      allIngredients: allIngredientsCombined
    });
  }

  handleUpdateInput = ingredient => {
    if (this.isIngredientAvailable(ingredient)) {
      const newAllIngredients = [...this.state.allIngredients];
      newAllIngredients.splice(
        this.state.allIngredients.indexOf(ingredient),
        1
      );
      this.setState({
        availableIngredients: [...this.state.availableIngredients, ingredient],
        allIngredients: newAllIngredients
      });
    }
  };

  handleToggle = () =>
    this.setState({
      openDrawer: !this.state.openDrawer,
      recipeCols: this.state.recipeCols === 3 ? 4 : 3
    });

  handleDeleteIngredient = ingredientIndex => {
    const ingredientToDelete = this.state.availableIngredients[ingredientIndex];
    const newAvailableIngredients = [...this.state.availableIngredients];
    newAvailableIngredients.splice(ingredientIndex, 1);

    this.setState({
      allIngredients: [...this.state.allIngredients, ingredientToDelete],
      availableIngredients: newAvailableIngredients
    });
  };

  handleCheck = ingredient => {
    if (this.state.availableIngredients.indexOf(ingredient) > -1) {
      this.handleDeleteIngredient(
        this.state.availableIngredients.indexOf(ingredient)
      );
    } else {
      this.handleUpdateInput(ingredient);
    }
  };

  isIngredientAvailable = ingredient => {
    for (let i = 0; i < this.state.allIngredients.length; i++) {
      if (this.state.allIngredients[i] === ingredient) return true;
    }
    return false;
  };

  recipeHasAllIngredients = recipe => {
    for (let i = 0; i < recipe.ingredients.length; i++) {
      if (this.state.availableIngredients.indexOf(recipe.ingredients[i]) === -1)
        return false;
    }
    return true;
  };

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  render() {
    const paddingLeft = this.state.openDrawer ? 256 : 0;
    return (
      <MuiThemeProvider>
        <div className="App">
          <div
            className={"row"}
            style={{
              paddingLeft,
              transition: "padding 450ms cubic-bezier(0.23, 1, 0.32, 1)"
            }}
          >
            <AppBar
              title="Tabboukh"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              onClick={this.handleToggle}
            />

            <GridList
              style={styles.gridList}
              cellHeight={180}
              cols={this.state.recipeCols}
              padding={15}
            >
              {this.state.recipes
                .filter(this.recipeHasAllIngredients)
                .map((recipe, index) => (
                  <a href="/">
                    <GridTile key={index} title={recipe.name}>
                      <img src={recipe.image} alt="" />
                    </GridTile>
                  </a>
                ))}
            </GridList>

            <Card style={styles.card}>
              <div>
                <CardMedia
                  style={{ width: "65%", float: "left" }}
                  overlay={<CardTitle title={this.state.currentRecipe.name} />}
                >
                  <img
                    src={this.state.currentRecipe.image}
                    alt={this.state.currentRecipe.name}
                  />
                </CardMedia>
                <CardTitle
                  style={{ width: "35%", float: "right", textAlign: "center" }}
                  title="Ingredients:"
                />
                <List
                  style={{ width: "35%", float: "left", textAlign: "center" }}
                >
                  {this.state.currentRecipe.ingredientsAndQuantities.map(
                    (ingredient, index) => (
                      <ListItem
                        disabled={true}
                        style={{ padding: "5px", lineHeight: "70%" }}
                        key={index}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            textDecoration: "underline"
                          }}
                        >
                          {ingredient.quantity}
                        </span>
                        {" " + ingredient.name}
                      </ListItem>
                    )
                  )}
                </List>
              </div>

              <div style={{ float: "left", marginLeft: "25%" }}>
                <CardTitle
                  title="How To Make"
                  style={{ textAlign: "center" }}
                  titleStyle={{ fontSize: "30px" }}
                />

                <List>
                  {this.state.currentRecipe.howToMake.map((step, index) => (
                    <ListItem disabled={true}>
                      <span style={{ fontWeight: "bold" }}>{index + 1}</span>
                      {" - " + step}
                    </ListItem>
                  ))}
                </List>
              </div>
            </Card>
          </div>

          <Drawer open={this.state.openDrawer}>
            <div>
              <AutoComplete
                floatingLabelText="Pick Your Ingredients"
                dataSource={this.state.allIngredients}
                filter={AutoComplete.caseInsensitiveFilter}
                maxSearchResults={8}
                onNewRequest={this.handleUpdateInput}
              />
              {this.state.availableIngredients.map((ingredient, index) => (
                <Chip
                  key={index}
                  style={styles.chip}
                  onRequestDelete={() => this.handleDeleteIngredient(index)}
                >
                  {ingredient}
                </Chip>
              ))}
              <List>
                {this.state.ingredientsCategories.map((category, index) => {
                  const nestedIngredients = category.ingredients.map(
                    (ingredient, index) => {
                      return (
                        <ListItem
                          primaryText={ingredient}
                          key={index}
                          leftCheckbox={
                            <Checkbox
                              checked={
                                this.state.availableIngredients.indexOf(
                                  ingredient
                                ) > -1
                                  ? true
                                  : false
                              }
                              onCheck={evt => this.handleCheck(ingredient)}
                            />
                          }
                        />
                      );
                    }
                  );
                  return (
                    <ListItem
                      primaryText={category.name}
                      key={index}
                      nestedItems={nestedIngredients}
                    />
                  );
                })}
              </List>
            </div>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
