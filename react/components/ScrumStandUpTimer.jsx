var React = require('react');
import Avatar from './Avatar.jsx';
import Timer from './Timer.jsx';
import TeamMemberListing from './TeamMemberListing.jsx';
import {Provider} from 'react-redux'
import {createStore} from 'redux';
import standupTimer from '../../redux/reducers.js';
var Immutable = require('immutable');

function shuffleAndSetIndexes(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    for (var i = 0; i < a.length; i++) {
      a[i].index = i;
    }
}

var teamMembers = [{
    name: "Aaron",
    imageUrl: "http://www.tfo.su/uploads5/futurama/03.png",
    awaitingTurn: true,
    index: 0
}, {
    name: "Daniel",
    imageUrl: "http://www.tfo.su/uploads5/futurama/16.png",
    awaitingTurn: true,
    index: 1
}, {
    name: "Ian",
    imageUrl: "http://www.tfo.su/uploads5/futurama/41.png",
    awaitingTurn: true,
    index: 2
}, {
    name: "Jason",
    imageUrl: "http://www.tfo.su/uploads5/futurama/14.png",
    awaitingTurn: true,
    index: 3
}, {
    name: "Ogen",
    imageUrl: "http://www.tfo.su/uploads5/futurama/36.png",
    awaitingTurn: true,
    index: 4
}, {
    name: "Robert",
    imageUrl: "http://www.tfo.su/uploads5/futurama/22.png",
    awaitingTurn: true,
    index: 5
}, {
    name: "Tegan",
    imageUrl: "http://www.tfo.su/uploads5/futurama/29.png",
    awaitingTurn: true,
    index: 6
}, {
    name: "Tom",
    imageUrl: "http://www.tfo.su/uploads5/futurama/49.png",
    awaitingTurn: true,
    index: 7
}]
shuffleAndSetIndexes(teamMembers);
const initialState = Immutable.fromJS({
    durationSeconds: 120,
    secondsLeft: 120,
    inProgress: false,
    paused: false,
    teamMembers: teamMembers,
    currentTeamMember: teamMembers[0]
})

const store = createStore(standupTimer, initialState);

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
