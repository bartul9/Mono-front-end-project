import React, { Component } from "react";

// Show more icon
import { showmore } from "../../../assetes/index";

import "./VehicleContainer.css";

import { inject, observer } from "mobx-react";

@inject("rootStore")
@observer
class SortingFilteringComponent extends Component {
  render() {
    const {
      filterByMake,
      showAll,
      sortByYear,
      sortByHorsepower,
      handleShowingMore,
    } = this.props.rootStore.vehicleContainerStore;

    const { makes } = this.props.rootStore.makeStore.storeData;

    const {
      more,
      optionValue,
      sortingByHorsepower,
      sortingByYear,
    } = this.props.rootStore.vehicleContainerStore.storeData;

    const { showAllVehicles } = this.props.rootStore.mainStore.storeData;

    const { showingVehicles } = this.props.rootStore.mainStore.storeData;

    return (
      <div
        onMouseEnter={handleShowingMore}
        onMouseLeave={handleShowingMore}
        className="VehicleContainer-sorting-filtering"
      >
        <span
          style={more ? { left: "0%" } : { left: "-100%" }}
          className="VehicleContainer-more"
        >
          <img style={{ width: "30px" }} src={showmore} alt="show-more-img" />
        </span>
        <span id="topContainer"></span>
        <div
          style={more ? { right: "-100%" } : { right: "0%" }}
          className="VehicleContainer-options"
        >
          <div className="VehicleContainer-filtering">
            <label htmlFor="cars">Make: </label>
            <select
              className="select-css"
              onChange={(e) => filterByMake(e.target.value)}
              value={optionValue}
            >
              <option>---</option>
              {makes.map((make) => {
                return (
                  <option key={make.make} value={make.make}>
                    {make.make}
                  </option>
                );
              })}
            </select>
          </div>
          <span onClick={() => showAll()}>
            Show{" "}
            {showAllVehicles
              ? showingVehicles.length < 9
                ? "All"
                : "Less"
              : "All"}
          </span>
          <span onClick={() => sortByYear()}>
            Sort by Year{" "}
            {sortingByYear ? (
              <b className="VehicleContainer-arrow">&#8593;</b>
            ) : (
              <b className="VehicleContainer-arrow">&#8595;</b>
            )}
          </span>
          <span onClick={() => sortByHorsepower()}>
            Sort by Horsepower{" "}
            {sortingByHorsepower ? (
              <b className="VehicleContainer-arrow">&#8593;</b>
            ) : (
              <b className="VehicleContainer-arrow">&#8595;</b>
            )}
          </span>
        </div>
      </div>
    );
  }
}
export default SortingFilteringComponent;
