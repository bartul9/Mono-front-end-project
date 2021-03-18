import React, { Component } from "react";

// Styles
import "./MakePage.css";

// To top icon
import { makeToTop } from "../../assetes";

// Components
import WarningMessage from "../../Components/WarningMessage";
import MakeCard from "./Components/MakeCard";
import CreateMakeCard from "./Components/CreateMakeCard";

import { inject, observer } from "mobx-react";

@inject("rootStore")
@observer
class MakePage extends Component {
  // Set makePage to be true and show diffrent buttons, clean up the warning message and hide it if it was showing in Home or Edit page, add scroll event for showing to top icon on scroll
  componentDidMount() {
    this.props.rootStore.mainStore.storeData.makePage = true;
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
    this.props.rootStore.mainStore.storeData.makePage = false;
    this.props.rootStore.mainStore.storeData.showingVehicles = this.props.rootStore.mainStore.vehicles;
    this.props.rootStore.deleteMakeCardStore.storeData.deleting = false;
    this.props.rootStore.warningMessageStore.setWarningMessage(false, "", "");
    if (this.props.rootStore.mainStore.vehicles.length < 9) {
      this.props.rootStore.mainStore.storeData.showAllVehicles = true;
    } else {
      this.props.rootStore.mainStore.storeData.showAllVehicles = false;
    }
  }
  render() {
    const { makes } = this.props.rootStore.makeStore.storeData;
    const { scrolling } = this.props.rootStore.sharedFunctionsStore.storeData;
    return (
      <main className="MakePage">
        <WarningMessage />
        <CreateMakeCard />
        {makes.map((make) => {
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
