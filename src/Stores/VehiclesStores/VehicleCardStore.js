import { observable } from "mobx";

// Function for merging two objects provided by "loadash"
import { mergeWith } from "lodash";

class VehicleCardStore {
  constructor(rootStore) {
    this.mainStore = rootStore.mainStore;
    this.rootStore = rootStore;
    this.storeData = observable({
      editingInputs: {
        editingCard: false,
        makeValue: "",
        modelValue: "",
        horsePowerValue: "",
        imgValue: "",
        engineValue: "",
        yearValue: "",
      },
    });
  }

  //  Function for reseting the state, since reseting state is fired up two times I decided to put reseting state in one function so I can use it multple times
  resetState = () => {
    this.storeData.editingInputs = {
      editingCard: false,
      makeValue: "",
      modelValue: "",
      horsePowerValue: "",
      imgValue: "",
      engineValue: "",
      yearValue: "",
    };
  };

  // First delete selected vehicle by filtering trough vehicles array and leaving out vehicle with maching ID. Then check if showingVehicles array containes only one vehicle (that means that screen is empty and that the user deleted card while he was editing only one card), if yes then set showAllVehicles to be true and showingVehicles to contain all vehicles, then reset searchName input and check if vehicles array contains less then 9 pages, if yes put showAllVehicles to be true so pagination disapears and put current page to be equal to 1 so if the user was on the second page he jumps straight back to first page
  deleteVehicle = (id) => {
    this.mainStore.vehicles = this.mainStore.vehicles.filter(
      (vehicle) => vehicle.id !== id
    );
    if (this.mainStore.storeData.showingVehicles.length === 1) {
      this.mainStore.storeData.showAllVehicles = true;
      this.mainStore.storeData.showingVehicles = this.mainStore.vehicles;
    }
    this.mainStore.storeData.showingVehicles = this.mainStore.vehicles;
    this.rootStore.vehicleContainerStore.storeData.searchName = "";
    if (this.mainStore.vehicles.length < 9) {
      this.mainStore.storeData.showAllVehicles = true;
      this.rootStore.vehicleContainerStore.storeData.currentPage = 1;
      this.rootStore.vehicleContainerStore.storeData.postsPerPage = 8;
    }
  };

  // When user clicks on edit button set currentPage to be 1, set showAllVehicles to be true so paggination disapears, toggle editing card so form is displayed and put clicked vehicle into showingVehicles array
  handleEditClick = (id) => {
    this.rootStore.vehicleContainerStore.storeData.currentPage = 1;
    this.mainStore.storeData.showAllVehicles = true;
    this.storeData.editingInputs.editingCard = !this.storeData.editingInputs
      .editingCard;
    this.mainStore.storeData.showingVehicles = this.mainStore.vehicles.filter(
      (vehicle) => {
        return vehicle.id === id;
      }
    );
  };

  // Function for editing vehicle. So, I map through all vehicles and compare edited vehicle ID to vehicle ID, if they match I merge those two objects together and keep all the data that is not empty.So if you only edited vehicle model rest of object will remain same as before because empty or undefined inputs won't merge. I used mergeWith function provided by "loadash" to do the merging.
  editVehicle = (editedVehicle, id) => {
    this.rootStore.vehicleContainerStore.storeData.searchName = "";
    const editingVehicle = { ...editedVehicle, id };
    this.mainStore.vehicles = this.mainStore.vehicles.map((vehicle) => {
      if (editingVehicle.id === vehicle.id) {
        const result = mergeWith({}, vehicle, editingVehicle, (a, b) =>
          b === "" ? a : undefined
        );
        this.mainStore.storeData.showingVehicles = [result];
        return result;
      }
      return vehicle;
    });
    this.resetState();
  };

  // Handle submit function => This function serves as a form submiter if user is editing one of the cards. I passed this local state to editVehicle function which comes from the store, and that function updates the vehicles array in the store with new edited vehicle. Every vehicle after it has been updated gets new key/value properitie editingCard which tell's if card is being edited or not.
  handleSubmit = (evt, id) => {
    evt.preventDefault();
    this.editVehicle(this.storeData.editingInputs, id);
  };

  updateProperty = (key, value) => {
    this.storeData.editingInputs[key] = value;
  };

  handleChange = (evt) => {
    this.updateProperty(evt.target.name, evt.target.value);
  };
}

export default VehicleCardStore;
