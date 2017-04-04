var React = require('react');
import { connect } from 'react-redux'
import { switchUserMode } from '../../redux/actions.js'

class UserModeButton extends React.Component {

  render() {
    if (this.props.userMode) {
      return (<div></div>)
    } else {
      return (
        <input type="button" value="Switch to user mode" onClick={ () => this.props.dispatch(switchUserMode()) }/>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
        userMode: state.get("userMode"),
    }
}

export default connect(mapStateToProps)(UserModeButton);
