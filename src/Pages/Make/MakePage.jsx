import { inject, observer } from "mobx-react";
import React, { Component } from "react";

import "./MakePage.css";

import MakeCard from "./Components/MakeCard";
import CreateMakeCard from "./Components/CreateMakeCard";
import WarningMessage from "../../Components/WarningMessage";

@inject("rootStore")
@observer
class MakePage extends Component {
  componentDidMount() {
    this.props.rootStore.mainStore.storeData.makePage = true;
    this.props.rootStore.mainStore.storeData.showingMessage = false;
  }
  componentWillUnmount() {
    this.props.rootStore.mainStore.storeData.makePage = false;
    this.props.rootStore.mainStore.storeData.showingVehicles = this.props.rootStore.mainStore.vehicles;
    this.props.rootStore.deleteMakeCardStore.storeData.deleting = false;
    this.props.rootStore.mainStore.storeData.showingMessage = false;
    if (this.props.rootStore.mainStore.vehicles.length < 9) {
      this.props.rootStore.mainStore.storeData.showAllVehicles = true;
    } else {
      this.props.rootStore.mainStore.storeData.showAllVehicles = false;
    }
  }
  render() {
    return (
      <main className="MakePage">
        <WarningMessage
          text={"Deleting make will delete all vehicles made from that make"}
        />
        <CreateMakeCard />
        {this.props.rootStore.makeStore.storeData.makes.map((make) => {
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
      </main>
    );
  }
}

export default MakePage;
