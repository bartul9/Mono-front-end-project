import { inject, observer } from "mobx-react";
import React, { Component } from "react";

import "./WarningMessage.css";

@inject("rootStore")
@observer
class WarningMessage extends Component {
  render() {
    const { showingMessage, error } = this.props.rootStore.mainStore.storeData;
    const { backgroundClr } = this.props;
    return (
      <div
        style={showingMessage ? { top: "2px" } : { top: "-50%" }}
        className="WarningMessage"
        id={backgroundClr}
      >
        <h2>{error}</h2>
      </div>
    );
  }
}
export default WarningMessage;
