var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');
import routes from './routes.jsx';

ReactDOM.render(<Router>{routes}</Router>, document.getElementById('app'))
