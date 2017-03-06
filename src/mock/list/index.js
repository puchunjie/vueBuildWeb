const data = require('./mock-drag')
const LATENCY = 16

export function getAllDrags (cb) {
  setTimeout(() => {
    cb(data)
  }, LATENCY)
}
