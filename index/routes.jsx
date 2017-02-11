var React = require('react');
import {Route, IndexRoute} from 'react-router';
import StandupTimerApp from './StandupTimerApp.jsx';
import HelloWorld from '../react/components/HelloWorld.jsx';
import AwesomeComponent from '../react/components/AwesomeComponent.jsx';
import NotFound from '../react/components/NotFound.jsx';

const routes = props => {
    return (<Route name="StandupTimerApp" path='/' handler={StandupTimerApp}>
      <IndexRoute handler={HelloWorld} />
      <Route name='awesome' handler={AwesomeComponent} />
      <Route path='*' handler={NotFound} />
    </Route>);
}

export default routes;
