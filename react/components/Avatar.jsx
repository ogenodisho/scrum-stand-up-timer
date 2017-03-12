var React = require('react');
import {connect} from 'react-redux'

class Avatar extends React.Component {

  render() {
    var name = "Scrum Standup Timer";
    var imageUrl = "https://lh3.googleusercontent.com/-v2Z4lxXe6LY/AAAAAAAAAAI/AAAAAAAAAAA/uVDfAq0u28s/photo.jpg";
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
            inProgress: state.get("inProgress"),
            teamMembers: state.get("teamMembers").toJS(),
            currentTeamMemberIndex: state.get("currentTeamMemberIndex")
        }
}

export default connect(mapStateToProps)(Avatar);
