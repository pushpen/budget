import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/style.scss';

class Budget extends React.Component {
    render() {
        return (
            <div>
                <h1>Budget App1</h1>
            </div>
        )
    }
}

ReactDOM.render(<Budget/>, document.getElementById('app'));