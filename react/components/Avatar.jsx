var React = require('react');
import { connect } from 'react-redux'
import { audioNotification } from '../../index/CitadelIntegration.js'

class Avatar extends React.Component {

  render() {
    var name = "Scrum Standup Timer";
    var imageUrl = this.props.teamAvatarUrl;
    if (this.props.inProgress) {
      name = this.props.teamMembers[this.props.currentTeamMemberIndex].name;
      imageUrl = this.props.teamMembers[this.props.currentTeamMemberIndex].imageUrl;
    }
    return (
      <div className="avatar">
        <p>{name}</p>
        <img src={imageUrl}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
            teamAvatarUrl: state.get("teamAvatarUrl"),
            inProgress: state.get("inProgress"),
            teamMembers: state.get("teamMembers").toJS(),
            currentTeamMemberIndex: state.get("currentTeamMemberIndex")
        }
}

export default connect(mapStateToProps)(Avatar);
