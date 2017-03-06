const data = require('./mock-drag')
const LATENCY = 16

export function getAllDrag (cb) {
    setTimeout(() => {
        cb(data)
    }, LATENCY)
}