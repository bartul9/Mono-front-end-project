class SharedFunctionsStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.mainStore = rootStore.mainStore;
  }

  // Function for checking if all inputs are filled if yes return true otherwise return false and show error message
  checkValidInputs(inputs) {
    const arr = Object.values(inputs);
    return arr.every((value) => value.length > 0);
  }
}

export default SharedFunctionsStore;
