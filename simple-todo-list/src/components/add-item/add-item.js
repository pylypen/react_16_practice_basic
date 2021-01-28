import React, { Component } from 'react';
import './add-item.css';

export default class AddItem extends Component {
    state = {
        label: ''
    }

    onLabelChange = (event) => {
        this.setState({
            label: event.target.value
        })
    }

    onSubmitForm = (event) => {
        event.preventDefault();
        this.props.onAddItem(this.state.label);

        this.setState({
            label: ''
        });
    }

    render() {
        return (
            <form className='item-add-form d-flex'
                onSubmit={ this.onSubmitForm }>
                <input type="text"
                       className='form-control'
                       onChange={this.onLabelChange}
                       value={ this.state.label }
                />

                <button type="submit"
                    className="btn btn-outline-primary">
                    <i className="fa fa-plus" />
                </button>
            </form>
        )
    }
}
