import React, { Component } from "react";

// Styles
import "./MakePage.css";

// To top icon
import { makeToTop } from "../../assetes";

// Components
import WarningMessage from "../../Components/WarningMessage";
import MakeCard from "./Components/MakeCard";
import CreateMake from "./Components/CreateMake";

import { inject, observer } from "mobx-react";

@inject("rootStore")
@observer
class MakePage extends Component {
  // Set makePage to be true and show diffrent buttons, clean up the warning message and hide it if it was showing in Home or Edit page, add scroll event for showing to top icon on scroll
  componentDidMount() {
    this.props.rootStore.vehicleContainerStore.storeData.makePage = true;
    this.props.rootStore.warningMessageStore.setWarningMessage(false, "", "");
    window.addEventListener(
      "scroll",
      this.props.rootStore.sharedFunctionsStore.handleScroll
    );
  }

  // Change all the states on unmount so everything is cleaned and working when user switches back to Edit or Home page
  componentWillUnmount() {
    window.removeEventListener(
      "scroll",
      this.props.rootStore.sharedFunctionsStore.handleScroll
    );
    this.props.rootStore.vehicleContainerStore.storeData.makePage = false;
    this.props.rootStore.vehicleContainerStore.storeData.showingVehicles = this.props.rootStore.vehicleService.getVehicles();
    this.props.rootStore.deleteMakeStore.storeData.deleting = false;
    this.props.rootStore.warningMessageStore.setWarningMessage(false, "", "");
    if (this.props.rootStore.vehicleService.getVehicles().length < 9) {
      this.props.rootStore.vehicleContainerStore.storeData.showAllVehicles = true;
    } else {
      this.props.rootStore.vehicleContainerStore.storeData.showAllVehicles = false;
    }
  }
  render() {
    const { showingMakes } = this.props.rootStore.makeStore.storeData;
    const { scrolling } = this.props.rootStore.sharedFunctionsStore.storeData;
    return (
      <main className="MakePage">
        <WarningMessage />
        <CreateMake />
        {showingMakes.map((make) => {
          return (
            <MakeCard
              id={make.id}
              key={make.id}
              make={make.make}
              founded={make.founded}
              country={make.country}
              logo={make.logo}
            />
          );
        })}
        {scrolling && (
          <a className="MakePage-toTop" href="#top">
            <img src={makeToTop} alt="" />
          </a>
        )}
      </main>
    );
  }
}

export default MakePage;
