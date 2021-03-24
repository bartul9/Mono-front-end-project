import React, { Component } from "react";

// Styles
import "./EditPage.css";

// Components
import HeaderComponent from "../../../Components/HeaderComponent";
import WarningMessage from "../../../Components/WarningMessage";
import VehicleContainer from "../Components/VehicleContainer";
import FooterComponent from "../../../Components/FooterComponent";

// Garage background image
import { editing_garage } from "../../../images/index";

import { inject, observer } from "mobx-react";

@inject("rootStore")
@observer
class Edit extends Component {
  // When component mounts and unmounts clean up the container and reset all inputs
  componentDidMount() {
    this.props.rootStore.vehicleContainerStore.resetData(true);
    this.props.props.history.push("/edit");
  }
  componentWillUnmount() {
    this.props.rootStore.vehicleContainerStore.resetData(false);
  }

  render() {
    return (
      <main className="EditPage">
        <WarningMessage />
        <HeaderComponent
          text={"Editing"}
          background={editing_garage}
          textColor={"#ffc107"}
          textShadow={"2px 2px 0px #343a40"}
        />
        <VehicleContainer props={this.props.props} />
        <FooterComponent />
      </main>
    );
  }
}

export default Edit;
