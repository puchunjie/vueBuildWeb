const data = require('./mock-drags')
const LATENCY = 17

export function getAllDrags(cb) {
    setTimeout(() => {
        cb(data)
    }, LATENCY)
}