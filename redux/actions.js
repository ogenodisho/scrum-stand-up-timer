export const START_TIMER = 'START_TIMER'
export const PAUSE_TIMER = 'PAUSE_TIMER'
export const FINISH_TURN = 'FINISH_TURN'
export const CHECK_TEAM_MEMBER = 'CHECK_TEAM_MEMBER'
export const UNCHECK_TEAM_MEMBER = 'UNCHECK_TEAM_MEMBER'
export const ADD_MINUTES = 'ADD_MINUTES'
export const MINUS_MINUTES = 'MINUS_MINUTES'
export const ADD_SECONDS = 'ADD_SECONDS'
export const MINUS_SECONDS = 'MINUS_SECONDS'
export const TICK = 'TICK'

export function startTimer() {
    return {
        type: START_TIMER
    }
}

export function pauseTimer() {
    return {
        type: PAUSE_TIMER
    }
}

export function finishTurn() {
    return {
        type: FINISH_TURN
    }
}

export function checkTeamMember(name) {
    return {
        type: CHECK_TEAM_MEMBER,
        name: name
    }
}

export function uncheckTeamMember(name) {
    return {
        type: UNCHECK_TEAM_MEMBER,
        name: name
    }
}

export function addMinutes() {
    return {
        type: ADD_MINUTES
    }
}

export function minusMinutes() {
    return {
        type: MINUS_MINUTES
    }
}

export function addSeconds() {
    return {
        type: ADD_SECONDS
    }
}

export function minusSeconds() {
    return {
        type: MINUS_SECONDS
    }
}

export function tick() {
    return {
        type: TICK
    }
}
