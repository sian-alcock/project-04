const moment = require('moment')
const momentDurationFormatSetup = require('moment-duration-format')
momentDurationFormatSetup(moment)
typeof moment.duration.fn.format === 'function'
typeof moment.duration.format === 'function'


export const formatTimes = function formatTimes(timeInMs){
  const duration = moment.duration(timeInMs).format('h:mm:ss.SS')
  return duration
}

export const formatTimeDate = function formatTimeDate(timeInMs){
  const duration = moment.duration(timeInMs).format('DD MM YY h:mm')
  return duration
}
