var React = require('react');

class TimeInput extends React.Component {
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

  render() {
    return (
      <div className="timeInput">
        <input className="minutes" type="number" min="0" max="59"
          value={this.props.minutesLeft}
          onChange={this.props.onChange}
          onKeyPress={this.handleKeyPress}
          onMouseEnter={this.focusMinutes}
          onMouseLeave={this.blurMinutes}
          ref={
            (input) => {
              this.minutesInput = input;
            }
          }
        />
        <span>: </span>
        <input className="seconds" type="number" min="0" max="59"
          value={this.props.secondsLeft}
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
    );
  }
}

export default TimeInput;
