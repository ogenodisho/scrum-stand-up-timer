const React = require('react');
import { connect } from 'react-redux'
import {  startTimer, pauseTimer, resumeTimer, skip, tick, finishTurn } from '../../redux/actions.js'
import { audioNotification } from '../../index/CitadelIntegration.js'

class TimerButtons extends React.Component {

  // TODO move this function to reducers?
  tick() {
    if (this.props.paused || !this.props.inProgress) {
      return;
    }

    if (this.props.minutesLeft === 0) {
      if (this.props.secondsLeft === 31) {
        audioNotification("thirty seconds remaining", "cmu-bdl-hsmm")
      }
      if (this.props.secondsLeft <= 11 && this.props.secondsLeft > 0) {
        audioNotification(this.props.secondsLeft - 1, "cmu-bdl-hsmm")
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

  render() {
    return (
      <div>
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
            minutesLeft: Math.floor(state.get("secondsLeft") / 60),
            secondsLeft: state.get("secondsLeft") % 60,
            allUnchecked: state.get("allUnchecked")
        }
}

export default connect(mapStateToProps)(TimerButtons);
