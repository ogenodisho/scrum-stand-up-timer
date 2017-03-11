export const START_TIMER = 'START_TIMER'
export const PAUSE_TIMER = 'PAUSE_TIMER'
export const RESUME_TIMER = 'RESUME_TIMER'
export const SKIP = 'SKIP'
export const FINISH_TURN = 'FINISH_TURN'
export const CHECK_TEAM_MEMBER = 'CHECK_TEAM_MEMBER'
export const UNCHECK_TEAM_MEMBER = 'UNCHECK_TEAM_MEMBER'
export const MODIFY_MINUTES_LEFT = 'MODIFY_MINUTES_LEFT'
export const MODIFY_SECONDS_LEFT = 'MODIFY_SECONDS_LEFT'
export const MODIFY_MINUTE_DURATION = 'MODIFY_MINUTE_DURATION'
export const MODIFY_SECOND_DURATION = 'MODIFY_SECOND_DURATION'
export const TICK = 'TICK'

export function startTimer() {
    console.log("Received Action: START_TIMER");
    return {
        type: START_TIMER
    }
}

export function pauseTimer() {
    console.log("Received Action: PAUSE_TIMER");
    return {
        type: PAUSE_TIMER
    }
}

export function resumeTimer() {
    console.log("Received Action: RESUME_TIMER");
    return {
        type: RESUME_TIMER
    }
}

export function skip() {
    console.log("Received Action: SKIP");
    return {
        type: SKIP
    }
}

export function finishTurn() {
    console.log("Received Action: FINISH_TURN");
    return {
        type: FINISH_TURN
    }
}

export function checkTeamMember(index) {
    console.log("Received Action: CHECK_TEAM_MEMBER");
    return {
        type: CHECK_TEAM_MEMBER,
        index: index
    }
}

export function uncheckTeamMember(index) {
    console.log("Received Action: UNCHECK_TEAM_MEMBER");
    return {
        type: UNCHECK_TEAM_MEMBER,
        index: index
    }
}

export function modifyMinutesLeft(minutes) {
    console.log("Received Action: MODIFY_MINUTES_LEFT");
    return {
        type: MODIFY_MINUTES_LEFT,
        minutes: parseInt(minutes)
    }
}

export function modifySecondsLeft(seconds) {
    console.log("Received Action: MODIFY_SECONDS_LEFT");
    return {
        type: MODIFY_SECONDS_LEFT,
        seconds: parseInt(seconds)
    }
}

export function modifyMinuteDuration(minutes) {
    console.log("Received Action: MODIFY_MINUTE_DURATION");
    return {
        type: MODIFY_MINUTE_DURATION,
        minutes: parseInt(minutes)
    }
}

export function modifySecondDuration(seconds) {
    console.log("Received Action: MODIFY_SECOND_DURATION");
    return {
        type: MODIFY_SECOND_DURATION,
        seconds: parseInt(seconds)
    }
}

export function tick() {
    console.log("Received Action: TICK");
    return {
        type: TICK
    }
}
