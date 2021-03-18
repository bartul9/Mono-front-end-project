import React, { Component } from "react";

// Styles
import "./FooterComponent.css";

// Back to top image
import { backToTop } from "../assetes/index";

import { inject, observer } from "mobx-react";

@inject("rootStore")
@observer
class FooterComponent extends Component {
  render() {
    const {
      showAllVehicles,
      showingVehicles,
    } = this.props.rootStore.mainStore.storeData;

    const {
      wrongSearchInputs,
    } = this.props.rootStore.vehicleContainerStore.storeData;

    const footer = (
      <footer className="FooterComponent">
        <span
          style={showAllVehicles ? { bottom: "49px" } : { bottom: "" }}
          className="VehicleContainer-racing-flag"
        ></span>
        <a
          style={showAllVehicles ? { bottom: "55px" } : { bottom: "" }}
          className="FooterComponent-toTop"
          href="#top"
        >
          <img src={backToTop} alt="to-top-page" />
        </a>
        <p>
          Built by <i>Luka Bartulović</i> for <i>Mono</i>
        </p>
      </footer>
    );
    return !wrongSearchInputs && showingVehicles.length > 0 && footer;
  }
}
export default FooterComponent;
