import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import AutoComplete from "material-ui/AutoComplete";
import Chip from "material-ui/Chip";
import { GridList, GridTile } from "material-ui/GridList";

const styles = {
  chip: {
    margin: 4
  },
  gridList: {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: true,
      availableIngredients: [],
      allIngredients: [
        "potato",
        "tomatoe",
        "lemon",
        "chocolate",
        "meat",
        "chicken",
        "salt",
        "rabbit",
        "garlic"
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
          ingredients: ["potato", "tomatoe", "tomatoe", "chicken", "garlic"]
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
      ],
      recipeCols: 3
    };
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

  isIngredientAvailable = ingredient => {
    for (let i = 0; i < this.state.allIngredients.length; i++) {
      if (
        this.state.allIngredients[i] === ingredient
      )
        return true;
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

  render() {
    const paddingLeft = this.state.openDrawer ? 256 : 0;
    return (
      <div className="App">
        <MuiThemeProvider>
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
                 <GridTile key={index} title={recipe.name}>
                    <img src={recipe.image} alt="" />
                  </GridTile>
              ))}
            </GridList>
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
            </div>
          </Drawer>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
