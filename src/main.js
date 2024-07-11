import './main.css'


const $revealElements = document.querySelectorAll('[data-reveal')

for (let i = 0; i < $revealElements.length; i++) {
  const
    $el = $revealElements[i],
    data = $el.getAttribute('data-reveal'),
    mask = new Array(data.length).fill(-1)

  let
    t = fill(mask, 0),
    f = 2,
    p = 0

  requestAnimationFrame(function tick(ts) {
    if (ts - p > 1000 / 25) { // 25 FPS
      p = ts

      if (t.next().done) {
        t = fill(mask, 1)
        f--
      }

      $el.textContent = transform(mask, data)
    }

    if (f) requestAnimationFrame(tick)
  })
}

// Utils

function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getIndexes(arr, val) {
  return arr.map((el, i) => {
    return el !== val ? i : Infinity
  }).filter((el) => el !== Infinity)
}

function* fill(arr, val, type = 0) {
  let n = arr.length

  while (n--) {
    switch (type) {
      case 1: // left
        arr[arr.length - n - 1] = val
        break
      case 2: // right
        arr[n] = val
        break
      default: // random
        arr[sample(getIndexes(arr, val))] = val
    }
    yield
  }
}

function transform(mask, str) {
  const ALPHABET = ['\u00a0', '.', '!', '?', '{', '}', '<', '>', '#', '%', '█', '▓', '▒', '░']

  return mask.map((el, i) => {
    if (el === -1) return '\u00a0'
    if (el ===  1) return str[i]
    if (el ===  0) return sample(ALPHABET)
  }).join('')
}
