import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

import countryList from "../../../Stores/CommonStores/CountriesStore";

import "./CreateMakeCard.css";

@inject("rootStore")
@observer
class CreateMakeCard extends Component {
  render() {
    const {
      handleClick,
      handleChange,
      handleSubmit,
      handleDateFormatChange,
    } = this.props.rootStore.createMakeCardStore;
    const {
      make,
      founded,
      logo,
    } = this.props.rootStore.createMakeCardStore.storeData.makeData;

    const {
      editing,
      dateFormat,
    } = this.props.rootStore.createMakeCardStore.storeData;

    const form = (
      <Modal
        id="CreateMakeCard-modal"
        onHide={() => handleClick()}
        show={editing}
        centered
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          {" "}
          <div className="CreateMakeCard-inputs">
            <div>
              <label htmlFor="make">Make</label>
              <input
                onChange={(e) => handleChange(e)}
                value={make}
                name="make"
                id="make"
                type="text"
              />
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
                type={dateFormat ? "number" : "date"}
                min={1800}
                max={2020}
                onChange={(e) => handleChange(e)}
                value={founded}
                name="founded"
                id="founded"
              />
              <div className="CreateMakeCard-year">
                <span onClick={() => handleDateFormatChange()} id="year">
                  {dateFormat ? "Full Date" : "Only Year"}
                </span>
              </div>
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
            <Button onClick={() => handleClick()} variant="primary">
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
