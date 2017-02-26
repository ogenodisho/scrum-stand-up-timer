var React = require('react');
import {Route} from 'react-router';
import Root from '../react/components/Root.jsx';
import NotFound from '../react/components/NotFound.jsx';
import ScrumStandUpTimer from '../react/components/ScrumStandUpTimer.jsx'

const routes = (<Route path="/" component={Root}>
                  <Route path="standuptimer" component={ScrumStandUpTimer} />
                  <Route path="*" component={NotFound} />
                </Route>
              );

export default routes;
