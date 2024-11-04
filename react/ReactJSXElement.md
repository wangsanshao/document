### ReactJSXElement

### 核心代码[ReactJSXElement.js](https://github.com/facebook/react/blob/main/packages/react/src/jsx/ReactJSXElement.js)

### 主要功能

```javascript
export function jsxProd(type, config, maybeKey) {
  ...
  return ReactElement(
    type,
    key,
    ref,
    undefined,
    undefined,
    getOwner(),
    props,
    undefined,
    undefined,
  );
}
```

```javascript
function ReactElement(type,
  key,
  _ref,
  self,
  source,
  owner,
  props,
  debugStack,
  debugTask,
  ) {
    let element;

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
    return element;
}

export function createElement(type, config, children) {

  return ReactElement(
    type,
    key,
    ref,
    undefined,
    undefined,
    getOwner(),
    props,
    __DEV__ && enableOwnerStacks ? Error('react-stack-top-frame') : undefined,
    __DEV__ && enableOwnerStacks ? createTask(getTaskName(type)) : undefined,
  );
}
```

```javascript
export function cloneAndReplaceKey(oldElement, newKey) {
  const clonedElement = ReactElement(
    oldElement.type,
    newKey,
    // When enableRefAsProp is on, this argument is ignored. This check only
    // exists to avoid the `ref` access warning.
    enableRefAsProp ? null : oldElement.ref,
    undefined,
    undefined,
    !__DEV__ && disableStringRefs ? undefined : oldElement._owner,
    oldElement.props,
    __DEV__ && enableOwnerStacks ? oldElement._debugStack : undefined,
    __DEV__ && enableOwnerStacks ? oldElement._debugTask : undefined,
  );
  if (__DEV__) {
    // The cloned element should inherit the original element's key validation.
    clonedElement._store.validated = oldElement._store.validated;
  }
  return clonedElement;
}
```

```javascript
export function cloneElement(element, config, children) {
  ...
  const clonedElement = ReactElement(
    element.type,
    key,
    ref,
    undefined,
    undefined,
    owner,
    props,
    __DEV__ && enableOwnerStacks ? element._debugStack : undefined,
    __DEV__ && enableOwnerStacks ? element._debugTask : undefined,
  );

  for (let i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], clonedElement.type);
  }

  return clonedElement;
}
```

```javascript
export function isValidElement(object) {
  return (
    typeof object === 'object' &&
    object !== null &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}
```