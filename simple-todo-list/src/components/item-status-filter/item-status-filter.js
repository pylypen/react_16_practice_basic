import React, { Component } from 'react';

export default class ItemStatusFilter extends Component {

    render() {

        const elements = this.props.filterData.map((item) => {
            const { id, ...itemProps } = item;
            const className = item.status ? 'btn-info' : 'btn-outline-secondary';

            return (
                <button key={id} type="button"
                        onClick={() => this.props.onToggleStatus(id)}
                    className={`btn ${className}`}>{itemProps.label}</button>
            );
        });
        return (
            <div className="btn-group">
                { elements }
            </div>
        );
    }
}
