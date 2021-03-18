import { observable } from "mobx";

// UUID unique ID generator for vehicles ID
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

  resetInput = () => {
    this.storeData.newVehicle = {
      make: "",
      model: "",
      year: "",
      engine: "",
      horsePower: "",
      img: "",
    };
    this.rootStore.mainStore.storeData.showAllVehicles = true;
  };

  updateProperty = (key, value) => {
    this.storeData.newVehicle[key] = value;
  };

  handleChange = (event) => {
    this.updateProperty(event.target.name, event.target.value);
  };

  // If all inputs are filled update vehicles array in the store with new created vehicle. Clean local state, so all inputs are empty, and state is clean, and call displayCreateNewVehicle function which closes the modal window, if there was error display warningMessage
  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.rootStore.sharedFunctionsStore.checkValidInputs(
        this.storeData.newVehicle
      )
    ) {
      const vehicle = { ...this.storeData.newVehicle, id: uuid() };
      this.rootStore.mainStore.storeData.showAllVehicles = false;
      this.rootStore.mainStore.storeData.showingVehicles = [vehicle];
      this.rootStore.mainStore.vehicles.push(vehicle);
      this.displayCreateNewVehicle();
      this.resetInput();
    } else {
      this.rootStore.warningMessageStore.setWarningMessage(
        true,
        "All inputs must be filled",
        "backgroundBlue"
      );
    }
  };

  // Function for toggling modal display, also perform check if the warningMessage was showing, if true, remove it
  displayCreateNewVehicle = () => {
    this.storeData.displayingCreateNewVehicle = !this.storeData
      .displayingCreateNewVehicle;
    if (this.storeData.displayingCreateNewVehicle === false) {
      this.rootStore.warningMessageStore.setWarningMessage(false, "", "");
    }
  };
}

export default CreateNewVehicleStore;
