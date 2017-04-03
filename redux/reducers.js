import {
    START_TIMER,
    PAUSE_TIMER,
    RESUME_TIMER,
    SKIP,
    FINISH_TURN,
    CHECK_TEAM_MEMBER,
    UNCHECK_TEAM_MEMBER,
    MODIFY_MINUTES_LEFT,
    MODIFY_SECONDS_LEFT,
    MODIFY_MINUTE_DURATION,
    MODIFY_SECOND_DURATION,
    TICK,
    RANDOMIZE,
    HYDRATE
} from './actions'
const Immutable = require('immutable');

function shuffleAndSetIndexesAndAwaitingTurn(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    for (var i = 0; i < a.length; i++) {
        a[i].index = i;
        a[i].awaitingTurn = true;
    }
}

function standupTimer(state, action) {
    switch (action.type) {
        case HYDRATE:
            var teamMembers = action.data.teamMembers
            var durationSeconds = action.data.durationSeconds
            var teamAvatarUrl = action.data.teamAvatarUrl
            shuffleAndSetIndexesAndAwaitingTurn(teamMembers)
            var stateToReturn = state.set("teamMembers", Immutable.fromJS(teamMembers))
            stateToReturn = stateToReturn.set("teamAvatarUrl", Immutable.fromJS(teamAvatarUrl))
            return stateToReturn.set("durationSeconds", Immutable.fromJS(durationSeconds))
        case START_TIMER:
            var stateToReturn = state.set("timerId", setInterval(action.tick, 1000)).set("inProgress", true);
            // set current team member index
            var teamMembers = state.get("teamMembers").toJS();
            for (var i = 0; i < teamMembers.length; i++) {
                if (teamMembers[i].awaitingTurn) {
                    return stateToReturn.set("currentTeamMemberIndex", i);
                }
            }
            break;
        case PAUSE_TIMER:
            return state.set("paused", true);
        case RESUME_TIMER:
            return state.set("paused", false);
        case SKIP:
        case FINISH_TURN:
            var currentTeamMemberIndex = state.get("currentTeamMemberIndex");
            var teamMembers = state.get("teamMembers").toJS();
            var currentTeamMemberFinishedState = state.setIn(["teamMembers", currentTeamMemberIndex, "awaitingTurn"], false)
                .set("secondsLeft", state.get("durationSeconds"));

            // for loop that wraps around to find next team member
            for (var i = currentTeamMemberIndex + 1; i < teamMembers.length + currentTeamMemberIndex; i++) {
                var currTeamMember = teamMembers[i % teamMembers.length];
                if (currTeamMember.awaitingTurn) {
                    return currentTeamMemberFinishedState.set("currentTeamMemberIndex", currTeamMember.index);
                }
            }

            for (var i = 0; i < teamMembers.length; i++) {
                currentTeamMemberFinishedState = currentTeamMemberFinishedState.setIn(["teamMembers", i, "awaitingTurn"], true);
            }

            clearInterval(state.get("timerId"));
            currentTeamMemberFinishedState = currentTeamMemberFinishedState.set("inProgress", false);
            return randomizeTeamMembers(currentTeamMemberFinishedState)
        case CHECK_TEAM_MEMBER:
            return state.setIn(["teamMembers", action.index, "awaitingTurn"], true).set("allUnchecked", false);
        case UNCHECK_TEAM_MEMBER:
            var stateToReturn = state.set("allUnchecked", true);
            var teamMembers = state.get("teamMembers").toJS();

            for (var i = 0; i < teamMembers.length; i++) {
                if (i === action.index) {
                    continue;
                }
                if (teamMembers[i].awaitingTurn) {
                    stateToReturn = stateToReturn.set("allUnchecked", false);
                    break;
                }
            }

            return stateToReturn.setIn(["teamMembers", action.index, "awaitingTurn"], false);
        case MODIFY_MINUTE_DURATION:
            var currSeconds = state.get("durationSeconds") % 60;
            return state.set("durationSeconds", currSeconds + action.minutes * 60).set("secondsLeft", currSeconds + action.minutes * 60);
        case MODIFY_SECOND_DURATION:
            var currMinutesInSeconds = Math.floor(state.get("durationSeconds") / 60) * 60;
            return state.set("durationSeconds", currMinutesInSeconds + action.seconds).set("secondsLeft", currMinutesInSeconds + action.seconds);
        case MODIFY_MINUTES_LEFT:
            var currSeconds = state.get("secondsLeft") % 60;
            return state.set("secondsLeft", currSeconds + action.minutes * 60);
        case MODIFY_SECONDS_LEFT:
            var currMinutesInSeconds = Math.floor(state.get("secondsLeft") / 60) * 60;
            return state.set("secondsLeft", currMinutesInSeconds + action.seconds);
        case TICK:
            return state.update("secondsLeft", secondsLeft => secondsLeft - 1);
        case RANDOMIZE:
            return randomizeTeamMembers(state)
        default:
            return state;
    }
}

function randomizeTeamMembers(state) {
    var randomizedTeamMembers = state.get("teamMembers").sortBy(teamMember => Math.random()).toJS();

    for (var i = 0; i < randomizedTeamMembers.length; i++) {
        randomizedTeamMembers[i].index = i;
    }

    return state.set("teamMembers", Immutable.fromJS(randomizedTeamMembers));
}

export default standupTimer
