var React = require('react');
import TimeInput from './TimeInput.jsx';
import {connect} from 'react-redux'
import {startTimer, pauseTimer, resumeTimer, skip} from '../../redux/actions.js'

function padZeros(value) {
  if (value.length === 1) {
    return "0" + value;
  } else {
    return value;
  }
}

class Timer extends React.Component {

  // componentWillReceiveProps() {
  //   for (var i = 0; i < this.props.teamMembers.length; i++) {
  //     if (this.props.teamMembers[i].awaitingTurn) {
  //       clearInterval(this.state.intervalId) // clear old timer because a new one will start
  //       this.setState({
  //         teamMemberIndex: i,
  //         intervalId: setInterval(this.tick.bind(this), 1000)
  //       })
  //       break;
  //     }
  //   }
  // }

  // componentWillUnmount() {
  //   clearInterval(this.state.intervalId)
  // }

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
          minutesLeft={this.props.minutesLeft}
          secondsLeft={this.props.secondsLeft}
        />
        <div className="timerButtonsContainer">
          <input type="button" value={!this.props.inProgress ? "Start" : this.props.paused ? "Resume" : "Pause"}
            onClick={ () => this.props.dispatch(!this.props.inProgress ? startTimer() : this.props.paused ? resumeTimer() : pauseTimer()) }
          />
          <input type="button" value="Skip"
            onClick={ () => this.props.dispatch(skip()) }
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
            inProgress: state.get("inProgress"),
            paused: state.get("paused"),
            durationSeconds: state.get("durationSeconds"),
            minutesLeft: state.get("secondsLeft") / 60,
            secondsLeft: state.get("secondsLeft") % 60
        }
}

export default connect(mapStateToProps)(Timer);
