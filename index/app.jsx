var React = require('react');
var ReactDOM = require('react-dom');
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {Router, hashHistory} from 'react-router';
import routes from './routes.jsx';
import standupTimer from '../redux/reducers.js'

let store = createStore(standupTimer) // TODO should this go this high up?

require("./StandUpTimerStyle.css");

ReactDOM.render(<Provider store={store}><Router history={hashHistory} routes={routes} /></Provider>, document.getElementById('app'))
