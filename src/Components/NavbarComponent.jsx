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
    const { searchName } = this.props.rootStore.vehicleContainerStore.storeData;
    const { makePage } = this.props.rootStore.mainStore.storeData;
    const { deleting } = this.props.rootStore.deleteMakeCardStore.storeData;
    const { displayCreateNewVehicle } = this.props.rootStore.createVehicleStore;
    const { handleDeleteClick } = this.props.rootStore.deleteMakeCardStore;
    const { handleToggleMakeModal } = this.props.rootStore.createMakeCardStore;

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
              <>
                <Form className="NavbarComponent-form" inline>
                  <FormControl
                    onChange={(e) => searchForName(e)}
                    type="text"
                    placeholder="Search Vehicle"
                    name="searchName"
                    value={searchName}
                    className=" mr-sm-2"
                  />
                </Form>
                <Button onClick={displayCreateNewVehicle} variant="dark">
                  New Vehicle
                </Button>
              </>
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
