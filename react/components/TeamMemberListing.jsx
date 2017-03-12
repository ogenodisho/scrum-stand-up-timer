var React = require('react');
import {connect} from 'react-redux'
import {checkTeamMember, uncheckTeamMember, randomize} from '../../redux/actions.js'

class TeamMemberListing extends React.Component {

  onTeamMemberCheckboxChanged(teamMemberObject, checkbox) {
    teamMemberObject.teamMember.awaitingTurn ?
      this.props.dispatch(uncheckTeamMember(teamMemberObject.teamMember.index)) :
      this.props.dispatch(checkTeamMember(teamMemberObject.teamMember.index));
  };

  render() {
    return (
      <div className="teamMemberListingContainer">
        {
          this.props.teamMembers.map(function(teamMember) {
            return <label className="teamMemberListing" key={teamMember.name}>
                    {teamMember.name}
                    <input type="checkbox"
                      checked={teamMember.awaitingTurn}
                      onChange={this.onTeamMemberCheckboxChanged.bind(this, {teamMember})}
                      disabled={this.props.inProgress && teamMember.index === this.props.currentTeamMemberIndex}
                    />
                  </label>
          }, this)
        }
      <br/><br/>
      <input type="button" value="Randomize" disabled={this.props.inProgress}
        onClick={ () => this.props.dispatch(randomize())} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { teamMembers: state.get("teamMembers").toJS(),
            currentTeamMemberIndex: state.get("currentTeamMemberIndex"),
            inProgress: state.get("inProgress")
        }
}

export default connect(mapStateToProps)(TeamMemberListing);
