import VehicleContainerStore from "./VehiclesStores/VehicleContainerStore";
import MainStore from "./VehiclesStores/MainStore";
import VehicleCardStore from "./VehiclesStores/VehicleCardStore";
import CreateVehicleStore from "./VehiclesStores/CreateVehicleStore";
import MakeStore from "./MakeStores/MakeStore";
import CreateMakeCardStore from "./MakeStores/CreateMakeCardStore";
import SharedFunctionsStore from "./SharedFunctionsStore/SharedFunctionsStore";
import DeleteMakeCardStore from "./MakeStores/DeleteMakeCardStore";
import WarningMessageStore from "./CommonStores/WarningMessageStore";

class RootStore {
  constructor() {
    this.deleteMakeCardStore = new DeleteMakeCardStore(this);
    this.sharedFunctionsStore = new SharedFunctionsStore(this);
    this.createMakeCardStore = new CreateMakeCardStore(this);
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
