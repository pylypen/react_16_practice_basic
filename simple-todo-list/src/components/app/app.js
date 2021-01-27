import React, { Component } from 'react';
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import AddItem from "../add-item"
import './app.css';

export default class App extends Component{
    state = {
        todoData: [
            {label: 'Learn React 16.4!', important: false, id: 1},
            {label: 'Drink Tea', important: true, id: 2},
            {label: 'Build Awesome App', important: false, id: 3}
        ]
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            return {
                todoData: [
                    ...todoData.slice(0, idx),
                    ...todoData.slice(idx + 1)
                ]
            }
        })
    }

    addItem = (text) => {
        this.setState(({ todoData }) => {
            const newId = todoData.length + 1;
            const newItem = {
                label: text,
                important: false,
                id: newId,
            };

            return {
                todoData: [
                    ...todoData,
                    newItem
                ]
            }
        })
    }

    render() {
        const { todoData } = this.state;

        return (
            <div className="todo-app">
                <AppHeader toDo={1} done={3} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos={todoData}
                    onDelete={ (id) => this.deleteItem(id) }
                />
                <AddItem onAddItem={ (text) => this.addItem(text) }/>
            </div>
        );
    }
};