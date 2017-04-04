var React = require('react');
import {Route} from 'react-router';
import ScrumStandUpTimer from '../react/components/ScrumStandUpTimer.jsx'
import Avatar from '../react/components/Avatar.jsx'

const routes = (
    <Route path="/" component={ScrumStandUpTimer}>
        <Route name="user" component={Avatar}/>
    </Route>
);

export default routes;
