import './app.css';
import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from "../../services/swapi-service";
import ItemDetails, {Record} from "../item-details";
import ErrorBoundary from "../error-boundary";
import Row from "../row";
import {
    PersonDetails,
    PlanetDetails,
    StarshipDetails,
    PersonList,
    PlanetList,
    StarshipList
} from '../sw-components'


export default class App extends Component {
    swapiService = new SwapiService();

    state = {
        hasError: false
    }

    componentDidCatch(error, errorInfo) {
        console.log('componentDidCatch');
        this.setState({
            hasError: true
        });
    }

    render() {
        const {
            getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage,
            getAllPeople
        } = this.swapiService;

        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={getPerson}
                getImageUrl={getPersonImage}>

                <Record field="gender" label="Gender"/>
                <Record field="eyeColor" label="Eye Color"/>

            </ItemDetails>
        );

        const starshipDetails = (
            <ItemDetails
                itemId={9}
                getData={getStarship}
                getImageUrl={getStarshipImage}>

                <Record field="model" label="Model"/>
                <Record field="length" label="Length"/>
                <Record field="costInCredits" label="Cost"/>
            </ItemDetails>
        );

        return (
            <ErrorBoundary>
                <div className="stardb-app">
                    <Header/>
                    <RandomPlanet/>

                    <PersonList>
                        { ({name}) => <span>{name}</span> }
                    </PersonList>

                    <PersonDetails itemId={3} />

                    <Row
                        left={personDetails}
                        right={starshipDetails}/>
                </div>
            </ErrorBoundary>
        );
    }
};
