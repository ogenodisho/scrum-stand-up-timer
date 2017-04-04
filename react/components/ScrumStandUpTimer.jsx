const React = require('react');
import Avatar from './Avatar.jsx';
import Timer from './Timer.jsx';
import TeamMemberListing from './TeamMemberListing.jsx';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import standupTimer from '../../redux/reducers.js';
import { retrieveProfileNotificationData, startNotificationWebSocketListener, postNotificationMessage } from '../../index/CitadelIntegration.js'
import { hydrate, skip } from '../../redux/actions.js'
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
const store = createStore(standupTimer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// get bootstrap data from citadel and hydrate store
function hydrateStore(data) {
  store.dispatch(hydrate(data));
}
retrieveProfileNotificationData(hydrateStore);

// start notification web socket listener
function onNotification(parsedNotification) {
  if ("next" in parsedNotification.data) {
    var state = store.getState();
    if (!state.paused && state.inProgress) {
      store.dispatch(skip());
    }
  }
}
startNotificationWebSocketListener(onNotification)

const msg = {
    next: 'PST',
    ogen: 1
};
setTimeout(function() { postNotificationMessage(msg); }, 5000);

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
