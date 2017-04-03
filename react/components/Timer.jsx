const React = require('react');
import TimeInput from './TimeInput.jsx';
import { connect } from 'react-redux'
import {  startTimer, pauseTimer, resumeTimer, skip, tick,
          finishTurn, modifyMinuteDuration, modifySecondDuration,
          modifyMinutesLeft, modifySecondsLeft } from '../../redux/actions.js'
          import { audioNotification } from '../../index/CitadelIntegration.js'

class Timer extends React.Component {

  tick() {
    if (this.props.paused) {
      return;
    }

    if (this.props.minutesLeft === 0) {
      if (this.props.secondsLeft === 31) {
        audioNotification("thirty seconds remaining")
      }
      if (this.props.secondsLeft <= 11) {
        audioNotification(this.props.secondsLeft - 1)
      }
    }

    if (this.props.minutesLeft === 0 && this.props.secondsLeft === 0) {
      this.props.dispatch(finishTurn());
    } else {
      this.props.dispatch(tick());
    }
  }

  skip() {
    this.props.dispatch(skip());
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
    return (
      <div>
        <TimeInput
          onChange={this.handleChange.bind(this)}
          minutes={this.props.inProgress ? this.props.minutesLeft : this.props.durationMinutes}
          seconds={this.props.inProgress ? this.props.secondsLeft : this.props.durationSeconds}
        />
        <div className="timerButtonsContainer">
          <input type="button" value={!this.props.inProgress ? "Start" : this.props.paused ? "Resume" : "Pause"}
            onClick={ () => {
                        if (!this.props.inProgress) {
                          this.props.dispatch(startTimer(this.tick.bind(this)));
                        } else {
                          this.props.dispatch(this.props.paused ? resumeTimer() : pauseTimer());
                        }
                      }
                    }
            disabled={!this.props.inProgress && this.props.allUnchecked}
          />
          <input type="button" value="Skip" disabled={this.props.paused || !this.props.inProgress}
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
            secondsLeft: state.get("secondsLeft") % 60,
            allUnchecked: state.get("allUnchecked")
        }
}

export default connect(mapStateToProps)(Timer);
