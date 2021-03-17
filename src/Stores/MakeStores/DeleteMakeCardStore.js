import { observable } from "mobx";

class DeleteMakeCardStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.storeData = observable({
      deleting: false,
      showingMessage: false,
    });
  }

  deleteMakeCard = (id) => {
    const deletedMakes = [];
    this.rootStore.makeStore.storeData.makes = this.rootStore.makeStore.storeData.makes.filter(
      (make) => {
        make.id === id && deletedMakes.push(make.make);
        return make.id !== id;
      }
    );
    deletedMakes.forEach(
      (make) =>
        (this.rootStore.mainStore.vehicles = this.rootStore.mainStore.vehicles.filter(
          (vehicle) => vehicle.make !== make
        ))
    );
    console.log(this.rootStore.makeStore.storeData.makes);
  };

  handleDeleteClick = () => {
    this.storeData.deleting = !this.storeData.deleting;
    if (this.storeData.deleting === true) {
      this.rootStore.mainStore.storeData.showingMessage = true;
      this.rootStore.mainStore.storeData.error =
        "All vehicles containing deleted make will also be deleted";
    } else {
      this.rootStore.mainStore.storeData.showingMessage = false;
    }
  };
}

export default DeleteMakeCardStore;
