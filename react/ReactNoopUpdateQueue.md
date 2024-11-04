## ReactNoopUpdateQueue
### 主要功能
实现了一个无操作的更新队列，主要的目的是
1. 为为挂在的组件提供一个空的更新对列
2. 在开发环境中，当尝试在未挂载的组件上，调用状态更新方式时发出警告。
   
### 核心代码[](https://github.com/facebook/react/blob/main/packages/react/src/ReactNoopUpdateQueue.js)

```javascript
const didWarnStateUpdateForUnmountedComponent = {};
function warnNoop(publicInstance, callerName) {
  if (__DEV__) {
    const constructor = publicInstance.constructor;
    const componentName =
      (constructor && (constructor.displayName || constructor.name)) ||
      'ReactClass';
    const warningKey = `${componentName}.${callerName}`;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    console.error(
      "Can't call %s on a component that is not yet mounted. " +
        'This is a no-op, but it might indicate a bug in your application. ' +
        'Instead, assign to `this.state` directly or define a `state = {};` ' +
        'class property with the desired state in the %s component.',
      callerName,
      componentName,
    );
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}
```


```javascript
const ReactNoopUpdateQueue = {
  isMounted: function (publicInstance) {
    return false;
  },

  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  enqueueReplaceState: function (
    publicInstance,
    completeState,
    callback,
    callerName,
  ) {
    warnNoop(publicInstance, 'replaceState');
  },

  enqueueSetState: function (
    publicInstance,
    partialState,
    callback,
    callerName,
  ) {
    warnNoop(publicInstance, 'setState');
  },
}

export default ReactNoopUpdateQueue;
```