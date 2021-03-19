import { observable } from "mobx";

class MakeStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.storeData = observable({
      showingMakes: this.rootStore.makeService.getMakes(),
      scrolling: false,
    });
  }
}

export default MakeStore;
