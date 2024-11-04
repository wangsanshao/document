### Object.prototype.hasOwnProperty()
hasOwnProperty() 方法返回一个布尔值，表示对象自有属性（而不是继承来的属性）中是否具有指定的属性。

### 语法
```js
obj.hasOwnProperty(prop)
```

### 参数
- prop: 要检查的属性名。

### 返回值
- 如果对象自有属性中包含该属性，则返回 true；否则返回 false。

### 例子
```js
const obj = { a: 1, b: 2 };
console.log(obj.hasOwnProperty('a')); // true
console.log(obj.hasOwnProperty('toString')); // false
```

### 注意
- hasOwnProperty 方法只会检查对象自身的属性，不会检查继承的属性。
- 如果需要检查继承的属性，可以使用 in 操作符。


### 参考
- [MDN - Object.prototype.hasOwnProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
