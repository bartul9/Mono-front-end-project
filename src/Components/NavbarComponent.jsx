import React, { Component } from "react";

// Bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";

import { Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";

// Router Links
import { Link } from "react-router-dom";

// Styles
import "./NavbarComponent.css";

//  Logo navbar image
import { navbarlogo } from "../assetes/index";

// Mobx inject and observer
import { inject, observer } from "mobx-react";

@inject("rootStore")
@observer
class NavbarComponent extends Component {
  render() {
    const { searchForName } = this.props.rootStore.vehicleContainerStore;
    const { searchName } = this.props.rootStore.vehicleContainerStore.storeData;
    const { makePage } = this.props.rootStore.mainStore.storeData;
    const { deleting } = this.props.rootStore.deleteMakeCardStore.storeData;
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
                <Button
                  onClick={
                    this.props.rootStore.mainStore.displayCreateNewVehicle
                  }
                  variant="dark"
                >
                  New Vehicle
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="mr-1"
                  onClick={
                    this.props.rootStore.deleteMakeCardStore.handleDeleteClick
                  }
                  variant={!deleting ? "warning" : "primary"}
                >
                  {!deleting ? "Delete Make" : "Back"}
                </Button>
                {!deleting && (
                  <Button
                    onClick={
                      this.props.rootStore.createMakeCardStore.handleClick
                    }
                    variant="dark"
                  >
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
