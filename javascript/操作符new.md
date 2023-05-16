#### new 关键字
1. 创建一个空对象
2. 将空对象的原型指向构造函数的原型
3. 将构造函数的this指向空对象
4. 执行构造函数中的代码
5. 如果构造函数返回非空对象，则返回该对象，否则返回刚创建的空对象

#### 实现new
```javascript
function _new() {
  var Constructor = Array.prototype.silce.call(arguments, 0, 1)
  var obj = new Object()
  var F = function() {}
  F._proto_ = Constructor.prototype
  obj = new F()
  var args = Array.prototype.slice.call(arguments, 1)
  var result = typeof Constructor.apply(obj, args)
  return typeof result === 'object' ? result : obj
}
```
```javascript

function _new() {
  var constructor = Array.prototype.shift.call(arguments)
  var obj = {}
  var F = function() {}
  F.prototype = constructor.prototype
  obj = new F()
  var args = Array.prototype.slice.call(arguments)
  var result = constructor.apply(obj, args) 
  return typeof result === 'object' ? result : obj
}

```