## Component

### 核心代码 [文件地址](https://github.com/facebook/react/blob/main/packages/react/src/ReactBaseClasses.js)
```javascript
const emptyObject = {};
```

### Component基类的定义
```javascript
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
```


### Component基类原型上的方法
```javascript
Component.prototype.isReactComponent = {}
Component.prototype.setState = function(partialState, callback) {}
Component.prototype.forceUpdate = function(callback) {}
```
#### 解释说明
上面代码主要做了下面几件事：
1. 定义了基类Component
2. 给Component基类的原型添加isReactComponent属性，值为一个空对象
3. 给Component基类的原型添加setState方法
4. 给Component基类的原型添加forceUpdate方法

### PureComponent

```javascript
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;
const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;

assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;
```
#### 解释说明

1、定义了PureComponent基类。
2、定义了ComponentDummy,并且让ComponentDummy的原型指向Component的原型，其实就相当于让ComponentDummy继承了Component，CommponentDummy的原型方法也就继承了Component的原型方法。但是ComponentDummy没有自己的方法。
3、定义了变量pureComponentPrototype，并且让pureComponent.Prototype的指向ComponentDummy，其实就相当于让pureComponentPrototype继承了ComponentDummy，pureComponentPrototype的原型方法也就继承了ComponentDummy的原型方法。
4、pureComponentPrototype.constructor = PureComponent，将pureComponentPrototype的构造函数指向PureComponent,当我们创建了 new ComponentDummy() 实例时，它的 constructor 默认指向了 Component（因为继承了 Component.prototype）
但实际上，我们希望 PureComponent 的实例的 constructor 应该指向 PureComponent 而不是 Component
5、assign(pureComponentPrototype, Component.prototype)，将Component的原型方法添加到pureComponentPrototype中。
6、pureComponentPrototype.isPureReactComponent = true，给pureComponentPrototype添加isPureReactComponent属性，值为true
```javascript
export {Component, PureComponent};
```