import React, { Component } from "react";

// Styles
import "./HomePage.css";

// Header background image
import { home_background } from "../../../images/index";

// Components
import HeaderComponent from "../../../Components/HeaderComponent";
import WarningMessage from "../../../Components/WarningMessage";
import VehicleContainer from "../Components/VehicleContainer";
import FooterComponent from "../../../Components/FooterComponent";

class Home extends Component {
  componentDidMount() {
    localStorage.clear();
  }
  render() {
    return (
      <section className="HomePage">
        <WarningMessage />
        <HeaderComponent text={"Garage"} background={home_background} />
        <VehicleContainer />
        <FooterComponent />
      </section>
    );
  }
}
export default Home;
