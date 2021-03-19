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
      filteringByMake: false,
      showAllVehicles: false,
      isEditing: false,
      makePage: false,
      more: false,
      currentPage: 1,
      postsPerPage: 8,
      searchName: "",
    });
  }

  // Function for filtering cars by make. First reset searchName input, then put showAllVehicles to be true so UI changes, put editingCard to false so if user was editing one of the cards the form dissapears on change, set postsPerPage to be 8 and currentPage to be 1 and show filtered vehicle. Also check if showingVehicles array contains more than 8 vehicles if true move footer icons back to bottom, if there is no matching vehicle show warningMessage
  filterByMake = (value) => {
    this.storeData.searchName = "";
    this.storeData.showAllVehicles = true;
    this.rootStore.vehicleCardStore.storeData.editingInputs.editingCard = false;
    this.storeData.postsPerPage = 8;
    this.storeData.currentPage = 1;
    this.storeData.showingVehicles = this.rootStore.vehicleService
      .getVehicles()
      .filter((vehicle) => {
        return vehicle.make === value;
      });

    if (this.storeData.showingVehicles.length > 8) {
      this.storeData.showAllVehicles = false;
    }

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

  // This function searches for vehicle by the make or model name. I sliced make or model name by the length of search name and on every input change I compared the data and return if it matches
  // Also I performed check so if user types in something and there is no matching vehicle or make I include message so user is informed that there is no vehicles with that name
  searchForName = (e) => {
    this.rootStore.vehicleCardStore.storeData.editingInputs.editingCard = false;
    this.storeData.searchName = e.target.value;
    this.storeData.currentPage = 1;
    this.storeData.showAllVehicles = true;
    this.storeData.showingVehicles = this.rootStore.vehicleService
      .getVehicles()
      .filter((vehicle) => {
        const name = this.storeData.searchName.toLowerCase();
        const make = vehicle.make.toLowerCase().slice(0, name.length);
        const model = vehicle.model.toLowerCase().slice(0, name.length);

        if (this.storeData.searchName === "") {
          this.storeData.showAllVehicles = false;
          return this.rootStore.vehicleService.getVehicles();
        }

        return make === name || model === name;
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

    if (
      this.storeData.searchName === "" &&
      this.rootStore.vehicleService.getVehicles().length < 9
    ) {
      this.storeData.showAllVehicles = true;
    }
  };

  // Function for showing all vehicles => First hide warningMessage if it was showing, clean searchName input, reset state in vehicleCardStore so if user was editing something and then clicked on show all while editing the state is clean. Put all vehicles in showingVehicles array, put current page to be 1 and postsPerPage to be 8 or vehicles.length depending on the showAllVehicles value, also perform check if vehicles array length is less then 9 if yes put showAllVehicles to be true so footer icons move up and ui changes
  showAll = () => {
    this.rootStore.warningMessageStore.setWarningMessage(false, "", "");
    this.storeData.searchName = "";
    this.rootStore.vehicleCardStore.resetState();
    this.storeData.showAllVehicles = !this.storeData.showAllVehicles;
    this.storeData.showingVehicles = this.rootStore.vehicleService.getVehicles();
    this.storeData.currentPage = 1;
    this.storeData.postsPerPage = this.storeData.showAllVehicles
      ? this.rootStore.vehicleService.getVehicles().length
      : 8;
    if (this.rootStore.vehicleService.getVehicles().length < 9) {
      this.storeData.showAllVehicles = true;
    }
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

  // Function for toggling if users is seeing filtering options or not when he is in mobile view
  handleShowingMore = () => {
    this.storeData.more = !this.storeData.more;
  };

  // Function for reseting the state when user enters or leaves edit page so everything works as it is supposed to. This function is called in EditPage component but it does main clean up between switching pages and it is mainly connected to vehicles and vehicleContainer so I decided to put it here
  resetData = (isEditing) => {
    this.storeData.isEditing = isEditing;
    if (this.rootStore.vehicleService.getVehicles().length < 9) {
      this.storeData.showAllVehicles = true;
    } else {
      this.storeData.showAllVehicles = false;
    }
    this.storeData.currentPage = 1;
    this.storeData.postsPerPage = 8;
    this.storeData.searchName = "";
    this.storeData.showingVehicles = this.rootStore.vehicleService.getVehicles();
    this.storeData.sortingByYear = false;
    this.storeData.sortingByHorsepower = true;
    this.rootStore.vehicleCardStore.storeData.editingInputs.editingCard = false;
    this.rootStore.warningMessageStore.setWarningMessage(false, "", "");
  };

  // Paggination functionality

  paginate = (pageNum) => (this.storeData.currentPage = pageNum);

  nextPage = () => {
    this.storeData.currentPage = this.storeData.currentPage + 1;
  };

  prevPage = () =>
    (this.storeData.currentPage = this.storeData.currentPage - 1);
}

export default VehicleContainerStore;
