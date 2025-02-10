```javascript
const _setTimeout = (fn, time) => {
  let running = true
  let timer = null
  const loop = () => {
    if (!running) return
    fn()
    timer = setTimeout(loop, time)
  }
  loop()
  return {
    stop: () => {
      running = false
      clearTimeout(timer)
    }
  }
}
```