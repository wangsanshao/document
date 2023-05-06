#### Function.prototype.bind()
返回一个新的函数，新的函数的this指向bind的第一个参数。剩下的参数作为入参传给新的函数。
##### 举个例子

```javascript
var a = {
    x: 1,
    getX: function() {
        return this.x
    }
}
var b = a.getX
b(2) // undefined
var c = b.bind(a) // 1 b的this指向a
```
#### 实现一个bind

```javascript
Function.prototype.bind1 = function() {
    var args = arguments || []
    var self = this
    var content = arguments[0]
    
    var thisArgs = Array.prototype.slice.call(args, 1)
    var returnFun = function() {
        Array.prototype.push.apply(thisArgs, arguments) // 注意理解
        return self.apply(this instanceof self ? this : content, thisArgs)
    }
    returnFun.prototype = new self() // 注意理解
    return returnFun
}
```
#### Function.prototype.apply()
接收两个参数，函数运行时使用this指向第一参数，第二个参数是一个数组或者类数组对象，传递给函数

##### 举个例子

```javascript
var a = [1,2,3,4]
var b = ['a', 'b']
var c = Array.prototype.concat.apply(a, b)
```

##### 实现一个apply



```javascript
Function.prototype.apply1 = function() {
    var args = arguments || []
    var conetent = args[0]
    var result = null
    const self = this
    
    reutrn result
}

```