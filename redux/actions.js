export const START_TIMER = 'START_TIMER'
export const PAUSE_TIMER = 'PAUSE_TIMER'
export const RESUME_TIMER = 'RESUME_TIMER'
export const SKIP = 'SKIP'
export const FINISH_TURN = 'FINISH_TURN'
export const CHECK_TEAM_MEMBER = 'CHECK_TEAM_MEMBER'
export const UNCHECK_TEAM_MEMBER = 'UNCHECK_TEAM_MEMBER'
export const ADD_MINUTES = 'ADD_MINUTES'
export const MINUS_MINUTES = 'MINUS_MINUTES'
export const ADD_SECONDS = 'ADD_SECONDS'
export const MINUS_SECONDS = 'MINUS_SECONDS'
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

export function addMinutes() {
    console.log("Received Action: ADD_MINUTES");
    return {
        type: ADD_MINUTES
    }
}

export function minusMinutes() {
    console.log("Received Action: MINUS_MINUTES");
    return {
        type: MINUS_MINUTES
    }
}

export function addSeconds() {
    console.log("Received Action: ADD_SECONDS");
    return {
        type: ADD_SECONDS
    }
}

export function minusSeconds() {
    console.log("Received Action: MINUS_SECONDS");
    return {
        type: MINUS_SECONDS
    }
}

export function tick() {
    console.log("Received Action: TICK");
    return {
        type: TICK
    }
}
