import { observable } from "mobx";

// UUID for unique ID for every make
import { v4 as uuid } from "uuid";

class CreateMakeStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.storeData = observable({
      editing: false,
      toggleDateFormat: false,
      toggleMakeList: false,
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
    this.storeData.toggleDateFormat = false;
    this.storeData.toggleMakeList = false;
    this.storeData.makeData = {
      make: "",
      country: "",
      founded: "",
      logo: "",
    };
  };

  handleToggleDateFormat = () => {
    this.storeData.toggleDateFormat = !this.storeData.toggleDateFormat;
  };

  handleToggleMakeList = () => {
    this.storeData.toggleMakeList = !this.storeData.toggleMakeList;
  };

  // Toggle modal display and check if there was warningMessage showing, if true clean it on close
  handleToggleMakeModal = () => {
    this.storeData.editing = !this.storeData.editing;
    if (!this.storeData.editing) {
      this.rootStore.warningMessageStore.setWarningMessage(false, "", "");
      this.resetInputs();
    }
  };

  // Function for changing date format into "January 17, 2020" or returning just year if founded date only contains year
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

    // Check if first number is 0 if true return num without zero, if false return num
    const checkZero = (num) =>
      num.toString().split("")[0] == 0 ? num[1] : num;

    if (date.length < 5) return date;

    const year = date.slice(0, 4);
    const month = months.splice(checkZero(date.slice(5, 7)) - 1, 1);
    const day = checkZero(date.slice(-2));

    return `${month[0]} ${day}, ${year}`;
  };

  updateProperty = (key, value) => {
    this.storeData.makeData[key] = value;
  };

  handleChange = (event) => {
    this.updateProperty(event.target.name, event.target.value);
  };

  // If all inputs are valid check if make already exist if true show warningMessage if false => change date format, and push object to makeStore
  handleSubmit = (e) => {
    e.preventDefault();

    if (
      this.rootStore.sharedFunctionsStore.checkValidInputs(
        this.storeData.makeData
      )
    ) {
      if (
        !this.rootStore.makeService
          .getMakes()
          .some((make) => make.make === this.storeData.makeData.make)
      ) {
        this.rootStore.makeService.addMake({
          ...this.storeData.makeData,
          founded: this.changeDateFormat(this.storeData.makeData.founded),
          id: uuid(),
        });
        this.resetInputs();
        this.rootStore.makeStore.storeData.showingMakes = this.rootStore.makeService.getMakes();
        this.rootStore.warningMessageStore.setWarningMessage(false, "", "");
      } else {
        this.rootStore.warningMessageStore.setWarningMessage(
          true,
          "That make already exists",
          "backgroundBlue"
        );
        return;
      }
    } else {
      this.rootStore.warningMessageStore.setWarningMessage(
        true,
        "All inputs must be filled",
        "backgroundBlue"
      );
    }
  };
}

export default CreateMakeStore;
