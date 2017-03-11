var React = require('react');
import {connect} from 'react-redux'
import {checkTeamMember, uncheckTeamMember} from '../../redux/actions.js'

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
                    />
                  </label>
          }, this)
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { teamMembers: state.get("teamMembers").toJS() }
}

export default connect(mapStateToProps)(TeamMemberListing);
