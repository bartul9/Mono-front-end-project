import React from "react";

// Styles
import "./HomePage.css";

import { home_background } from "../../../images/index";

// Components
import VehicleContainer from "../Components/VehicleContainer";
import FooterComponent from "../../../Components/FooterComponent";
import HeaderComponent from "../../../Components/HeaderComponent";
import WarningMessage from "../../../Components/WarningMessage";

function Home() {
  return (
    <section className="HomePage">
      <WarningMessage backgroundClr={"backgroundBlue"} />
      <HeaderComponent text={"Garage"} background={home_background} />
      <VehicleContainer />
      <FooterComponent />
    </section>
  );
}
export default Home;
