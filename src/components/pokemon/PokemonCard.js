/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import styled from "styled-components";
import spinner from "../pokemon/spinner.gif";

const Thumbnail = styled.img`
  width: 5em;
  height: 5em;
`;

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

export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    imageLoading: true,
    overloadRequest: false,
  };

  componentDidMount() {
    const { name, url } = this.props;
    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    // console.log(pokemonIndex);
    const imageUrl = `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails/${pad(
      pokemonIndex,
      3
    )}.png?raw=true`;
    // console.log(imageUrl);

    this.setState({
      name,
      imageUrl,
      pokemonIndex,
    });

    function pad(number, length) {
      let str = "" + number;
      while (str.length < length) {
        str = "0" + str;
      }
      return str;
    }
  }

  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <Card className="card">
          <h5 className="card-header">{this.state.pokemonIndex}</h5>
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
            onError={() => this.setState({ overloadRequest: true })}
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
      </div>
    );
  }
}
