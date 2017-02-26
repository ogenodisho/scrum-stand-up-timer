import {
    START_TIMER,
    PAUSE_TIMER,
    SKIP,
    CHECK_TEAM_MEMBER,
    UNCHECK_TEAM_MEMBER,
    ADD_MINUTES
    MINUS_MINUTES,
    ADD_SECONDS,
    MINUS_SECONDS
} from './actions'

const initialState = {
    durationSeconds: 120,
    secondsLeft: 120,
    inProgress: false,
    teamMembers: [{
        name: "Aaron",
        imageUrl: "http://www.tfo.su/uploads5/futurama/03.png",
        awaitingTurn: true,
    }, {
        name: "Daniel",
        imageUrl: "http://www.tfo.su/uploads5/futurama/16.png",
        awaitingTurn: true
    }, {
        name: "Ian",
        imageUrl: "http://www.tfo.su/uploads5/futurama/41.png",
        awaitingTurn: true
    }, {
        name: "Jason",
        imageUrl: "http://www.tfo.su/uploads5/futurama/14.png",
        awaitingTurn: true
    }, {
        name: "Ogen",
        imageUrl: "http://www.tfo.su/uploads5/futurama/36.png",
        awaitingTurn: true
    }, {
        name: "Robert",
        imageUrl: "http://www.tfo.su/uploads5/futurama/22.png",
        awaitingTurn: true
    }, {
        name: "Tegan",
        imageUrl: "http://www.tfo.su/uploads5/futurama/29.png",
        awaitingTurn: true
    }, {
        name: "Tom",
        imageUrl: "http://www.tfo.su/uploads5/futurama/49.png",
        awaitingTurn: true
    }]
}

function standupTimer(state = initialState, action) {
    switch (action.type) {
        case START_TIMER:
            return Object.assign({}, state, {
                inProgress: true
            })
        case PAUSE_TIMER:
            return Object.assign({}, state, {
                inProgress: false
            })
        case FINISH_TURN:
            var teamMembersCopy = state.teamMembers.slice()
            return Object.assign({}, state, {
                teamMembers: teamMembersCopy.push(teamMembersCopy.shift())
            })
        case CHECK_TEAM_MEMBER:
            var teamMembersCopy = state.teamMembers.slice()
            var backOfLineIndex = 0;
            for (var i = 0; i < teamMembersCopy.length; i++) {
                if (!teamMembersCopy[i].awaitingTurn) {
                    backOfLineIndex = i;
                    break
                }
            }
            for (var i = 0; i < teamMembersCopy.length; i++) {
                if (teamMembersCopy[i].name === action.name) {
                    teamMembersCopy[i].awaitingTurn = true;
                    var temp = teamMembersCopy[i];
                    teamMembersCopy[i] = teamMembersCopy[backOfLineIndex];
                    teamMembersCopy[backOfLineIndex] = temp;
                    break
                }
            }
            return Object.assign({}, state, {
                teamMembers: teamMembersCopy
            })
        case UNCHECK_TEAM_MEMBER:
            // TODO What if you uncheck index 0 - the current person?
            var teamMembersCopy = state.teamMembers.slice()
            for (var i = 0; i < teamMembersCopy.length; i++) {
                if (teamMembersCopy[i].name === action.name) {
                    teamMembersCopy[i].awaitingTurn = false;
                    teamMembersCopy.push(teamMembersCopy.splice(i, 1))
                    break
                }
            }
            return Object.assign({}, state, {
                teamMembers: teamMembersCopy
            })
        case ADD_MINUTES:
            return Object.assign({}, state, {
                durationSeconds: state.durationSeconds + 60
            })
        case MINUS_MINUTES:
            return Object.assign({}, state, {
                durationSeconds: state.durationSeconds - 60
            })
        case ADD_SECONDS:
            return Object.assign({}, state, {
                durationSeconds: state.durationSeconds + 1
            })
        case MINUS_SECONDS:
            return Object.assign({}, state, {
                durationSeconds: state.durationSeconds - 1
            })
        case TICK:
            return Object.assign({}, state {
                secondsLeft: state.secondsLeft - 1;
            })
        default:
            return state
    }
}

export default standupTimer
