var React = require('react');
import {Route} from 'react-router';
import HelloWorld from '../react/components/HelloWorld.jsx';
import AwesomeComponent from '../react/components/AwesomeComponent.jsx';
import NotFound from '../react/components/NotFound.jsx';

const routes = props => {
  return (<Route path='/' component={HelloWorld}>
            <Route name='awesome' component={AwesomeComponent} />
            <Route path='*' component={NotFound} />
          </Route>
        );
}

export default routes;
