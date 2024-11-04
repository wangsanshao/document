## ReactCreateRef

### 主要功能[代码文件](https://github.com/facebook/react/blob/main/packages/react/src/ReactCreateRef.js)

1. cerateRef 函数创建一个ref对象，React 中用于保存对 DOM 节点或 React 组件实例引用的机制。
2. 返回对象
   ```javascript
   {
    current: null
   }
   ```
   
3. ref被附加到元素上的时候，current 会被自动设置为
   1. DOM元素（如果用在普通 HTML 元素上）
   2. 组件实例
4. 在开发环境，Object.seal 来密封对象，
    1. 防止添加新属性
    2. 防止删除现有属性
    3. 但允许修改 current 的值

### 核心代码

```javascript
// an immutable object with a single mutable value
export function createRef() {
  const refObject = {
    current: null,
  };
  if (__DEV__) {
    Object.seal(refObject);
  }
  return refObject;
}
```