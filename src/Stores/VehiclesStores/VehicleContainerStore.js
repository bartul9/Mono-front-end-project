import { observable } from "mobx";

class VehicleContainerStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.storeData = observable({
      sortingByHorsepower: false,
      sortingByYear: true,
      filteringByMake: false,
      optionValue: "",
      more: false,
      currentPage: 1,
      postsPerPage: 8,
      searchName: "",
    });
  }

  // Function for filtering cars by make. First reset searchName input, then put showAllVehicles to be true so icons footer icons move up, put editingCard to false so if user was editing one of the cards the form dissapears on change, set postsPerPage to be 8 and currentPage to be 1 and show filtered vehicle. Also check if showingVehicles array contains more than 8 vehicles if true move footer icons back to bottom, if there is no matching vehicle show warningMessage
  filterByMake = (value) => {
    this.storeData.searchName = "";
    this.rootStore.mainStore.storeData.showAllVehicles = true;
    this.rootStore.vehicleCardStore.storeData.editingInputs.editingCard = false;
    this.storeData.postsPerPage = 8;
    this.storeData.currentPage = 1;
    this.rootStore.mainStore.storeData.showingVehicles = this.rootStore.mainStore.vehicles.filter(
      (vehicle) => {
        return vehicle.make === value;
      }
    );

    if (this.rootStore.mainStore.storeData.showingVehicles.length > 8) {
      this.rootStore.mainStore.storeData.showAllVehicles = false;
    }

    if (this.rootStore.mainStore.storeData.showingVehicles.length === 0) {
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
    this.rootStore.mainStore.storeData.showAllVehicles = true;
    this.rootStore.mainStore.storeData.showingVehicles = this.rootStore.mainStore.vehicles.filter(
      (vehicle) => {
        const name = this.storeData.searchName.toLowerCase();
        const make = vehicle.make.toLowerCase().slice(0, name.length);
        const model = vehicle.model.toLowerCase().slice(0, name.length);
        if (this.storeData.searchName === "") {
          this.rootStore.mainStore.storeData.showAllVehicles = false;
          return this.rootStore.mainStore.vehicles;
        }

        return make === name || model === name;
      }
    );

    if (
      this.storeData.searchName.length >= 1 &&
      this.rootStore.mainStore.storeData.showingVehicles.length === 0
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

  // Function for showing all vehicles => First hide warningMessage if it was showing, clean searchName input, reset state in vehicleCardStore so if user was editing something and then clicked on show all while editing the state is clean. Put all vehicles in showingVehicles array, put current page to be 1 and postsPerPage to be 8 or vehicles.length depending on the showAllVehicles value, also perform check if vehicles array length is less then 9 if yes put showAllVehicles to be true so footer icons move up and ui changes
  showAll = () => {
    this.rootStore.warningMessageStore.setWarningMessage(false, "", "");
    this.storeData.searchName = "";
    this.rootStore.vehicleCardStore.resetState();
    this.rootStore.mainStore.storeData.showAllVehicles = !this.rootStore
      .mainStore.storeData.showAllVehicles;
    this.rootStore.mainStore.storeData.showingVehicles = this.rootStore.mainStore.vehicles;
    this.storeData.currentPage = 1;
    this.storeData.postsPerPage = this.rootStore.mainStore.storeData
      .showAllVehicles
      ? this.rootStore.mainStore.vehicles.length
      : 8;
    if (this.rootStore.mainStore.vehicles.length < 9) {
      this.rootStore.mainStore.storeData.showAllVehicles = true;
    }
  };

  // Function for sorting vehicles array by the year
  sortByYear = () => {
    this.storeData.sortingByYear = !this.storeData.sortingByYear;
    this.rootStore.mainStore.storeData.showingVehicles = this.rootStore.mainStore.storeData.showingVehicles.sort(
      (a, b) =>
        this.storeData.sortingByYear ? a.year - b.year : b.year - a.year
    );
  };

  // Function for sorting vehicles array by the horsepower
  sortByHorsepower = () => {
    this.storeData.sortingByHorsepower = !this.storeData.sortingByHorsepower;
    this.rootStore.mainStore.storeData.showingVehicles = this.rootStore.mainStore.storeData.showingVehicles.sort(
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
    this.rootStore.mainStore.storeData.isEditing = isEditing;
    if (this.rootStore.mainStore.vehicles.length < 9) {
      this.rootStore.mainStore.storeData.showAllVehicles = true;
    } else {
      this.rootStore.mainStore.storeData.showAllVehicles = false;
    }
    this.rootStore.vehicleContainerStore.storeData.currentPage = 1;
    this.rootStore.vehicleContainerStore.storeData.postsPerPage = 8;
    this.rootStore.vehicleContainerStore.storeData.searchName = "";
    this.rootStore.mainStore.storeData.showingVehicles = this.rootStore.mainStore.vehicles;
    this.rootStore.vehicleContainerStore.storeData.sortingByYear = false;
    this.rootStore.vehicleContainerStore.storeData.sortingByHorsepower = true;
    this.rootStore.vehicleCardStore.storeData.editingInputs.editingCard = false;
    this.rootStore.warningMessageStore.setWarningMessage(false, "", "");
  };
}

export default VehicleContainerStore;
