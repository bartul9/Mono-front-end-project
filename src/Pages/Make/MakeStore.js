import { observable } from "mobx";

class MakeStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.storeData = observable({
      showingMakes: this.rootStore.makeService.getMakes(),
    });
  }

  // Set makePage to be true and show diffrent buttons, clean up the warning message and hide it if it was showing in Home or Edit page, add scroll event for showing to top icon on scroll
  componentDidMountSetData = () => {
    this.rootStore.vehicleContainerStore.storeData.makePage = true;
    this.rootStore.warningMessageStore.setWarningMessage(false, "", "");

    window.addEventListener(
      "scroll",
      this.rootStore.sharedFunctionsStore.handleScroll
    );
  };

  // Change all the states on unmount so everything is cleaned and working when user switches back to Edit or Home page
  componentWillUnmountCleanUp = () => {
    this.rootStore.vehicleContainerStore.storeData.makePage = false;
    this.rootStore.vehicleContainerStore.storeData.showingVehicles = this.rootStore.vehicleService.getVehicles();

    this.rootStore.deleteMakeStore.storeData.deleting = false;
    this.rootStore.warningMessageStore.setWarningMessage(false, "", "");

    if (this.rootStore.vehicleService.getVehicles().length < 9) {
      this.rootStore.vehicleContainerStore.storeData.showAllVehicles = true;
    } else {
      this.rootStore.vehicleContainerStore.storeData.showAllVehicles = false;
    }

    window.removeEventListener(
      "scroll",
      this.rootStore.sharedFunctionsStore.handleScroll
    );
  };
}

export default MakeStore;
