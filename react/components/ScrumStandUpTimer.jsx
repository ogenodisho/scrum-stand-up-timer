const React = require('react');
import Avatar from './Avatar.jsx';
import Timer from './Timer.jsx';
import TeamMemberListing from './TeamMemberListing.jsx';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import standupTimer from '../../redux/reducers.js';
import { retrieveProfileNotificationData } from '../../index/CitadelIntegration.js'
import { hydrate } from '../../redux/actions.js'
const Immutable = require('immutable');

const initialState = Immutable.fromJS({
    teamAvatarUrl: "",
    timerId: -1,
    durationSeconds: 120,
    secondsLeft: 120,
    inProgress: false,
    paused: false,
    teamMembers: [],
    currentTeamMemberIndex: 0,
    allUnchecked: false
})
const store = createStore(standupTimer, initialState);

function hydrateStore(data) {
  store.dispatch(hydrate(data));
}
retrieveProfileNotificationData(hydrateStore);

class ScrumStandUpTimer extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          <Avatar />
          <Timer />
          <TeamMemberListing />
        </div>
      </Provider>
    );
  }
}

export default ScrumStandUpTimer;
