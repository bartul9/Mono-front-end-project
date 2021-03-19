import VehicleContainerStore from "./VehiclesStores/VehicleContainerStore";
import MainStore from "./VehiclesStores/MainStore";
import VehicleCardStore from "./VehiclesStores/VehicleCardStore";
import CreateVehicleStore from "./VehiclesStores/CreateVehicleStore";
import MakeStore from "./MakeStores/MakeStore";
import CreateMakeStore from "./MakeStores/CreateMakeStore";
import SharedFunctionsStore from "./CommonStores/SharedFunctionsStore";
import DeleteMakeStore from "./MakeStores/DeleteMakeStore";
import WarningMessageStore from "./CommonStores/WarningMessageStore";

class RootStore {
  constructor() {
    this.deleteMakeStore = new DeleteMakeStore(this);
    this.sharedFunctionsStore = new SharedFunctionsStore(this);
    this.createMakeStore = new CreateMakeStore(this);
    this.makeStore = new MakeStore(this);
    this.createVehicleStore = new CreateVehicleStore(this);
    this.vehicleCardStore = new VehicleCardStore(this);
    this.warningMessageStore = new WarningMessageStore(this);
    this.mainStore = new MainStore(this);
    this.vehicleContainerStore = new VehicleContainerStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;
