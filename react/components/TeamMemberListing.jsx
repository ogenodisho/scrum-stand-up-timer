var React = require('react');

class TeamMemberListing extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange(event) {
    this.props.teamMember.awaitingTurn = !this.props.teamMember.awaitingTurn
    this.props.teamMemberChanged(this.props.teamMember, this.props.teamMember.awaitingTurn)
  };

  render() {
    return (
      <label className="teamMemberListing">
        {this.props.teamMember.name}
        <input type="checkbox"
          checked={this.props.teamMember.awaitingTurn}
          onChange={this.onChange.bind(this)}
        />
      </label>
    );
  }
}

export default TeamMemberListing;
