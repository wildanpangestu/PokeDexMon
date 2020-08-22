/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import spinner from "../pokemon/spinner.gif";
import axios from "axios";

const Thumbnail = styled.img`
  width: 5em;
  height: 5em;
`;

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "84817A",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6",
};

const Card = styled.div`
  opacity: 0.95;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    imageLoading: true,
    overloadRequest: false,
    types: [],
  };

  _isMounted = false;

  async componentDidMount() {
    this._isMounted = true;
    const { name, url } = this.props;

    function pad(number, length) {
      let str = "" + number;
      while (str.length < length) {
        str = "0" + str;
      }
      return str;
    }

    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    const imageUrl = `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails/${pad(
      pokemonIndex,
      3
    )}.png`;
    const source = axios.CancelToken.source();
    const pokemonRes = await axios.get(url, {
      cancelToken: source.token,
    });
    const types = pokemonRes.data.types.map((type) => type.type.name);

    if (this._isMounted) {
      this.setState({
        name,
        imageUrl,
        pokemonIndex,
        types,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
          <Card className="card">
            <div className="card-header">
              <div className="float-right">
                {this.state.types.map((type) => (
                  <span
                    key={type}
                    className="badge badge-pill mr-1"
                    style={{
                      backgroundColor: `#${TYPE_COLORS[type]}`,
                      color: "white",
                      textTransform: "capitalize",
                    }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            {this.state.imageLoading ? (
              <img
                src={spinner}
                style={{ width: "5em", height: "5em" }}
                className="card-img-top rounded mx-auto d-block mt-2"
              />
            ) : null}
            <Thumbnail
              className="card-img-top rounded mx-auto mt-2"
              onLoad={() => this.setState({ imageLoading: false })}
              // onError={() => this.setState({ overloadRequest: true })}
              src={this.state.imageUrl}
              style={
                this.state.overloadRequest
                  ? { display: "none" }
                  : this.state.imageLoading
                  ? null
                  : { display: "block" }
              }
            />
            {this.state.overloadRequest ? (
              <h6 className="mx-auto">
                <span className="badge badge-danger mt-2">
                  Overload Image Request
                </span>
              </h6>
            ) : null}
            <div className="card-body mx-auto">
              <h6 className="card-tittle">
                {this.state.name
                  .toLowerCase()
                  .split(" ")
                  .map(
                    (letter) =>
                      letter.charAt(0).toUpperCase() + letter.substring(1)
                  )
                  .join(" ")}
              </h6>
            </div>
          </Card>
        </StyledLink>
      </div>
    );
  }
}
