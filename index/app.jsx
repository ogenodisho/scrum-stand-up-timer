var React = require('react');
var ReactDOM = require('react-dom');
import {Router, hashHistory} from 'react-router';
import routes from './routes.jsx';

require("./StandUpTimerStyle.css");

ReactDOM.render(<Router history={hashHistory} routes={routes} />, document.getElementById('app'))
