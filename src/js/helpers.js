export function formatMoney (money) {
  if (isNaN(Number(money))) return

  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'TJS'
  })

  return formatter.format(money)
}
