import React, {Component} from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {
    onChangeSearch = (event) => {
        this.props.onSearchChange(event.target.value)
    }

    render() {
        return (
            <input type="text"
                   onChange={this.onChangeSearch}
                      className="form-control search-input"
                      placeholder="type to search" />
        );
    }
};