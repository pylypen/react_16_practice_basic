import React, { Component } from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component {
    render() {
        const { label, onDeleted, onToggleDone, onToggleImportant,
            done, important} = this.props;

        let classNames = done ? 'todo-list-item done' : 'todo-list-item';

        if (important) {
            classNames += ' important'
        }

        return (
            <span className={classNames}>
                <span
                    className="todo-list-item-label"
                    onClick={ onToggleDone }>
                    {label}
                </span>

                <button type="button"
                        onClick={ onToggleImportant }
                    className="btn btn-outline-success btn-sm float-right">
                    <i className="fa fa-exclamation" />
                </button>

                <button type="button"
                        onClick={ onDeleted }
                    className="btn btn-outline-danger btn-sm float-right">
                    <i className="fa fa-trash-o" />
                </button>
            </span>
        );
    }
};
