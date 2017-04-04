var React = require('react');
import { Provider } from 'react-redux'
import UserModeButton from './UserModeButton.jsx';
import ScrumStandUpTimer from './ScrumStandUpTimer.jsx';
import { createStore } from 'redux';
import standupTimer from '../../redux/reducers.js';
import { retrieveProfileNotificationData, startNotificationWebSocketListener } from '../../index/CitadelIntegration.js'
import { hydrate, skip } from '../../redux/actions.js'
const Immutable = require('immutable');

// vvvvvvvvvvv Citadel stuff vvvvvvvvvvvvvvvvvvvvvvv

const initialState = Immutable.fromJS({
    teamAvatarUrl: "",
    userMode: false,
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
    var state = store.getState().toJS();
    if (!state.paused && state.inProgress) {
      store.dispatch(skip());
    }
  }
}
startNotificationWebSocketListener(onNotification)

// ^^^^^^^^^^^ Citadel stuff ^^^^^^^^^^^^^^^^^^^^^^^

class StoreProviderContainer extends React.Component {

  render() {
    return(
      <Provider store={store}>
        <div>
          <UserModeButton/>
          <ScrumStandUpTimer/>
        </div>
      </Provider>
    )
  }
}

export default StoreProviderContainer
