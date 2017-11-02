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
    height: 450
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: true,
      availableIngredients: [],
      allIngredients: ["Potato", "Tomatoe", "Lemon"],
      recipes: [
        {
          image: "/burger.jpg",
          name: "Burger"
        },
        {
          image: "/cake.jpg",
          name: "Cake"
        },
        {
          image: "/burger.jpg",
          name: "Burger"
        },
        {
          image: "/cake.jpg",
          name: "Cake"
        },
        {
          image: "/burger.jpg",
          name: "Burger"
        },
        {
          image: "/cake.jpg",
          name: "Cake"
        },
        {
          image: "/burger.jpg",
          name: "Burger"
        },
        {
          image: "/cake.jpg",
          name: "Cake"
        },
        {
          image: "/burger.jpg",
          name: "Burger"
        },
        {
          image: "/cake.jpg",
          name: "Cake"
        },
        {
          image: "/burger.jpg",
          name: "Burger"
        },
        {
          image: "/cake.jpg",
          name: "Cake"
        },
        {
          image: "/burger.jpg",
          name: "Burger"
        },
        {
          image: "/cake.jpg",
          name: "Cake"
        }
      ],
      recipeCols: 3
    };
  }

  handleUpdateInput = ingredient => {
    if (this.isIngredientAvailable(ingredient)) {
      const newAllIngredients = [...this.state.allIngredients]//.slice();
      newAllIngredients.splice(
        this.state.allIngredients.indexOf(ingredient),
        1
      );
      this.setState({
        availableIngredients: [...this.state.availableIngredients, ingredient],
        allIngredients: newAllIngredients
      });
    }
    console.log(this.state.allIngredients);
    console.log(this.state.availableIngredients);
  };

  handleToggle = () =>
    this.setState({
      openDrawer: !this.state.openDrawer,
      recipeCols: this.state.recipeCols === 3 ? 4 : 3
    });

  handleDeleteIngredient = ingredientIndex => {
    const ingredientToDelete = this.state.availableIngredients[ingredientIndex];
    const newAvailableIngredients = [...this.state.availableIngredients]//.slice();
    newAvailableIngredients.splice(ingredientIndex, 1);

    this.setState({
      allIngredients: [...this.state.allIngredients, ingredientToDelete],
      availableIngredients: newAvailableIngredients
    });

    console.log(this.state.allIngredients);
    console.log(this.state.availableIngredients);
  };

  isIngredientAvailable = ingredient => {
    for (let i = 0; i < this.state.allIngredients.length; i++) {
      if (
        this.state.allIngredients[i].toLowerCase() === ingredient.toLowerCase()
      )
        return true;
    }
    return false;
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
              title="Title"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              onClick={this.handleToggle}
            />

            <GridList
              style={styles.gridList}
              cellHeight={180}
              cols={this.state.recipeCols}
              padding={15}
            >
              {this.state.recipes.map((recipe, index) => (
                <GridTile key={index} title={recipe.name}>
                  <img src={recipe.image} alt=""/>
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
              />{" "}
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
