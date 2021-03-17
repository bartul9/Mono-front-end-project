import React, { Component } from "react";
// Styles
import "./EditPage.css";
// Components
import FooterComponent from "../../../Components/FooterComponent";
import VehicleContainer from "../Components/VehicleContainer";
import WarningMessage from "../../../Components/WarningMessage";

import { editing_garage } from "../../../images/index";

// Inject and Observer from mobx
import { inject, observer } from "mobx-react";
import HeaderComponent from "../../../Components/HeaderComponent";

@inject("rootStore")
@observer
class Edit extends Component {
  resetData(isEditing) {
    this.props.rootStore.mainStore.storeData.isEditing = isEditing;
    if (this.props.rootStore.mainStore.vehicles.length < 9) {
      this.props.rootStore.mainStore.storeData.showAllVehicles = true;
    } else {
      this.props.rootStore.mainStore.storeData.showAllVehicles = false;
    }
    this.props.rootStore.vehicleContainerStore.storeData.currentPage = 1;
    this.props.rootStore.vehicleContainerStore.storeData.postsPerPage = 8;
    this.props.rootStore.vehicleContainerStore.storeData.searchName = "";
    this.props.rootStore.mainStore.storeData.showingVehicles = this.props.rootStore.mainStore.vehicles;
    this.props.rootStore.vehicleContainerStore.storeData.sortingByYear = false;
    this.props.rootStore.vehicleContainerStore.storeData.sortingByHorsepower = true;
    this.props.rootStore.vehicleCardStore.storeData.editingInputs.editingCard = false;
    this.props.rootStore.mainStore.storeData.showingMessage = false;
  }

  componentDidMount() {
    this.resetData(true);
  }

  componentWillUnmount() {
    this.resetData(false);
  }
  render() {
    return (
      <main className="EditPage">
        <WarningMessage backgroundClr={"backgroundBlue"} />
        <HeaderComponent
          text={"Editing"}
          background={editing_garage}
          textColor={"#ffc107"}
          textShadow={"2px 2px 0px #343a40"}
        />
        <VehicleContainer />
        <FooterComponent />
      </main>
    );
  }
}

export default Edit;
