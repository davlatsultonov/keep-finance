export function formatMoney (money) {
  if (isNaN(Number(money))) return

  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'TJS'
  })

  return formatter.format(money)
}

export function getCookie (name) {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export function setCookie (name, value, days) {
  let expires = '; expires=Thu, 01 Jan 1970 00:00:00 GMT'

  if (days) {
    const date = new Date()

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  }

  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}
