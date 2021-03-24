import { observable } from "mobx";

import { v4 as uuid } from "uuid";

class CreateNewVehicleStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.storeData = observable({
      displayingCreateNewVehicle: false,
      newVehicle: {
        make: "",
        model: "",
        year: "",
        engine: "",
        horsePower: "",
        img: "",
      },
    });
  }

  resetInputs = () => {
    this.storeData.newVehicle = {
      make: "",
      model: "",
      year: "",
      engine: "",
      horsePower: "",
      img: "",
    };
    this.rootStore.vehicleContainerStore.storeData.showAllVehicles = true;
  };

  updateProperty = (key, value) => (this.storeData.newVehicle[key] = value);

  handleChange = (event) =>
    this.updateProperty(event.target.name, event.target.value);

  // If all inputs are filled update vehicles array with new vehicle. Clean local state, so all inputs are empty, also call displayCreateNewVehicle function which closes the modal window, if there was error display warningMessage
  handleSubmit = (e) => {
    e.preventDefault();

    if (
      this.rootStore.sharedFunctionsStore.checkValidInputs(
        this.storeData.newVehicle
      )
    ) {
      this.rootStore.vehicleContainerStore.storeData.showAllVehicles = false;
      this.rootStore.paginationStore.storeData.currentPage = 1;

      const vehicle = { ...this.storeData.newVehicle, id: uuid() };
      this.rootStore.vehicleService.addVehicle(vehicle);
      this.rootStore.vehicleContainerStore.storeData.showingVehicles = [
        vehicle,
      ];

      this.displayCreateNewVehicle();
      this.resetInputs();
    } else {
      this.rootStore.warningMessageStore.setWarningMessage(
        true,
        "All inputs must be filled",
        "backgroundBlue"
      );
    }
  };

  // Function for toggling modal display, also perform check if warningMessage was showing, if true, remove it
  displayCreateNewVehicle = () => {
    this.storeData.displayingCreateNewVehicle = !this.storeData
      .displayingCreateNewVehicle;
    this.rootStore.vehicleCardStore.resetState();

    if (this.storeData.displayingCreateNewVehicle === false) {
      this.rootStore.warningMessageStore.setWarningMessage(false, "", "");
    }
  };
}

export default CreateNewVehicleStore;
