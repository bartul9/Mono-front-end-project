import { observable } from "mobx";

// Disabeling forced actions so I don't have warning when I'm not using action in front of functions
import { configure } from "mobx";

configure({
  enforceActions: "never",
});

class VehicleContainerStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.storeData = observable({
      showingVehicles: this.rootStore.vehicleService.getVehicles(),
      sortingByHorsepower: false,
      sortingByYear: true,
      showAllVehicles: false,
      isEditing: false,
      makePage: false,
      optionValue: "",
      moreOptions: false,
      searchName: "",
    });
  }

  // Reset inputs and change UI, put matching vehicles in showingVehicles array, perform check if there is more than 8 vehicles with matching make, if true put showAllVehicles to false, if there is no matching vehicles show warningMessage
  filterByMake = (value) => {
    this.storeData.searchName = "";
    this.rootStore.vehicleCardStore.storeData.editingInputs.editingCard = false;
    this.rootStore.paginationStore.storeData.currentPage = 1;
    this.storeData.showAllVehicles = true;

    this.storeData.showingVehicles = this.rootStore.vehicleService
      .getVehicles()
      .filter((vehicle) => {
        return vehicle.makeId === value;
      });

    if (this.storeData.showingVehicles.length === 0) {
      this.rootStore.warningMessageStore.setWarningMessage(
        true,
        "There is no vehicles made from that make",
        "backgroundBlue"
      );
    } else {
      this.rootStore.warningMessageStore.setWarningMessage(false, "", "");
    }
  };

  // Change UI, find vehicles matching searchName input and put them in showingVehicles array, if input is empty show all vehicles, if there is no matching vehicles show warningMessage
  searchForName = (e) => {
    this.rootStore.vehicleCardStore.storeData.editingInputs.editingCard = false;
    this.storeData.searchName = e.target.value;
    this.rootStore.paginationStore.storeData.currentPage = 1;
    this.storeData.showAllVehicles = true;

    this.storeData.showingVehicles = this.rootStore.vehicleService
      .getVehicles()
      .filter((vehicle) => {
        const name = this.storeData.searchName.toLowerCase();

        const model = vehicle.model.toLowerCase().slice(0, name.length);

        if (this.storeData.searchName === "") {
          this.storeData.showAllVehicles = false;
          return this.rootStore.vehicleService.getVehicles();
        }

        return model === name;
      });

    if (
      this.storeData.searchName.length >= 1 &&
      this.storeData.showingVehicles.length === 0
    ) {
      this.rootStore.warningMessageStore.setWarningMessage(
        true,
        "There is no make or model with that name",
        "backgroundBlue"
      );
    } else {
      this.rootStore.warningMessageStore.setWarningMessage(false, "", "");
    }
  };

  // Show all vehicles or show pagination depending on showALlVehicles value, change UI and reset states
  showAll = () => {
    this.rootStore.warningMessageStore.setWarningMessage(false, "", "");
    this.storeData.searchName = "";
    this.rootStore.vehicleCardStore.resetState();
    this.storeData.showAllVehicles = !this.storeData.showAllVehicles;
    this.storeData.showingVehicles = this.rootStore.vehicleService.getVehicles();
    this.rootStore.paginationStore.storeData.currentPage = 1;

    if (this.storeData.showingVehicles.length < 9) {
      this.storeData.showAllVehicles = true;
    }

    this.rootStore.paginationStore.storeData.postsPerPage = this.storeData
      .showAllVehicles
      ? this.rootStore.vehicleService.getVehicles().length
      : 8;
  };

  // Function for sorting vehicles array by the year
  sortByYear = () => {
    this.storeData.sortingByYear = !this.storeData.sortingByYear;
    this.storeData.showingVehicles = this.storeData.showingVehicles.sort(
      (a, b) =>
        this.storeData.sortingByYear ? a.year - b.year : b.year - a.year
    );
  };

  // Function for sorting vehicles array by the horsepower
  sortByHorsepower = () => {
    this.storeData.sortingByHorsepower = !this.storeData.sortingByHorsepower;
    this.storeData.showingVehicles = this.storeData.showingVehicles.sort(
      (a, b) =>
        this.storeData.sortingByHorsepower
          ? a.horsePower - b.horsePower
          : b.horsePower - a.horsePower
    );
  };

  // Functions for toggling if users is seeing filtering options or not when he is in mobile view
  handleShowingMore = () => (this.storeData.moreOptions = true);
  handleShowingLess = () => (this.storeData.moreOptions = false);

  //Function for reseting the state when user enters or leaves edit page so everything works as it is supposed to. This function is called in EditPage component, but it does main clean up between switching pages, and it is mainly connected to vehicles and vehicleContainer, so I decided to put it here
  resetData = (isEditing) => {
    this.storeData.isEditing = isEditing;
    this.rootStore.paginationStore.storeData.currentPage = 1;
    this.rootStore.paginationStore.storeData.postsPerPage = 8;
    this.storeData.showAllVehicles = false;
    this.storeData.searchName = "";
    this.storeData.showingVehicles = this.rootStore.vehicleService.getVehicles();
    this.storeData.sortingByYear = false;
    this.storeData.sortingByHorsepower = true;
    this.rootStore.vehicleCardStore.storeData.editingInputs.editingCard = false;
    this.rootStore.warningMessageStore.setWarningMessage(false, "", "");

    if (this.storeData.showingVehicles.length < 9) {
      this.storeData.showAllVehicles = true;
    }
  };
}

export default VehicleContainerStore;
