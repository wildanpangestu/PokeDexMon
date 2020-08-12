import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NavBar from "./components/layout/NavBar";
import Dashboard from "./components/layout/Dashboard";
import PokemonDetail from "./components/pokemon/PokemonDetail";
import backgroundImage from "./img/background.jpg";

class App extends Component {
  render() {
    return (
      <Router>
        <div
          className="App"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route
                exact
                path="/pokemon/:pokemonIndex"
                component={PokemonDetail}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
