import React from "react";

// Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Styles
import "./App.css";

// Pages
import HomePage from "./Pages/Vehicles/Home/HomePage";
import EditPage from "./Pages/Vehicles/Edit/EditPage";
import MakePage from "./Pages/Make/MakePage";

// Components
import NavbarComponent from "./Components/NavbarComponent";
import CreateVehicle from "./Pages/Vehicles/Components/CreateVehicle";

function App() {
  return (
    <Router>
      <NavbarComponent />
      <CreateVehicle />
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/edit" render={() => <EditPage />} />
          <Route exact path="/make" render={() => <MakePage />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
