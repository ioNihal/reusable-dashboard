// src/services/api.js
export function fetchMock(data, delay = 600) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(JSON.parse(JSON.stringify(data))), delay)
  })
}
