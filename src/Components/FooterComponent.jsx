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
    const { showAll } = this.props.rootStore.paginationStore.storeData;
    const {
      showAllVehicles,
      showingVehicles,
    } = this.props.rootStore.vehicleContainerStore.storeData;

    const noIcon = showingVehicles.length === 0;

    const footer = (
      <footer className="FooterComponent">
        <span
          style={
            showAll || showAllVehicles ? { bottom: "49px" } : { bottom: "" }
          }
          className="VehicleContainer-racing-flag"
        ></span>
        <a
          style={
            showAll || showAllVehicles ? { bottom: "55px" } : { bottom: "" }
          }
          className="FooterComponent-toTop"
          href="#top"
        >
          {!noIcon && <img src={backToTop} alt="to-top-page" />}
        </a>
        <p>
          Built by <i>Luka Bartulović</i> for <i>Mono</i>
        </p>
      </footer>
    );
    return footer;
  }
}
export default FooterComponent;
