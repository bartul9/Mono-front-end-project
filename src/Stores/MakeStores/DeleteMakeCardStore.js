import { observable } from "mobx";

class DeleteMakeCardStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.storeData = observable({
      deleting: false,
    });
  }

  // When user deletes one of the make cards filter trough the makes and leave out make.id equal to selected id, also filter trough vehicles array and remove all vehicles with deleted make
  deleteMakeCard = (id) => {
    this.rootStore.makeStore.storeData.makes = this.rootStore.makeStore.storeData.makes.filter(
      (make) => {
        make.id === id &&
          (this.rootStore.mainStore.vehicles = this.rootStore.mainStore.vehicles.filter(
            (vehicle) => vehicle.make !== make.make
          ));
        return make.id !== id;
      }
    );
  };

  // When user clicks on Delete Make buton in navbar toggle deleting value if it is true show warningMessage, if false remove it
  handleDeleteClick = () => {
    this.storeData.deleting = !this.storeData.deleting;
    if (this.storeData.deleting === true) {
      this.rootStore.warningMessageStore.setWarningMessage(
        true,
        "All vehicles containing deleted make will also be deleted",
        ""
      );
    } else {
      this.rootStore.warningMessageStore.setWarningMessage(false, "", "");
    }
  };
}

export default DeleteMakeCardStore;
