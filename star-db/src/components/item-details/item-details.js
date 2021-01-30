import React, {Component} from 'react';
import SwapiService from '../../services/swapi-service';

import './item-details.css';

const Record = ({item, field, label}) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

export {
    Record
};


export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item: null,
        image: null,
        setError: false
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const {itemId, getData, getImageUrl} = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    image: getImageUrl(item)
                });
            });
    }

    onSetError = () => {
        this.setState({
            setError: true
        })
    }

    render() {
        const {item, image, setError} = this.state;

        if (setError) {
            this.foo.bar;
        }

        if (!item) {
            return <span>Select a item from a list</span>;
        }

        const {
            name
        } = item;

        return (
            <div className="item-details card">
                <img className="item-image"
                     src={image}
                     alt="item"/>

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(this.props.children, (child) => {
                                return React.cloneElement(child, {item});
                            })
                        }
                    </ul>
                </div>
                <button className="btn btn-danger"
                        onClick={this.onSetError}>
                    Throw Error
                </button>
            </div>
        );
    }
}