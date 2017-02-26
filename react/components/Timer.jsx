var React = require('react');
import TimeInput from './TimeInput.jsx';

function padZeros(value) {
  if (value.length === 1) {
    return "0" + value;
  } else {
    return value;
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      teamMemberIndex: -1,
      minutesLeft: props.minutesLeft,
      secondsLeft: props.secondsLeft
    }
  }

  componentWillReceiveProps() {
    for (var i = 0; i < this.props.teamMembers.length; i++) {
      if (this.props.teamMembers[i].awaitingTurn) {
        clearInterval(this.state.intervalId) // clear old timer because a new one will start
        this.setState({
          teamMemberIndex: i,
          intervalId: setInterval(this.tick.bind(this), 1000)
        })
        break;
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  tick() {
    var minutesLeft = parseInt(this.state.minutesLeft)
    var secondsLeft = parseInt(this.state.secondsLeft)

    if (minutesLeft === 0 && secondsLeft === 0) {
      this.finishTurn();
      return
    }

    if (secondsLeft === 0) {
      minutesLeft -= 1
      secondsLeft = 59
    } else {
      secondsLeft -= 1
    }

    minutesLeft = padZeros(minutesLeft + "")
    secondsLeft = padZeros(secondsLeft + "")

    this.setState({
      minutesLeft: minutesLeft,
      secondsLeft: secondsLeft
    })
  }

  setTimer() {
    this.props.onSet(this.state.minutesLeft, this.state.secondsLeft)
  }

  finishTurn() {
    if (this.state.teamMemberIndex < 0) {
      return;
    }
    clearInterval(this.state.intervalId)
    this.props.onFinished(this.state.teamMemberIndex)
    this.setState({
      minutesLeft: this.props.minutesLeft,
      secondsLeft: this.props.secondsLeft
    })
  }

  skip() {
    this.finishTurn();
  }

  handleChange(event) {
    event.target.value = padZeros(event.target.value)
    if (event.target.className === "minutes") {
      this.setState({
        minutesLeft: event.target.value
      })
    } else if (event.target.className === "seconds") {
      this.setState({
        secondsLeft: event.target.value
      })
    }
  }

  render() {
    return (
      <div>
        <TimeInput
          onChange={this.handleChange.bind(this)}
          minutesLeft={this.state.minutesLeft}
          secondsLeft={this.state.secondsLeft}
        />
        <div className="timerButtonsContainer">
          <input type="button" value="Set Timer/Start"
            onClick={this.setTimer.bind(this)}
          />
          <input type="button" value="Skip"
            onClick={this.skip.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default Timer;
