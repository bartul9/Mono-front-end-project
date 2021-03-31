import React, { Component } from "react";

// Bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";

// Router Link
import { Link } from "react-router-dom";

// Styles
import "./NavbarComponent.css";

//  Garage logo image
import { navbarlogo } from "../assetes/index";

import { inject, observer } from "mobx-react";

@inject("rootStore")
@observer
class NavbarComponent extends Component {
  render() {
    const { searchForName } = this.props.rootStore.vehicleContainerStore;
    const {
      searchName,
      makePage,
    } = this.props.rootStore.vehicleContainerStore.storeData;
    const { displayCreateNewVehicle } = this.props.rootStore.createVehicleStore;

    const { handleToggleMakeModal } = this.props.rootStore.createMakeStore;
    const { deleting } = this.props.rootStore.deleteMakeStore.storeData;
    const { handleDeleteClick } = this.props.rootStore.deleteMakeStore;

    const {
      editingCard,
    } = this.props.rootStore.vehicleCardStore.storeData.editingInputs;

    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Link to="/">
            <img
              id="navbar-logo"
              width="48px"
              src={navbarlogo}
              alt="navbar-logo"
            />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="Links" to="/">
                Home
              </Link>
              <Link className="Links" to="/edit">
                Edit
              </Link>
              <Link className="Links Links-edit" to="/make">
                Make
              </Link>
            </Nav>

            {!makePage ? (
              !editingCard && (
                <>
                  <Form className="NavbarComponent-form" inline>
                    <FormControl
                      onChange={(e) => searchForName(e)}
                      type="text"
                      placeholder="Search Vehicle Model"
                      name="searchName"
                      value={searchName}
                      className=" mr-sm-2"
                    />
                  </Form>
                  <Button onClick={displayCreateNewVehicle} variant="dark">
                    New Vehicle
                  </Button>
                </>
              )
            ) : (
              <>
                <Button
                  className="mr-2"
                  onClick={handleDeleteClick}
                  variant={!deleting ? "warning" : "primary"}
                >
                  {!deleting ? "Delete Make" : "Back"}
                </Button>
                {!deleting && (
                  <Button onClick={handleToggleMakeModal} variant="dark">
                    New Make
                  </Button>
                )}
              </>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavbarComponent;
