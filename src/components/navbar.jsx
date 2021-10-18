import React, { Component } from "react";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";

import "../style/navbar.css";
import {
  Button,
  Navbar,
  Container,
  NavDropdown,
  Nav,
  FormControl,
  Form,
} from "react-bootstrap";

class NavBar extends React.Component {
  render() {
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            // filter: "blur(10px)",
            justifyContent: "space-around",
            position: "fixed",
            width: "100%",
            zIndex: "2",
            height: "7vh",
          }}
          variant="dark"
          className="navbar"
        >
          <AppsRoundedIcon
            fontSize="large"
            style={{
              color: "white",
              marginRight: "10px",
              marginLeft: "10px",
              cursor: "pointer",
            }}
          />
          <Navbar.Brand href="#home">Trello</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Workplace" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Recent" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Starred" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Templates" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <Button
                type="button"
                style={{
                  backgroundColor: "#02517F",
                  outline: "none",
                  border: "none",
                  marginLeft: "20px",
                }}
                size="sm"
              >
                Create
              </Button>
            </Nav>
            <Nav>
              <Form className="d-flex" style={{ marginRight: "30px" }}>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="mr-2"
                  aria-label="Search"
                />
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
