export const START_TIMER = "START_TIMER";
export const PAUSE_TIMER = "PAUSE_TIMER";
export const RESUME_TIMER = "RESUME_TIMER";
export const SKIP = "SKIP";
export const FINISH_TURN = "FINISH_TURN";
export const CHECK_TEAM_MEMBER = "CHECK_TEAM_MEMBER";
export const UNCHECK_TEAM_MEMBER = "UNCHECK_TEAM_MEMBER";
export const MODIFY_MINUTES_LEFT = "MODIFY_MINUTES_LEFT";
export const MODIFY_SECONDS_LEFT = "MODIFY_SECONDS_LEFT";
export const MODIFY_MINUTE_DURATION = "MODIFY_MINUTE_DURATION";
export const MODIFY_SECOND_DURATION = "MODIFY_SECOND_DURATION";
export const TICK = "TICK";
export const RANDOMIZE = "RANDOMIZE";

export function startTimer(tick) {
    return {
        type: START_TIMER,
        tick: tick
    }
}

export function pauseTimer() {
    return {
        type: PAUSE_TIMER
    }
}

export function resumeTimer() {
    return {
        type: RESUME_TIMER
    }
}

export function skip() {
    return {
        type: SKIP
    }
}

export function finishTurn() {
    return {
        type: FINISH_TURN
    }
}

export function checkTeamMember(index) {
    return {
        type: CHECK_TEAM_MEMBER,
        index: index
    }
}

export function uncheckTeamMember(index) {
    return {
        type: UNCHECK_TEAM_MEMBER,
        index: index
    }
}

export function modifyMinutesLeft(minutes) {
    return {
        type: MODIFY_MINUTES_LEFT,
        minutes: parseInt(minutes)
    }
}

export function modifySecondsLeft(seconds) {
    return {
        type: MODIFY_SECONDS_LEFT,
        seconds: parseInt(seconds)
    }
}

export function modifyMinuteDuration(minutes) {
    return {
        type: MODIFY_MINUTE_DURATION,
        minutes: parseInt(minutes)
    }
}

export function modifySecondDuration(seconds) {
    return {
        type: MODIFY_SECOND_DURATION,
        seconds: parseInt(seconds)
    }
}

export function tick() {
    return {
        type: TICK
    }
}

export function randomize() {
    return {
        type: RANDOMIZE
    }
}
