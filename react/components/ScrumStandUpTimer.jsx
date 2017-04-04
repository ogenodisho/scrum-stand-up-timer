const React = require('react');
import { connect } from 'react-redux'
import Avatar from './Avatar.jsx';
import Timer from './Timer.jsx';
import TimerButtons from './TimerButtons.jsx';
import TeamMemberListing from './TeamMemberListing.jsx';
import { skip } from '../../redux/actions.js'
import { postNotificationMessage } from '../../index/CitadelIntegration.js'

const skipMsg = JSON.stringify({
    next: 'test',
    ogen: 1
});

class ScrumStandUpTimer extends React.Component {

  render() {
    if (this.props.userMode) {
      return (
        <div>
          <input className="finishButton" type="button" value="Finish"
            onClick={ () => postNotificationMessage(skipMsg) }
            />
          </div>
      );
    }

    return (
      <div>
        <Avatar />
        <Timer />
        <TimerButtons />
        <TeamMemberListing />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      userMode: state.get("userMode"),
      paused: state.get("paused"),
      inProgress: state.get("inProgress")
    }
}

export default connect(mapStateToProps)(ScrumStandUpTimer);
