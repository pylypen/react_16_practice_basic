import {PlanetDetails, PlanetList} from "../sw-components";
import Row from "../row";
import React, { Component } from "react";

export default class PlanetsPage extends Component {
    state = {
        selectedItem: null
    }

    onItemSelected = (selectedItem) => {
        this.setState({selectedItem});
    }

    render () {
        const { selectedItem } = this.state;

        return (
            <Row
                left={<PlanetList onItemSelected={this.onItemSelected} />}
                right={<PlanetDetails itemId={selectedItem} />}
            />
        );
    }
}
