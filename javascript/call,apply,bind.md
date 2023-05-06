#### Function.prototype.bind()
返回一个新的函数，新的函数的this指向bind的第一个参数。剩下的参数作为入参传给新的函数。
#####
举个例子
```
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

#### Function.prototype.apply()
