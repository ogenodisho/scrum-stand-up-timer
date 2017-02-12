var React = require('react');
import {Route} from 'react-router';
import Root from '../react/components/Root.jsx';
import AwesomeComponent from '../react/components/AwesomeComponent.jsx';
import NotFound from '../react/components/NotFound.jsx';

const routes = (<Route path="/" component={Root}>
                  <Route path="awesome" component={AwesomeComponent} />
                  <Route path="*" component={NotFound} />
                </Route>
              );

export default routes;
