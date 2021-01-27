import React, { Component } from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component {
    state = {
        done: false,
        important: false
    }

    onLabelClick = () => {
        this.setState(({ done }) => {
            return {
                 done: !done
            }
        });
    }

    onMartImportant = () => {
        this.setState(({ important }) => {
            return {
                 important: !important
            }
        });
    }

    render() {
        const { done, important} = this.state;
        const { label, onDeleted } = this.props;

        let classNames = done ? 'todo-list-item done' : 'todo-list-item';

        if (important) {
            classNames += ' important'
        }

        return (
            <span className={classNames}>
                <span
                    className="todo-list-item-label"
                    onClick={ this.onLabelClick }>
                    {label}
                </span>

                <button type="button"
                        onClick={ this.onMartImportant }
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
