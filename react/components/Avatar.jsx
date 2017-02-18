var React = require('react');

class Avatar extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      name: "Scrum Standup Timer",
      imageUrl: "https://lh3.googleusercontent.com/-v2Z4lxXe6LY/AAAAAAAAAAI/AAAAAAAAAAA/uVDfAq0u28s/photo.jpg"
    }
  }

  componentWillReceiveProps() {
    for (var i = 0; i < this.props.teamMembers.length; i++) {
      if (this.props.teamMembers[i].awaitingTurn) {
        this.setState({name: this.props.teamMembers[i].name, imageUrl: this.props.teamMembers[i].imageUrl})
        return;
      }
    }
    this.setState({name: "Scrum Standup Timer", imageUrl: "https://lh3.googleusercontent.com/-v2Z4lxXe6LY/AAAAAAAAAAI/AAAAAAAAAAA/uVDfAq0u28s/photo.jpg"})
  }

  render() {
    return (
      <div className="avatar">
        <p>{this.state.name}</p>
        <img src={this.state.imageUrl}/>
      </div>
    );
  }
}

export default Avatar;
