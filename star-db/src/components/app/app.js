import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from "../../services/swapi-service";
import ErrorBoundary from "../error-boundary";
import {
    PeoplePage,
    PlanetsPage,
    StarshipsPage,
    SecretPage,
    LoginPage
} from "../pages"
import {SwapiServiceProvider} from '../swapi-service-context';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {PlanetDetails, StarshipDetails} from "../sw-components";


export default class App extends Component {
    swapiService = new SwapiService();

    state = {
        hasError: false,
        isLoggedIn: false
    }

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        })
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
                    <Router>
                        <div className="stardb-app">
                            <Header/>
                            <RandomPlanet/>
                            <Switch>
                                <Route path="/"
                                       render={() => <h2>Welcome to StarDB</h2>}
                                       exact
                                />
                                <Route path="/people/:id?" component={PeoplePage} />
                                <Route path="/planets" component={PlanetsPage} exact/>
                                <Route path="/planets/:id"
                                       render={({match}) => {
                                           const {id} = match.params;
                                           return <PlanetDetails itemId={id}/>
                                       }}
                                />

                                <Route path="/starships" component={StarshipsPage} exact />
                                <Route path="/starships/:id"
                                       render={({match}) => {
                                           const {id} = match.params;
                                           return <StarshipDetails itemId={id}/>
                                       }}
                                />

                                <Route path="/login"
                                       render={() => (
                                           <LoginPage
                                               isLoggedIn={this.state.isLoggedIn}
                                               onLogin={this.onLogin}
                                           />
                                       )}
                                       exact
                                />

                                <Route path="/secret"
                                       render={() => (
                                           <SecretPage isLoggedIn={this.state.isLoggedIn} />
                                       )}
                                       exact
                                />

                                <Route render={() => <h2>Page not found</h2>} />
                            </Switch>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundary>
        );
    }
};
