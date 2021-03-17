import { v4 as uuid } from "uuid";

class CreateNewVehicleStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.mainStore = rootStore.mainStore;
    this.storeData = {
      make: "",
      model: "",
      year: "",
      engine: "",
      horsePower: "",
      img: "",
    };
  }

  resetInput = () => {
    this.storeData = {
      make: "",
      model: "",
      year: "",
      engine: "",
      horsePower: "",
      img: "",
    };
    this.mainStore.storeData.showAllVehicles = true;
  };

  // This function recieves vehicle object from CreateNewVehicle component and it pushes that vehicle object to vehicles array
  addVehicle = (vehicle) => {
    this.mainStore.storeData.showAllVehicles = false;
    this.mainStore.storeData.showingVehicles = [vehicle];
    this.mainStore.vehicles.push(vehicle);
  };

  updateProperty = (key, value) => {
    this.storeData[key] = value;
  };

  handleChange = (event) => {
    this.updateProperty(event.target.name, event.target.value);
  };

  // handleSubmit function => If all inputs are filled update vehicles array in the store with new created vehicle. Clean local state, so all inputs are empty, and state is clean, and call displayCreateNewVehicle function which closes the modal window

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.rootStore.sharedFunctionsStore.checkValidInputs(this.storeData)) {
      this.addVehicle({
        ...this.storeData,
        id: uuid(),
      });
      this.mainStore.displayCreateNewVehicle();
      this.resetInput();
    } else {
      this.mainStore.storeData.showingMessage = true;
      this.mainStore.storeData.error = "All inputs must be filled";
    }
  };
}

export default CreateNewVehicleStore;
