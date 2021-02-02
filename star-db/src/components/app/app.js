import './app.css';
import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from "../../services/swapi-service";
import ErrorBoundary from "../error-boundary";
import {
    PeoplePage,
    PlanetsPage,
    StarshipsPage
} from "../pages"
import {SwapiServiceProvider} from '../swapi-service-context';
import DummySwapiService from "../../services/dummy-swapi-service";


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
        return (
            <ErrorBoundary>
                <SwapiServiceProvider value={this.swapiService}>
                    <div className="stardb-app">
                        <Header/>
                        <RandomPlanet />

                        <PeoplePage />
                        <PlanetsPage />
                        <StarshipsPage />
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundary>
        );
    }
};
