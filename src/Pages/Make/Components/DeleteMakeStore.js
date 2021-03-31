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
    this.rootStore.makeService.getMakes().forEach((make) => {
      make.id === id &&
        this.rootStore.vehicleService.deleteVehicle(null, make.id);
    });

    this.rootStore.makeService.deleteMake(id);

    this.rootStore.makeStore.storeData.showingMakes = this.rootStore.makeService.getMakes();

    if (this.rootStore.makeStore.storeData.showingMakes.length < 9) {
      this.rootStore.paginationStore.storeData.currentPage = 1;
      this.rootStore.paginationStore.storeData.showAll = true;
    }
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
