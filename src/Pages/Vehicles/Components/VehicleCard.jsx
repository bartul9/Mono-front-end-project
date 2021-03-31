import React, { Component } from "react";

// Bootstrapp buttons
import { Button } from "react-bootstrap";

// Styles
import "./VehicleCard.css";

// This component is a component for vehicles cards, and it also serves as a form for every vehicle that user has but only if editing is true

import { inject, observer } from "mobx-react";

@inject("rootStore")
@observer
class VehicleCard extends Component {
  render() {
    const { makeId, model, horsePower, image, engine, year } = this.props;

    const {
      handleChange,
      handleEditClick,
      handleSubmit,
      deleteVehicle,
    } = this.props.rootStore.vehicleCardStore;

    const {
      horsePowerValue,
      imageValue,
      modelValue,
      engineValue,
      yearValue,
      editingCard,
    } = this.props.rootStore.vehicleCardStore.storeData.editingInputs;

    const { getMakes } = this.props.rootStore.makeService;

    const { isEditing } = this.props.rootStore.vehicleContainerStore.storeData;

    const make = getMakes().filter((make) => make.id === makeId)[0]
      ? getMakes().filter((make) => make.id === makeId)[0].make
      : null;

    return (
      <form
        onSubmit={(e) =>
          handleSubmit(e, this.props.props.history, this.props.id)
        }
      >
        <article
          style={
            isEditing
              ? { height: "422px", marginBottom: "20px" }
              : { height: "380px", marginBottom: "15px" }
          }
          className="VehicleCard"
        >
          <img src={image} alt={`${makeId}-${model}`} />{" "}
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
                <select
                  onChange={(e) => handleChange(e)}
                  name="makeId"
                  id="makeId"
                >
                  <option defaultValue={makeId}>{make}</option>
                  {getMakes().map((makes) => {
                    if (makes.id === makeId) {
                      return null;
                    }
                    return (
                      <option value={+makes.id} key={makes.id}>
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
                    type="number"
                    min={0}
                    max={2000}
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
                    type="number"
                    min={1900}
                    max={2021}
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
                    onClick={() =>
                      handleEditClick(this.props.props.history, this.props.id)
                    }
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
