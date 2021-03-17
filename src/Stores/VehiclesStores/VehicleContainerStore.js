import { observable } from "mobx";

class VehicleContainerStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.mainStore = rootStore.mainStore;
    this.storeData = observable({
      sortingByHorsepower: false,
      sortingByYear: true,
      filteringByMake: false,
      optionValue: "",
      more: true,
      currentPage: 1,
      postsPerPage: 8,
      searchName: "",
    });
  }

  // Function for filtering cars by make. First reset searchName input, then put showAllVehicles to be true so paggination is gone, put editingCard to false so if user was editing one of the cards the form dissapears on change, set postsPerPage to be 8 and currentPage to be 1 and show filtered vehicle. Also check if showingVehicles array contains more than 8 vehicles if yes, include paggination
  filterByMake = (value) => {
    this.storeData.searchName = "";
    this.mainStore.storeData.showAllVehicles = true;
    this.rootStore.vehicleCardStore.storeData.editingInputs.editingCard = false;
    this.postsPerPage = 8;
    this.currentPage = 1;
    this.mainStore.storeData.showingVehicles = this.mainStore.vehicles.filter(
      (vehicle) => {
        return vehicle.make === value;
      }
    );
    if (this.mainStore.storeData.showingVehicles.length > 8) {
      this.mainStore.storeData.showAllVehicles = false;
    }

    if (this.mainStore.storeData.showingVehicles.length === 0) {
      this.mainStore.storeData.error = "There is no make with that name";
      this.mainStore.storeData.showingMessage = true;
    } else {
      this.mainStore.storeData.showingMessage = false;
    }
  };

  // This function searches for car by the make or model name. I sliced make or model name by the length of search name and on every input change I compared the data and return if it matches
  // Also I performed check so if user types in something and there is no matching cars I include message in container so user is informed that there is no vehicles with that name
  searchForName = (e) => {
    this.rootStore.vehicleCardStore.storeData.editingInputs.editingCard = false;
    this.storeData.searchName = e.target.value;
    this.storeData.currentPage = 1;
    this.mainStore.storeData.showAllVehicles = true;
    this.mainStore.storeData.showingVehicles = this.mainStore.vehicles.filter(
      (vehicle) => {
        const name = this.storeData.searchName.toLowerCase();
        const make = vehicle.make.toLowerCase().slice(0, name.length);
        const model = vehicle.model.toLowerCase().slice(0, name.length);
        if (this.storeData.searchName === "") {
          this.mainStore.storeData.showAllVehicles = false;
          return this.mainStore.vehicles;
        }

        return make === name || model === name;
      }
    );

    if (
      this.storeData.searchName.length >= 1 &&
      this.mainStore.storeData.showingVehicles.length === 0
    ) {
      this.mainStore.storeData.showingMessage = true;
      this.mainStore.storeData.error =
        "There is no make or model with that name";
    } else {
      this.mainStore.storeData.showingMessage = false;
    }
  };

  // Function for showing all vehicles.
  showAll = () => {
    this.mainStore.storeData.showingMessage = false;
    this.storeData.searchName = "";
    this.rootStore.vehicleCardStore.resetState();
    this.mainStore.storeData.showAllVehicles = !this.mainStore.storeData
      .showAllVehicles;
    this.mainStore.storeData.showingVehicles = this.mainStore.vehicles;
    this.storeData.currentPage = 1;
    this.storeData.postsPerPage = this.mainStore.storeData.showAllVehicles
      ? this.mainStore.vehicles.length
      : 8;
    if (this.mainStore.storeData.showingVehicles.length < 9) {
      this.mainStore.storeData.showAllVehicles = true;
    }
  };

  // Function for sorting vehicles array by the year they were made in
  sortByYear = () => {
    this.storeData.sortingByYear = !this.storeData.sortingByYear;
    this.mainStore.storeData.showingVehicles = this.mainStore.storeData.showingVehicles.sort(
      (a, b) =>
        this.storeData.sortingByYear ? a.year - b.year : b.year - a.year
    );
  };

  // Function for sorting vehicles array by the horsepower they have
  sortByHorsepower = () => {
    this.storeData.sortingByHorsepower = !this.storeData.sortingByHorsepower;
    this.mainStore.storeData.showingVehicles = this.mainStore.storeData.showingVehicles.sort(
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
}

export default VehicleContainerStore;
