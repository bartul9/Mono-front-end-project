import VehicleContainerStore from "./VehiclesStores/VehicleContainerStore";
import MainStore from "./VehiclesStores/MainStore";
import VehicleCardStore from "./VehiclesStores/VehicleCardStore";
import CreateNewVehicleStore from "./VehiclesStores/CreateNewVehicleStore";
import MakeStore from "./MakeStores/MakeStore";
import CreateMakeCardStore from "./MakeStores/CreateMakeCardStore";
import SharedFunctionsStore from "./SharedFunctionsStore/SharedFunctionsStore";
import DeleteMakeCardStore from "./MakeStores/DeleteMakeCardStore";

class RootStore {
  constructor() {
    this.mainStore = new MainStore(this);
    this.vehicleContainerStore = new VehicleContainerStore(this);
    this.vehicleCardStore = new VehicleCardStore(this);
    this.createNewVehicleStore = new CreateNewVehicleStore(this);
    this.makeStore = new MakeStore(this);
    this.createMakeCardStore = new CreateMakeCardStore(this);
    this.sharedFunctionsStore = new SharedFunctionsStore(this);
    this.deleteMakeCardStore = new DeleteMakeCardStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;
