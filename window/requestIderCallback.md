### requestIdleCallback

window.requestIdleCallback() 方法插入一个函数，这个函数在浏览器空闲时期被调用。这个使得开发者能够在主事件循环上执行后台任务和低优先级工作，而不会影响延迟关键事件，例如动画和输入响应。
函数一般会按照先进先出的顺序执行，然而，如果回调函数制定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱了执行顺序。

#### 语法

```javascript
window.requestIdleCallback(callback)
window.requestIdleCallback(callback, options)
```

#### 参数

- callback: 回调函数
一个在事件循环空闲时即将被调用的函数的引用，函数会接收到一个名为IdleDeadline的参数，这个参数可以获取当前空闲时间以及回调是否在超时时间前已经执行的状态。
- options: 配置对象
  - timeout: 超时时间，单位为毫秒，如果指定了 timeout，并且有一个正值，而回调在 timeout 毫秒过后还没有被调用，那么回调任务将放入事件循环中排队，即使这样做有可能对性能产生负面影响。

#### 返回值

返回一个ID，可以用于取消回调函数。Window.cancelIdleCallback(id)
