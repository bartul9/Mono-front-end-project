import React, { Component } from "react";

// Show more icon
import { showmore } from "../../../assetes/index";

// Styles
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

    const {
      moreOptions,
      optionValue,
      sortingByHorsepower,
      sortingByYear,
      showAllVehicles,
      showingVehicles,
    } = this.props.rootStore.vehicleContainerStore.storeData;

    const { getMakes } = this.props.rootStore.makeService;

    return (
      <div
        onMouseEnter={handleShowingMore}
        onMouseLeave={handleShowingMore}
        className="VehicleContainer-sorting-filtering"
      >
        <span
          style={moreOptions ? { left: "-100%" } : { left: "0%" }}
          className="VehicleContainer-more"
        >
          <img style={{ width: "30px" }} src={showmore} alt="show-more-img" />
        </span>
        <span id="topContainer"></span>
        <div
          style={moreOptions ? { right: "0%" } : { right: "-100%" }}
          className="VehicleContainer-options"
        >
          <div className="VehicleContainer-filtering">
            <label htmlFor="cars">Make: </label>
            <select
              className="select-css"
              onChange={(e) => filterByMake(e.target.value)}
              value={optionValue}
            >
              {getMakes().map((make) => {
                return (
                  <option key={make.make} value={make.make}>
                    {make.make}
                  </option>
                );
              })}
            </select>
          </div>
          <span onClick={showAll}>
            Show{" "}
            {showAllVehicles
              ? showingVehicles.length < 9
                ? "All"
                : "Less"
              : "All"}
          </span>
          <span onClick={sortByYear}>
            Sort by Year{" "}
            {sortingByYear ? (
              <b className="VehicleContainer-arrow">&#8593;</b>
            ) : (
              <b className="VehicleContainer-arrow">&#8595;</b>
            )}
          </span>
          <span onClick={sortByHorsepower}>
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
