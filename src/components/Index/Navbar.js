import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button
} from "reactstrap";

export default class Example extends React.Component {
  render() {
    return (
      <div>
        <Navbar
          className="navbar navbar-expand-lg bg-dark fixed-top"
          dark
          id="mainNav"
        >
          <NavbarBrand className="mr-auto navbar-brand">
            Eventy Tik Tok{" "}
          </NavbarBrand>
          <NavbarToggler
            className="navbar-toggler navbar-toggler-right"
            onClick={this.toggleNavbar}
            className="mr-2"
          />
            <Nav navbar className="navbar-nav ml-auto">
              <NavItem className="navbar-brand">
                <Button
                  className=" text-white btn btn-lg btn-success"
                  href="/login"
                >
                  Log In
                </Button>
              </NavItem>
              <NavItem className="navbar-brand">
                <Button
                  className=" text-white btn btn-lg btn-info"
                  href="/register"
                >
                  Register
                </Button>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}
