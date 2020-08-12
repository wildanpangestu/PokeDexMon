/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import styled from "styled-components";

const Branding = styled.a`
  -moz-user-select: none;
  -website-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <Branding
            href="#"
            className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center"
          >
            {/* <Logo src="./logo.svg" /> */}
            PokeDexMon
          </Branding>
        </nav>
      </div>
    );
  }
}
