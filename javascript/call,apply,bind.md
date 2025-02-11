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
var c = b.bind(a) // b的this指向a
c() // 1
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
Function.prototype.applyFive = function(context) {
    var context = context || window
    var args = arguments[1] //获取传入的数组参数
    var fn = jawilSymbol(context);
    context[fn] = this //假想context对象预先不存在名为fn的属性
    if (args == void 0) { //没有传入参数直接执行
        return context[fn]()
    }
    var fnStr = 'context[fn]('
    for (var i = 0; i < args.length; i++) {
        //得到"context.fn(arg1,arg2,arg3...)"这个字符串在，最后用eval执行
        fnStr += i == args.length - 1 ? args[i] : args[i] + ','
    }
    fnStr += ')'
    var returnValue = eval(fnStr) //还是eval强大
    delete context[fn] //执行完毕之后删除这个属性
    return returnValue
}

```

#### Function.prototype.call

```javascript
Function.prototype.callOne = function(context) {
    return this.applyFive(([].shift.applyFive(arguments)), arguments)
    //巧妙地运用上面已经实现的applyFive函数
}

```

#### 参考
> https://github.com/jawil/blog/issues/16