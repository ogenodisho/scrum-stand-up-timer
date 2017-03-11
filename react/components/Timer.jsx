var React = require('react');
import TimeInput from './TimeInput.jsx';
import {connect} from 'react-redux'
import {startTimer,
  pauseTimer,
  resumeTimer,
  skip,
  modifyMinuteDuration,
  modifySecondDuration,
  modifyMinutesLeft,
  modifySecondsLeft
} from '../../redux/actions.js'

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
    if (event.target.className === "minutes") {
      if (this.props.inProgress) {
        this.props.dispatch(modifyMinutesLeft(event.target.value));
      } else {
        this.props.dispatch(modifyMinuteDuration(event.target.value));
      }
    } else if (event.target.className === "seconds") {
      if (this.props.inProgress) {
        this.props.dispatch(modifySecondsLeft(event.target.value));
      } else {
        this.props.dispatch(modifySecondDuration(event.target.value));
      }
    }
  }

  render() {
    return (
      <div>
        <TimeInput
          onChange={this.handleChange.bind(this)}
          minutes={this.props.inProgress ? this.props.minutesLeft : this.props.durationMinutes}
          seconds={this.props.inProgress ? this.props.secondsLeft : this.props.durationSeconds}
        />
        <div className="timerButtonsContainer">
          <input type="button" value={!this.props.inProgress ? "Start" : this.props.paused ? "Resume" : "Pause"}
            onClick={ () => this.props.dispatch(!this.props.inProgress ? startTimer() : this.props.paused ? resumeTimer() : pauseTimer()) }
          />
          <input type="button" value="Skip" disabled={this.props.paused}
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
            durationMinutes: Math.floor(state.get("durationSeconds") / 60),
            durationSeconds: state.get("durationSeconds") % 60,
            minutesLeft: Math.floor(state.get("secondsLeft") / 60),
            secondsLeft: state.get("secondsLeft") % 60
        }
}

export default connect(mapStateToProps)(Timer);
