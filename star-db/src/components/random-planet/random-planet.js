import React, { Component } from 'react';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

import './random-planet.css';

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();

  constructor() {
    super();
    this.updatePlanet();
  };

  state = {
    planet: {},
    loading: true
  };

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false
    });
  };

  onError = (error) => {
    this.setState({
      error: true
    })
  };

  updatePlanet() {
    const id = Math.floor( Math.random() * 25 + 2);

    this.swapiService
        .getPlanet(id)
        .then(this.onPlanetLoaded)
        .catch(this.onError);
  }

  render() {
    const { planet : {id, name, population, rotationPeriod, diameter},
      loading, error } = this.state;

    if (error) {
      return (
          <div className="random-planet jumbotron rounded">
            <ErrorIndicator />
          </div>
      );
    }

    if (loading) {
      return (
          <div className="random-planet jumbotron rounded">
            <Spinner />
          </div>
      );
    }

    return (
      <div className="random-planet jumbotron rounded">
        <img className="planet-image"
             alt="planet"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{ name }</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{ population }</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{ rotationPeriod }</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{ diameter }</span>
            </li>
          </ul>
        </div>
      </div>
    );
  };
}