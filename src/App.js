import React, { Component } from "react";
import "./App.css";
import { CardList } from "./component/card-list/card-list.component";
import { SearchBox } from "./component/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();
    // State is trickles down as "props" for the bottom components in the hierarchy
    this.state = {
      monsters: [],
      searchField: ""
    };
  }
  componentDidMount() {
    // Fake JSON   API
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }
  // Here the context of the arrow function is the App Component
  handleChange = e => {
    this.setState({ searchField: e.target.value });
  };
  render() {
    // Destructuring :- Pull properties of an object and set them to const
    // includes :- checks whether the string value we passed inside the include
    //  is actually in the string we passed on
    const { monsters, searchField } = this.state;

    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLocaleLowerCase())
    );
    // Pass State as an attribute
    // this :- Represent the context it is being invoked
    return (
      <div className="App">
        <h1>Monster Rolodex</h1>
        <SearchBox
          placeholder="Search Monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters}></CardList>
      </div>
    );
  }
}

export default App;
