import {StarshipList} from "../sw-components";
import React from "react";
import {withRouter} from 'react-router-dom';

const StarshipsPage = ({ history }) => {
    return (
        <StarshipList onItemSelected={(itemId) => {
            history.push(itemId);
        }} />
    );
}

export default withRouter(StarshipsPage);
