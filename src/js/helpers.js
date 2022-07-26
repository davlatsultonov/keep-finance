export function formatMoney (money) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'TJS'
  })

  return formatter.format(money)
}
