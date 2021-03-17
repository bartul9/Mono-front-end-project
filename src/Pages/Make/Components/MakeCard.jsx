import { inject, observer } from "mobx-react";
import React from "react";
import { Component } from "react";

import { Button } from "react-bootstrap";

import "./MakeCard.css";

@inject("rootStore")
@observer
class MakeCard extends Component {
  render() {
    const { make, founded, logo, country, id } = this.props;
    const { deleting } = this.props.rootStore.deleteMakeCardStore.storeData;
    const { deleteMakeCard } = this.props.rootStore.deleteMakeCardStore;
    console.log(deleteMakeCard);
    return (
      <div
        style={
          deleting
            ? {
                boxShadow: "2px 2px 2px rgb(220, 53, 69,0.4)",
                borderTopLeftRadius: "5px",
              }
            : { boxShadow: "" }
        }
        className="MakeCard"
      >
        <>
          <Button
            style={deleting ? { display: "block" } : { display: "none" }}
            onClick={() => deleteMakeCard(id)}
            variant="warning"
          >
            Delete
          </Button>
        </>

        <img src={logo} alt={make} />
        <h2>{make}</h2>
        <span>{country}</span>
        <span>{founded}</span>
      </div>
    );
  }
}
export default MakeCard;
