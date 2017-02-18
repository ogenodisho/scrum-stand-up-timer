var React = require('react');
import Avatar from './Avatar.jsx';
import Timer from './Timer.jsx';
import TeamMemberListing from './TeamMemberListing.jsx';

// -> Fisher–Yates shuffle algorithm
function shuffleArray(array) {
  var m = array.length,
  t,
  i;

  // While there remain elements to shuffle
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

class ScrumStandUpTimer extends React.Component {
  componentWillMount() {
    shuffleArray(this.state.teamMembers);
  }

  constructor() {
    super();
    this.state = {
      currentTeamMemberIndex: 0,
      teamMembers: [
        {
          name: "Aaron",
          imageUrl: "http://www.tfo.su/uploads5/futurama/03.png",
          awaitingTurn: true
        }, {
          name: "Daniel",
          imageUrl: "http://www.tfo.su/uploads5/futurama/16.png",
          awaitingTurn: true
        }, {
          name: "Ian",
          imageUrl: "http://www.tfo.su/uploads5/futurama/41.png",
          awaitingTurn: true
        }, {
          name: "Jason",
          imageUrl: "http://www.tfo.su/uploads5/futurama/14.png",
          awaitingTurn: true
        }, {
          name: "Ogen",
          imageUrl: "http://www.tfo.su/uploads5/futurama/36.png",
          awaitingTurn: true
        }, {
          name: "Robert",
          imageUrl: "http://www.tfo.su/uploads5/futurama/22.png",
          awaitingTurn: true
        }, {
          name: "Tegan",
          imageUrl: "http://www.tfo.su/uploads5/futurama/29.png",
          awaitingTurn: true
        }, {
          name: "Tom",
          imageUrl: "http://www.tfo.su/uploads5/futurama/49.png",
          awaitingTurn: true
        }
      ],
      minuteDuration: "02",
      secondDuration: "00"
    };
  }

  handleTimerSet(minuteDuration, secondDuration) {
    this.setState({minuteDuration: minuteDuration, secondDuration: secondDuration});
  }

  handleTimerFinished(teamMemberIndex) {
    var stateCopy = Object.assign({}, this.state);
    stateCopy.teamMembers[teamMemberIndex].awaitingTurn = false;
    this.setState(stateCopy);
  }

  teamMemberChecked(newTeamMember) {
    var stateCopy = Object.assign({}, this.state);
    for (var i = 0; i < this.state.teamMembers.length; i++) {
      if (newTeamMember.name === this.state.teamMembers[i].name) {
        stateCopy.teamMembers[i].awaitingTurn = newTeamMember.awaitingTurn;
      }
    }
    this.setState(stateCopy);
  }

  render() {
    const _this = this;
    return (
      <div>
        <Avatar teamMembers={this.state.teamMembers}/>
        <Timer
          teamMembers={this.state.teamMembers}
          onSet={this.handleTimerSet.bind(this)}
          onFinished={this.handleTimerFinished.bind(this)}
          minutesLeft={this.state.minuteDuration}
          secondsLeft={this.state.secondDuration}
        />
        <div className="teamMemberListingContainer">
          {
            this.state.teamMembers.map(function(teamMember) {
              return <TeamMemberListing
                        key={teamMember.name}
                        teamMember={teamMember}
                        teamMemberChanged={_this.teamMemberChecked.bind(_this)}/>
            })
          }
        </div>
      </div >
    );
  }
}

export default ScrumStandUpTimer;
