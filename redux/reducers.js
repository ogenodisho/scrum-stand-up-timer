import {
    START_TIMER,
    PAUSE_TIMER,
    RESUME_TIMER,
    SKIP,
    FINISH_TURN,
    CHECK_TEAM_MEMBER,
    UNCHECK_TEAM_MEMBER,
    ADD_MINUTES,
    MINUS_MINUTES,
    ADD_SECONDS,
    MINUS_SECONDS,
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
        case ADD_MINUTES:
            return state.set("durationSeconds", state.get("durationSeconds") + 60);
        case MINUS_MINUTES:
            return state.set("durationSeconds", state.get("durationSeconds") - 60);
        case ADD_SECONDS:
            return state.set("durationSeconds", state.get("durationSeconds") + 1);
        case MINUS_SECONDS:
            return state.set("durationSeconds", state.get("durationSeconds") - 1);
        case TICK:
            return state.set("secondsLeft", state.get("secondsLeft") - 1);
        default:
            return state;
    }
}

export default standupTimer
