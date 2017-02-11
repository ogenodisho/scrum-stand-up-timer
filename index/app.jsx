var React = require('react');
var ReactDOM = require('react-dom');
import {Router, browserHistory} from 'react-router';
import {routes} from './routes.jsx';

ReactDOM.render(<Router history={browserHistory}>
                  {routes}
                </Router>,
                document.getElementById('app'))
