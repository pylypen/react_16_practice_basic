import React, { Component } from 'react';
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import AddItem from "../add-item"
import './app.css';

export default class App extends Component {
    maxId = 100;
    filterId = 100;

    state = {
        todoData: [
            this.createTodoItem('Learn React 16.4'),
            this.createTodoItem('Drink a Tea!'),
            this.createTodoItem('Build Awesome App'),
        ],
        filterData: [
            this.createFilterItem('All', true),
            this.createFilterItem('Active'),
            this.createFilterItem('Done')
        ],
        searchData: ''
    };

    createTodoItem(label) {
        return {
            label: label,
            important: false,
            done: false,
            id: this.maxId++,
        };
    }

    createFilterItem(label, status = false) {
        return {
            label: label,
            status: status,
            id: this.filterId++,
        };
    }

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
                done: false,
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

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toogleProperty(todoData, id, 'important')
            }
        });
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toogleProperty(todoData, id, 'done')
            }
        });
    }

    onToggleStatus = (id) => {
        this.setState(({ filterData }) => {
            const oldItems = filterData.map((item) => {
                item.status = (item.id === id) ? true : false;

                return item
            })

            return {
                filterData: oldItems
            }
        });
    }

    onSearchChange = (txt) => {
        this.setState({
            searchData: txt
        });
    }

    toogleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const newItem = {
            ...arr[idx],
            [propName]: !arr[idx][propName]
        }

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ]
    }

    render() {
        const { todoData, filterData, searchData } = this.state;
        const doneCount = todoData.filter((el) => el.done).length
        const todoCount = todoData.length - doneCount

        const filteredData = todoData.filter((item) => {
            for (let i of filterData) {
                if (i.label === 'Active' && i.status && item.done) {
                    return false
                } else if (i.label === 'Done' && i.status && !item.done) {
                    return false
                }
            }

            return true;
        }).filter((item) => {
            if (searchData !== '') {
                return item.label.toLowerCase().indexOf(searchData.toLowerCase()) > -1
            }

            return true;
        })

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={(txt) => this.onSearchChange(txt)}/>

                    <ItemStatusFilter
                        filterData={filterData}
                        onToggleStatus={(id) => this.onToggleStatus(id)}
                    />
                </div>

                <TodoList
                    todos={filteredData}
                    onDelete={ (id) => this.deleteItem(id) }
                    onToggleImportant={ (id) => this.onToggleImportant(id) }
                    onToggleDone={ (id) => this.onToggleDone(id) }

                />
                <AddItem onAddItem={ (text) => this.addItem(text) }/>
            </div>
        );
    }
};