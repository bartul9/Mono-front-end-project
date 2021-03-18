import { observable } from "mobx";

class WarningMessageStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.storeData = observable({
      showingMessage: false,
      messageText: "",
      messageColorId: "",
    });
  }

  // Set message to display difrent color and text, also toggle if it is showing or not
  setWarningMessage = (showing, text, backgroundColor) => {
    this.storeData.showingMessage = showing;
    this.storeData.messageText = text;
    this.storeData.messageColorId = backgroundColor;
  };
}

export default WarningMessageStore;
