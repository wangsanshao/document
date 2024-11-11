### requestIdleCallback

window.requestIdleCallback() 方法插入一个函数，这个函数在浏览器空闲时期被调用。这个使得开发者能够在主事件循环上执行后台任务和低优先级工作，而不会影响延迟关键事件，例如动画和输入响应。
函数一般会按照先进先出的顺序执行，然而，如果回调函数制定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱了执行顺序。

#### 语法

```javascript
window.requestIdleCallback(callback)
window.requestIdleCallback(callback, options)
```
