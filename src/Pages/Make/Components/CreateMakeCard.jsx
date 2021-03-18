import React, { Component } from "react";

// Component for creating new MakeCard

// Bootstrap Button and Modal
import { Button, Modal } from "react-bootstrap";

// Styles
import "./CreateMakeCard.css";

// Country and make lists
import countryList from "../../../Stores/CommonStores/CountriesStore";
import makeList from "../../../Stores/MakeStores/VehicleMakeList";

import { inject, observer } from "mobx-react";

@inject("rootStore")
@observer
class CreateMakeCard extends Component {
  render() {
    const {
      handleToggleMakeModal,
      handleChange,
      handleSubmit,
      handleToggleDateFormat,
      handleToggleMakeList,
    } = this.props.rootStore.createMakeCardStore;

    const {
      make,
      founded,
      logo,
    } = this.props.rootStore.createMakeCardStore.storeData.makeData;

    const {
      editing,
      toggleDateFormat,
      toggleMakeList,
    } = this.props.rootStore.createMakeCardStore.storeData;

    const form = (
      <Modal
        id="CreateMakeCard-modal"
        onHide={handleToggleMakeModal}
        show={editing}
        centered
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="CreateMakeCard-inputs">
            <div>
              <span
                className="CreateMakeCard-year"
                onClick={handleToggleDateFormat}
                id="year"
              >
                {toggleDateFormat ? "Full Date" : "Only Year"}
              </span>
              <span onClick={handleToggleMakeList} id="toggleMakeList">
                {toggleMakeList ? "Input" : "Make List"}
              </span>
              <label htmlFor="make">Make</label>
              {toggleMakeList ? (
                <select id="make" name="make" onChange={(e) => handleChange(e)}>
                  <option></option>
                  {makeList.map((make) => (
                    <option value={make} key={make}>
                      {make}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={make}
                  id="make"
                  name="make"
                  onChange={(e) => handleChange(e)}
                />
              )}
            </div>
            <div>
              <label htmlFor="country">Country</label>
              <select
                onChange={(e) => handleChange(e)}
                id="country"
                name="country"
              >
                <option></option>
                {countryList.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="CreateMakeCard-inputs">
            <div>
              <label htmlFor="founded">Founded</label>
              <input
                type={toggleDateFormat ? "number" : "date"}
                min={1800}
                max={2020}
                onChange={(e) => handleChange(e)}
                value={founded}
                name="founded"
                id="founded"
              />
            </div>
            <div>
              <label htmlFor="logo">Logo</label>
              <input
                onChange={(e) => handleChange(e)}
                name="logo"
                value={logo}
                id="logo"
                type="url"
              />
            </div>
          </div>
          <div>
            <Button
              className="mr-1"
              onClick={handleToggleMakeModal}
              variant="primary"
            >
              Back
            </Button>
            <Button type="submit" variant="success">
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    );

    return form;
  }
}
export default CreateMakeCard;
