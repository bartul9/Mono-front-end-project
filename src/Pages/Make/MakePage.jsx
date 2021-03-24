import React, { Component } from "react";

// Styles
import "./MakePage.css";

// Components
import WarningMessage from "../../Components/WarningMessage";
import MakeCard from "./Components/MakeCard";
import CreateMake from "./Components/CreateMake";
import Pagination from "../../Components/Pagination";
import Footer from "../../Components/FooterComponent";

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
    const { countItems } = this.props.rootStore.paginationStore;

    return (
      <main className="MakePage">
        <WarningMessage />
        <CreateMake />
        <div className="MakeContainer">
          {countItems(showingMakes).map((make) => {
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
        </div>

        {showingMakes.length > 8 && <Pagination />}
        <Footer />
      </main>
    );
  }
}

export default MakePage;
