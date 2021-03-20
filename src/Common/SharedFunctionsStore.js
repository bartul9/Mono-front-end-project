import { observable } from "mobx";

class SharedFunctionsStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.storeData = observable({ scrolling: false });
  }

  // Function for checking if all inputs are filled
  checkValidInputs = (inputs) =>
    Object.values(inputs).every((value) => value.length > 0);

  // Function for toggling if toTop icon is showing or not in MakePage, but since it can be used elsewhere I decided to put it here
  handleScroll = () =>
    window.pageYOffset >= 20
      ? (this.storeData.scrolling = true)
      : (this.storeData.scrolling = false);
}

export default SharedFunctionsStore;
