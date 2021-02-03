import {PlanetList} from "../sw-components";
import React from "react";
import {withRouter} from 'react-router-dom';

const PlanetsPage = ({ history }) => {
    return (
        <PlanetList onItemSelected={(itemId) => {
            history.push(itemId);
        }} />
    );
}

export default withRouter(PlanetsPage);


