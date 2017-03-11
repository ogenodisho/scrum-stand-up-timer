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
    TICK
} from './actions'


function standupTimer(state, action) {
    switch (action.type) {
        case START_TIMER:
            return state.set("inProgress", true);
        case PAUSE_TIMER:
            return state.set("paused", true);
        case RESUME_TIMER:
            return state.set("paused", false);
        case SKIP:
            return state;
        case FINISH_TURN:
            return state;
            // TODO HANDLE IF THE CURRENT TEAM MEMBER IS MESSED WITH
        case CHECK_TEAM_MEMBER:
            return state.setIn(["teamMembers", action.index, "awaitingTurn"], true);
        case UNCHECK_TEAM_MEMBER:
            return state.setIn(["teamMembers", action.index, "awaitingTurn"], false);
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
        default:
            return state;
    }
}

export default standupTimer
