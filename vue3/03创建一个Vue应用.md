## 创建一个Vue应用

### 实例应用
每一个Vue应用都是通过createApp函数创建的
```javascript
const app = createApp({
  /* 根组件 */
})
```
### 根组件
传入createApp的的对象实际上一个组件，每个应用需要一个根组件，其他组件作为其子组件

```javascript
import { createApp } from 'vue'
// 从一个单文件组件中导入根组件
import App from './App.vue'

const app = createApp(App)
```

### 挂载应用

应用实例必须在调用了.mount()方法后才会渲染出来。该方法接收一个“容器”参数，可以是一个实际的DOM元素，也可以是一个CSS选择器字符串

```html
<div id="app"></div>
```

```javascript
app.mount('#app')
```

### DOM中的根组件模版
根组件的模板通常是组件本身的一部分，但也可以直接通过在挂载容器内编写模板来单独提供：
```html
<div id="app">
  <button @click="count++">{{ count }}</button>
</div>

```
```javascript
import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})

app.mount('#app')
```

当根组件没有template选项时，Vue会取挂载元素的outerHTML作为模版

### 应用配置
应用实例会暴露一个.config对象，该对象上可以配置应用的一些选项

```javascript
app.config.globalProperties.msg = 'hello'
```
```javascript
app.config.errorHandler = (err) => {
  /* 处理错误 */
}
``` 

应用实例还提供了一些方法来注册应用范围内可用的资源，例如注册一个组件：
```javascript
app.component('MyComponent', MyComponent)
```
这样子注册的组件在应用内的任何地方都可以使用

### 多个应用实例

```javascript
const app1 = createApp({
  /* 配置 */
})

app1.mount('#app1')
const app2 = createApp({
  /* 配置 */
})
app2.mount('#app2')
```
