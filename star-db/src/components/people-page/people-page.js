import './people-page.css'
import React, {Component} from "react";
import PersonDetails from "../person-details";
import ItemList from "../item-list";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";

export default class PeoplePage extends Component {
    swapiService = new SwapiService();

    state = {
        personId: 1,
        hasError: false
    }

    onItemSelected = (personId) => {
        this.setState({
            personId
        })
    }

    componentDidCatch(error, errorInfo) {
        console.log('componentDidCatch')
        this.setState({
            hasError: true
        });
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />;
        }

        return (
          <div className="row mb2" >
            <div className="col-md-6">
              <ItemList onItemSelected={(personId) => this.onItemSelected(personId)}
                getData={this.swapiService.getAllPeople}
                renderItem={({ name, gender }) => `${name} (${gender})`} />
            </div>
            <div className="col-md-6">
              <PersonDetails personId={ this.state.personId } />
            </div>
          </div>
        );
    }
}