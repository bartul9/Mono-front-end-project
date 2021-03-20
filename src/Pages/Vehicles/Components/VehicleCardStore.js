import { observable } from "mobx";

// Function for merging two objects provided by "loadash"
import { mergeWith } from "lodash";

class VehicleCardStore {
  constructor(rootStore) {
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

  // Delete selected vehicle, then check if showingVehicles array had only one vehicle in it, if true that means that user deleted vehicle while he was editing only one card, so put showAllVehicles to false, so UI is back to pagination when user deletes selected card, also perform check if there is 8 or less vehicles in array, if true change UI so pagination is gone
  deleteVehicle = (id) => {
    this.rootStore.vehicleService.deleteVehicle(id);

    if (
      this.rootStore.vehicleContainerStore.storeData.showingVehicles.length ===
      1
    ) {
      this.rootStore.vehicleContainerStore.storeData.showAllVehicles = false;
    }

    this.rootStore.vehicleContainerStore.storeData.showingVehicles = this.rootStore.vehicleService.getVehicles();
    this.rootStore.vehicleContainerStore.storeData.searchName = "";

    if (this.rootStore.vehicleService.getVehicles().length < 9) {
      this.rootStore.vehicleContainerStore.storeData.showAllVehicles = true;
      this.rootStore.vehicleContainerStore.storeData.currentPage = 1;
      this.rootStore.vehicleContainerStore.storeData.postsPerPage = 8;
    }
  };

  // When user clicks on edit button set currentPage to be 1, set showAllVehicles to be true so UI changes, toggle editing card so form is displayed and put clicked vehicle into showingVehicles array
  handleEditClick = (id) => {
    this.rootStore.vehicleContainerStore.storeData.currentPage = 1;
    this.rootStore.vehicleContainerStore.storeData.showAllVehicles = true;
    this.storeData.editingInputs.editingCard = !this.storeData.editingInputs
      .editingCard;

    this.rootStore.vehicleContainerStore.storeData.showingVehicles = this.rootStore.vehicleService
      .getVehicles()
      .filter((vehicle) => {
        return vehicle.id === id;
      });
  };

  // Function for editing vehicle. So, I map through all vehicles and compare edited vehicle ID to vehicle ID, if they match I merge those two objects together and keep all the data that is not empty.So if you only edited vehicle year rest of object will remain same as before because empty or undefined inputs won't merge. I used mergeWith function provided by "loadash" to do the merging.
  editVehicle = (editedVehicle, id) => {
    this.rootStore.vehicleContainerStore.storeData.searchName = "";

    const editingVehicle = { ...editedVehicle, id };

    const finalResult = this.rootStore.vehicleService
      .getVehicles()
      .map((vehicle) => {
        if (editingVehicle.id === vehicle.id) {
          const result = mergeWith({}, vehicle, editingVehicle, (a, b) =>
            b === "" ? a : undefined
          );
          this.rootStore.vehicleContainerStore.storeData.showingVehicles = [
            result,
          ];
          return result;
        }
        return vehicle;
      });

    this.rootStore.vehicleService.editVehicle(finalResult);

    this.resetState();
  };

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
