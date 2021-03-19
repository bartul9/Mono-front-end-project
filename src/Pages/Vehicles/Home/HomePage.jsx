import React from "react";

// Styles
import "./HomePage.css";

// Header background image
import { home_background } from "../../../images/index";

// Components
import HeaderComponent from "../../../Components/HeaderComponent";
import WarningMessage from "../../../Components/WarningMessage";
import VehicleContainer from "../Components/VehicleContainer";
import FooterComponent from "../../../Components/FooterComponent";

function Home() {
  return (
    <section className="HomePage">
      <WarningMessage />
      <HeaderComponent text={"Garage"} background={home_background} />
      <VehicleContainer />
      <FooterComponent />
    </section>
  );
}
export default Home;
