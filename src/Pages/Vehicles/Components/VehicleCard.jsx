import React, { Component } from "react";

// Bootstrapp buttons
import { Button } from "react-bootstrap";

// Styles
import "./VehicleCard.css";

// This component is a component for vehicles cards, and it also serves as a form for every vehicle that user has but only if editing props is passed down to it

import { inject, observer } from "mobx-react";
@inject("rootStore")
@observer
class VehicleCard extends Component {
  render() {
    const { make, model, horsePower, image, engine, year } = this.props;

    const { makes } = this.props.rootStore.makeStore.storeData;

    const {
      horsePowerValue,
      imageValue,
      modelValue,
      engineValue,
      yearValue,
      editingCard,
    } = this.props.rootStore.vehicleCardStore.storeData.editingInputs;

    const { isEditing } = this.props.rootStore.mainStore.storeData;

    const {
      handleChange,
      handleEditClick,
      handleSubmit,
      deleteVehicle,
    } = this.props.rootStore.vehicleCardStore;

    return (
      <form onSubmit={(e) => handleSubmit(e, this.props.id)}>
        <article
          style={
            isEditing
              ? { height: "422px", marginBottom: "20px" }
              : { height: "380px", marginBottom: "15px" }
          }
          className="VehicleCard"
        >
          <img src={image} alt={`${make}-${model}`} />{" "}
          {editingCard && (
            <input
              id="VehicleCard-image-input"
              name="img"
              value={imageValue}
              onChange={(e) => handleChange(e)}
              type="text"
              placeholder="New Image URL"
            />
          )}
          <div>
            <div
              style={editingCard ? { left: "0px" } : { left: "-10px" }}
              className="VehicleCard-make-model"
            >
              {editingCard ? (
                <select onChange={(e) => handleChange(e)} name="make" id="make">
                  <option disabled={make} selected={make}>
                    {make}
                  </option>
                  {makes.map((makes) => {
                    if (makes.make === make) {
                      return null;
                    }
                    return (
                      <option value={makes.make} key={makes.make}>
                        {makes.make}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <h3>{make}</h3>
              )}
              {editingCard ? (
                <input
                  name="model"
                  value={modelValue.value}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder={model}
                ></input>
              ) : (
                <h4>{model}</h4>
              )}
            </div>
            <div className="VehicleCard-engine-horsePower-year">
              <h5>
                Engine:{" "}
                {editingCard ? (
                  <input
                    name="engine"
                    value={engineValue.value}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder={engine}
                  ></input>
                ) : (
                  <i>{engine}</i>
                )}
              </h5>
              <h5>
                Horsepower:{" "}
                {editingCard ? (
                  <input
                    name="horsePower"
                    value={horsePowerValue.value}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder={horsePower}
                  ></input>
                ) : (
                  <i>{horsePower}</i>
                )}
              </h5>
              <h5>
                Year:{" "}
                {editingCard ? (
                  <input
                    name="year"
                    value={yearValue.value}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder={year}
                  ></input>
                ) : (
                  <i>{year}</i>
                )}
              </h5>
              <div style={editingCard ? { top: "0px" } : { top: "7px" }}>
                {isEditing && !editingCard && (
                  <Button
                    onClick={() => deleteVehicle(this.props.id)}
                    variant="warning"
                    className="mr-1"
                  >
                    Delete
                  </Button>
                )}
                {isEditing && (
                  <Button
                    className="mr-1"
                    style={
                      editingCard ? { left: 63 + "px" } : { left: 67 + "px" }
                    }
                    onClick={() => handleEditClick(this.props.id)}
                  >
                    {editingCard ? "Back" : "Edit"}
                  </Button>
                )}
                {editingCard && (
                  <Button variant="success" type="submit">
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </div>
        </article>
      </form>
    );
  }
}

export default VehicleCard;
