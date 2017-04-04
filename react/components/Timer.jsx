const React = require('react');
import { connect } from 'react-redux'
import { modifyMinuteDuration, modifySecondDuration, modifyMinutesLeft, modifySecondsLeft } from '../../redux/actions.js'

function padZeros(value) {
  if ((value + "").length === 1) {
    return "0" + value;
  } else {
    return value + "";
  }
}

class Timer extends React.Component {

  constructor(props) {
    super(props)
    this.focusSeconds = this.focusSeconds.bind(this);
    this.blurSeconds = this.blurSeconds.bind(this);
    this.focusMinutes = this.focusMinutes.bind(this);
    this.blurMinutes = this.blurMinutes.bind(this);
  }

  handleKeyPress(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  focusSeconds() {
    this.secondsInput.focus();
  }
  blurSeconds() {
    this.secondsInput.blur();
  }
  focusMinutes() {
    this.minutesInput.focus();
  }
  blurMinutes() {
    this.minutesInput.blur();
  }

  handleChange(event) {
    if (event.target.className === "minutes") {
      if (this.props.inProgress) {
        if (this.props.paused) {
          this.props.dispatch(modifyMinutesLeft(event.target.value));
        }
      } else {
        this.props.dispatch(modifyMinuteDuration(event.target.value));
      }
    } else if (event.target.className === "seconds") {
      if (this.props.inProgress) {
        if (this.props.paused) {
          this.props.dispatch(modifySecondsLeft(event.target.value));
        }
      } else {
        this.props.dispatch(modifySecondDuration(event.target.value));
      }
    }
  }

  render() {
    var minutes = this.props.inProgress ? this.props.minutesLeft : this.props.durationMinutes
    var seconds = this.props.inProgress ? this.props.secondsLeft : this.props.durationSeconds
    return (
      <div className="timeInput">
        <input className="minutes" type="number" min="0" max="59"
          value={padZeros(minutes)}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          onMouseEnter={this.focusMinutes}
          onMouseLeave={this.blurMinutes}
          ref={
            (input) => {
              this.minutesInput = input;
            }
          }
        />
        <span>:</span>
        <input className="seconds" type="number" min="0" max="59"
          value={padZeros(seconds)}
          onChange={this.props.onChange}
          onKeyPress={this.handleKeyPress}
          onMouseEnter={this.focusSeconds}
          onMouseLeave={this.blurSeconds}
          ref={
            (input) => {
              this.secondsInput = input;
            }
          }
        />
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
