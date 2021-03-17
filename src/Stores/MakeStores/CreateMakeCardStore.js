import { observable } from "mobx";

import { v4 as uuid } from "uuid";

class CreateMakeCardStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.makeStore = rootStore.makeStore;
    this.storeData = observable({
      editing: false,
      dateFormat: false,
      makeData: {
        make: "",
        country: "",
        founded: "",
        logo: "",
      },
    });
  }

  resetInputs = () => {
    this.storeData.editing = false;
    this.storeData.makeData = {
      make: "",
      country: "",
      founded: "",
      logo: "",
    };
  };

  handleDateFormatChange = () => {
    this.storeData.dateFormat = !this.storeData.dateFormat;
  };

  handleClick = () => {
    this.storeData.editing = !this.storeData.editing;
    if (!this.storeData.editing) {
      this.rootStore.mainStore.storeData.showingMessage = false;
    }
  };

  changeDateFormat = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const checkZero = (num) => (num[0] === 0 ? num[1] : num);

    if (date.length < 5) return date;

    const year = date.slice(0, 4);
    const month = months.splice(checkZero(date.slice(5, 7)) - 1, 1);
    const day = date.slice(checkZero(-2));

    return `${month[0]} ${day}, ${year}`;
  };

  updateProperty = (key, value) => {
    this.storeData.makeData[key] = value;
  };

  handleChange = (event) => {
    this.updateProperty(event.target.name, event.target.value);
  };

  // handleSubmit function => If all inputs are filled update vehicles array in the store with new created vehicle. Clean local state, so all inputs are empty, and state is clean, and call displayCreateNewVehicle function which closes the modal window

  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.rootStore.sharedFunctionsStore.checkValidInputs(
        this.storeData.makeData
      )
    ) {
      this.makeStore.storeData.makes.push({
        ...this.storeData.makeData,
        founded: this.changeDateFormat(this.storeData.makeData.founded),
        id: uuid(),
      });
      this.resetInputs();
    } else {
      this.rootStore.mainStore.storeData.showingMessage = true;
      this.rootStore.mainStore.storeData.error = "All inputs must be filled";
    }
  };
}

export default CreateMakeCardStore;
