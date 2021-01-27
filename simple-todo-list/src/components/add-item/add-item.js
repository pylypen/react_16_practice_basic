import React, { Component } from 'react';
import './add-item.css';

export default class AddItem extends Component {
    render() {
        const { onAddItem } = this.props;

        return (
            <div className='item-add-form'>
                <button type="button"
                        onClick={ () => onAddItem('Build Awesome App') }
                    className="btn btn-outline-primary btn-md float-right">
                    Add Item &nbsp;
                    <i className="fa fa-plus" />
                </button>
            </div>
        )
    }
}