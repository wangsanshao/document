### Object.getOwnPropertyDescriptor()

Object.getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，而不是从原型链继承的属性）

```javascript
const obj = {
  prop: 42,
};

Object.getOwnPropertyDescriptor(obj, 'prop');
// output: Object { value: 42, writable: true, enumerable: true, configurable: true }
```

### 参考资料

- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)
