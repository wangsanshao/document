### Object.getOwnPropertyDescriptors()

Object.getOwnPropertyDescriptors() 方法返回指定对象所有自身属性（非继承属性）的描述对象。

```javascript
const obj = {
  prop: 42,
  name: 'test',
};

Object.getOwnPropertyDescriptors(obj);
// output: Object { prop: Object { value: 42, writable: true, enumerable: true, configurable: true }, name: Object { value: 'test', writable: true, enumerable: true, configurable: true } }
```

### 参考资料

- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors)
