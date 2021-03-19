import VehicleContainerStore from "../Pages/Vehicles/Components/VehicleContainerStore";
import VehicleCardStore from "../Pages/Vehicles/Components/VehicleCardStore";
import CreateVehicleStore from "../Pages/Vehicles/Components/CreateVehicleStore";
import MakeService from "../Services/MakeService";
import CreateMakeStore from "../Pages/Make/Components/CreateMakeStore";
import SharedFunctionsStore from "../Common/SharedFunctionsStore";
import DeleteMakeStore from "../Pages/Make/Components/DeleteMakeStore";
import WarningMessageStore from "../Components/WarningMessageStore";
import VehicleService from "../Services/VehicleService";
import MakeStore from "../Pages/Make/MakeStore";

class RootStore {
  constructor() {
    this.createVehicleStore = new CreateVehicleStore(this);
    this.vehicleCardStore = new VehicleCardStore(this);
    this.warningMessageStore = new WarningMessageStore(this);
    this.deleteMakeStore = new DeleteMakeStore(this);
    this.sharedFunctionsStore = new SharedFunctionsStore(this);
    this.vehicleService = new VehicleService(this);
    this.createMakeStore = new CreateMakeStore(this);
    this.makeService = new MakeService(this);
    this.makeStore = new MakeStore(this);
    this.vehicleContainerStore = new VehicleContainerStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;
