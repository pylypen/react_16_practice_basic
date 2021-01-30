import './people-page.css';
import React, {Component} from "react";
import ItemList from "../item-list";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import Row from "../row";
import ErrorBoundary from "../error-boundary";
import ItemDetails from "../item-details";


export default class PeoplePage extends Component {
    swapiService = new SwapiService();

    state = {
        personId: 1
    }

    onItemSelected = (personId) => {
        this.setState({
            personId
        })
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />;
        }

        const itemList = (
            <ItemList onItemSelected={(personId) => this.onItemSelected(personId)}
                getData={this.swapiService.getAllPeople}>
                {(i) => `${i.name} (${i.gender})`}
            </ItemList>
        );

        const personDetails = <ItemDetails itemId={ this.state.personId } />;

        return (
            <ErrorBoundary>
                <Row left={itemList} right={personDetails} />
            </ErrorBoundary>
        );
    }
}