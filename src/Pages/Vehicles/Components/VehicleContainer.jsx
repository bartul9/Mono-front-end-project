import React, { Component } from "react";

// Styles
import "./VehicleContainer.css";

// Components
import SortingFilteringComponent from "./SortingFilteringComponent";
import VehicleCard from "./VehicleCard";
import Pagination from "../../../Components/Pagination";

// Inject and Observer from mobx
import { inject, observer } from "mobx-react";

@inject("rootStore")
@observer
class VehicleContainer extends Component {
  render() {
    const {
      showAllVehicles,
      showingVehicles,
      isEditing,
    } = this.props.rootStore.vehicleContainerStore.storeData;

    const { countItems } = this.props.rootStore.paginationStore;

    return (
      <section className="VehicleContainer">
        <SortingFilteringComponent />
        <div className="VehicleContainer-container">
          {countItems(showingVehicles).map((vehicle) => {
            return (
              <VehicleCard
                key={vehicle.id}
                id={vehicle.id}
                makeId={vehicle.makeId}
                model={vehicle.model}
                horsePower={vehicle.horsePower}
                engine={vehicle.engine}
                year={vehicle.year}
                image={vehicle.img}
                editing={isEditing}
                props={this.props.props}
              />
            );
          })}
        </div>
        {!showAllVehicles && showingVehicles.length > 8 && <Pagination />}
      </section>
    );
  }
}

export default VehicleContainer;
