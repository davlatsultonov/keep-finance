const TODAY = new Date()
const YESTERDAY = new Date(TODAY)
YESTERDAY.setDate(TODAY.getDate() - 1)

export {
  TODAY,
  YESTERDAY
}
