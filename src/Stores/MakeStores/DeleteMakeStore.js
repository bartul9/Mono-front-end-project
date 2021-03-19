import { observable } from "mobx";

class DeleteMakeStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.storeData = observable({
      deleting: false,
    });
  }

  // When user deletes one of the make cards filter trough the makes and leave out make equal to selected make, also filter trough vehicles array and remove all vehicles with deleted make
  deleteMake = (id) => {
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

  // When user clicks on Delete Make buton toggle deleting value and change ui, also if it is true show warningMessage, if false remove it
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

export default DeleteMakeStore;
