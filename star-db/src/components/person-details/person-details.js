import React, { Component } from 'react';
import SwapiService from "../../services/swapi-service";

import './person-details.css';
import Spinner from "../spinner";


export default class PersonDetails extends Component {
    swapiService = new SwapiService();

    state = {
        person: null,
        loaded: true,
        setError: false
    }

    updatePerson = () => {
      const personId = this.props.personId;

      if (!personId) {
        return;
      }

      this.setState({
        loaded: false
      });

      this.swapiService
          .getPerson(personId)
          .then((person) => {
            this.setState({
              person,
              loaded: true
            });
          }).catch((err) => {
            this.setState({
              loaded: true
            });
            console.log('err')
          });
    }

    componentDidMount = () => {
      this.updatePerson();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.personId !== prevProps.personId) {
        this.updatePerson();
      }
    }

    onSetError = () => {
        this.setState({
            setError: true
        })
    }

    renderPerson = () => {
      const { person, setError } = this.state;

      if (setError) {
          this.foo.bar;
      }

      return (
        <React.Fragment>
          <img className="person-image"
               alt='person'
            src={`https://starwars-visualguide.com/assets/img/characters/${person.id}.jpg`} />

          <div className="card-body">
            <h4>{ person.name }</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span className="term">Gender</span>
                <span>{ person.gender }</span>
              </li>
              <li className="list-group-item">
                <span className="term">Birth Year</span>
                <span>{ person.birth_year }</span>
              </li>
              <li className="list-group-item">
                <span className="term">Eye Color</span>
                <span>{ person.eye_color }</span>
              </li>
            </ul>
              <button className="btn btn-danger"
                      onClick={this.onSetError}>
                  Throw Error
              </button>
          </div>
        </React.Fragment>
      )
    }

    render() {
        const { person, loaded } = this.state;

        const loader = loaded ? null : <Spinner />;
        const personData = person ? this.renderPerson() : <span>Select a person from list</span>;

      return (
        <div className="person-details card">
          { loader ? loader : personData }
        </div>
      )
    }
}