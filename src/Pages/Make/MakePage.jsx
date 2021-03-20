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
  componentDidMount() {
    this.props.rootStore.makeStore.componentDidMountSetData();
  }

  componentWillUnmount() {
    this.props.rootStore.makeStore.componentWillUnmountCleanUp();
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
