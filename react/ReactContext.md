## ReactContext.js

### 主要功能[ReactContext.js](https://github.com/facebook/react/blob/main/packages/react/src/ReactContext.js )


### 核心代码

```javascript
export function createContext(defaultValue){
  const context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider: null,
    Consumer: null,
  }

  if(enableRenderableContext) {
    context.Provider = context;
    context.Consumer = {
      $$typeof: REACT_CONTEXT_TYPE,
      _context: context,
    };
  } else {
    context.Provider = {
      $$typeof: REACT_PROVIDER_TYPE,
      _context: context,
    };

    if(__DEV__){
      const Consumer = {
        $$typeof: REACT_CONTEXT_TYPE,
        _context: context,
      };

      Object.defineProperties(Consumer, {
        Provider: {
          get() {
            return context.Provider;
          },
          set(_Provider) {
            context.Provider = _Provider;
          },
        },
        _currentValue: {
          get() {
            return context._currentValue;
          },
          set(_currentValue) {
            context._currentValue = _currentValue;
          },
        },
        _currentValue2: {
          get() {
            return context._currentValue2;
          },
          set(_currentValue2) {
            context._currentValue2 = _currentValue2;
          },
        },
        _threadCount: {
          get() {
            return context._threadCount;
          },
          set(_threadCount) {
            context._threadCount = _threadCount;
          },
        },
        Consumer: {
          get() {
            return context.Consumer;
          },
        },
        displayName: {
          get() {
            return context.displayName;
          },
          set(displayName) {}
        },
      });
      (context: any).Consumer = Consumer;
    } else {
      (context: any).Consumer = context;
    }
  }

  if (__DEV__) {
    context._currentRenderer = null;
    context._currentRenderer2 = null;
  }
  return context;
}
```
