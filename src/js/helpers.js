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

export function makePromise (cb, payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload) {
        cb(payload)
        resolve()
      } else {
        reject(new Error('Error'))
      }
    }, 100)
  })
}

export function addItemToLocalStorage (arrName = '') {
  if (!arrName.length) return
  return function (payload) {
    const arr = (JSON.parse(localStorage.getItem(arrName)))
    arr.push(payload)
    localStorage.setItem(arrName, JSON.stringify(arr))
  }
}

export function removeItemFromLocalStorage (arrName = '') {
  if (!arrName.length) return
  return function (payload) {
    const arr = (JSON.parse(localStorage.getItem(arrName))).filter(item => item.id !== payload)
    localStorage.setItem(arrName, JSON.stringify(arr))
  }
}
