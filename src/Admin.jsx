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

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
                />
                <SelectField
                  style={{ width: "30%", float: "left" }}
                  hintText="Category"
                  value={""}
                >
                  <MenuItem primaryText={"fruits"} />
                  <MenuItem primaryText={"vegerables"} />
                  <MenuItem primaryText={"fruits"} />
                  <MenuItem primaryText={"fruits"} />
                  <MenuItem primaryText={"fruits"} />
                </SelectField>
                <RaisedButton
                  label="Add Ingredient"
                  primary={true}
                  style={{ width: "25%" }}
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
                        <RaisedButton label="Delete" backgroundColor={"red"} />
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
                <TextField hintText="Quantity" />
                <TextField hintText="Ingredient" />
                <FloatingActionButton mini={true}>
                  <ContentAdd />
                </FloatingActionButton>
                <br />
                <TextField hintText="How To Make" />{" "}
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
