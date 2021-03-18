import React, { Component } from "react";

// Styles
import "./VehicleContainer.css";

// Components
import SortingFilteringComponent from "./SortingFilteringComponent";
import VehicleCard from "./VehicleCard";
import Pagination from "./Pagination";

// This component serves as a container for displaying vehicles cards

// Inject and Observer from mobx
import { inject, observer } from "mobx-react";

@inject("rootStore")
@observer
class VehicleContainer extends Component {
  render() {
    const {
      postsPerPage,
      currentPage,
    } = this.props.rootStore.vehicleContainerStore.storeData;

    const {
      showAllVehicles,
      showingVehicles,
      isEditing,
    } = this.props.rootStore.mainStore.storeData;

    // Functionality for pagination

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentVehicles = showingVehicles.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    const paginate = (pageNum) =>
      (this.props.rootStore.vehicleContainerStore.storeData.currentPage = pageNum);

    const nextPage = () =>
      (this.props.rootStore.vehicleContainerStore.storeData.currentPage =
        currentPage + 1);

    const prevPage = () =>
      (this.props.rootStore.vehicleContainerStore.storeData.currentPage =
        currentPage - 1);

    return (
      <section className="VehicleContainer">
        <SortingFilteringComponent />
        <div className="VehicleContainer-container">
          {currentVehicles.map((vehicle) => {
            return (
              <VehicleCard
                key={vehicle.id}
                id={vehicle.id}
                make={vehicle.make}
                model={vehicle.model}
                horsePower={vehicle.horsePower}
                engine={vehicle.engine}
                year={vehicle.year}
                image={vehicle.img}
                editing={isEditing}
              />
            );
          })}
        </div>
        {showAllVehicles
          ? ""
          : showingVehicles.length > 8 && (
              <Pagination
                currentPage={currentPage}
                postsPerPage={postsPerPage}
                totalVehicles={showingVehicles.length}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
              />
            )}
      </section>
    );
  }
}

export default VehicleContainer;
