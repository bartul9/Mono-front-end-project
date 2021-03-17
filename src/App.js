import React from "react";

// Router

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Styles
import "./App.css";

// Components

import Home from "./Pages/Vehicles/Home/HomePage";
import Edit from "./Pages/Vehicles/Edit/EditPage";
import MakePage from "./Pages/Make/MakePage";

// Components
import NavbarComponent from "./Components/NavbarComponent";
import CreateNewVehicle from "./Pages/Vehicles/Components/CreateNewVehicle";

function App() {
  return (
    <Router>
      <NavbarComponent />
      <CreateNewVehicle />
      <div className="App">
        <Switch>
          <Route exact path="/" render={(props) => <Home props={props} />} />
          <Route
            exact
            path="/edit"
            render={(props) => <Edit props={props} />}
          />{" "}
          <Route
            exact
            path="/make"
            render={(props) => <MakePage props={props} />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
