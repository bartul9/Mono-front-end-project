import React, { Component } from "react";

// Styles
import "./WarningMessage.css";

import { inject, observer } from "mobx-react";

@inject("rootStore")
@observer
class WarningMessage extends Component {
  render() {
    const {
      showingMessage,
      messageText,
      messageColorId,
    } = this.props.rootStore.warningMessageStore.storeData;

    return (
      <div
        style={showingMessage ? { top: "2px" } : { top: "-50%" }}
        className="WarningMessage"
        id={messageColorId}
      >
        <h2>{messageText}</h2>
      </div>
    );
  }
}
export default WarningMessage;
