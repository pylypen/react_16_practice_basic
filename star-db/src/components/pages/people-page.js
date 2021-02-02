import {PersonDetails, PersonList} from "../sw-components";
import Row from "../row";
import React, { Component } from "react";

export default class PeoplePage extends Component {
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
                left={<PersonList onItemSelected={this.onItemSelected} />}
                right={<PersonDetails itemId={selectedItem} />}
            />
        );
    }
}
