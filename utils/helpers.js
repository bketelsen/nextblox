export function formatDate(myDate) {
  const convertedDate = new Date(myDate)

  const year = convertedDate.getFullYear()
  const date = convertedDate.getDate()

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const monthIndex = convertedDate.getMonth()
  const monthName = months[monthIndex]

  const formatted = `${monthName} ${date}, ${year}`
  return formatted;
}
