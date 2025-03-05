# document

## 1、浏览器强缓存和协商缓存

强缓存 状态码200（from disk cache/ from memory cache） 响应头cache-contol 可以设置max-age
js和图片会存入memory（内存）， css 会存入disk（磁盘）

| **选项** | **解释** |
| --- | --- |
| max-age=100 |缓存在100s后过期，资源缓存在本地 |
| no-cache | 不使用本地缓存，使用协商缓存 |
| no-store | 不使用任何缓存 |
| public | 可以被所有的用户缓存，包括客户端和代理服务器 |
| private | 只能被单个用户缓存，通常是用户浏览器，代理服务器则无法缓存 |

如果cache-control 与expries同时存在，cache-control优先级高。

协商缓存 状态304

响应头last-modified 请求的时候带if-modifien-since，最后一次文件修改的时间

响应头 Etag  请求的时候头部 if-none-match，比较资源内容是否改动 

## 2、webpack和vite的区别

构建速度：
webpack 需要将项目所有的资源，进行静态分析，生成分析依赖图，进行打包。冷启动时间长，热更新的时候需要重新构建依赖图，热更新也慢。
vite 是基于现代浏览器对于原生ES的支持，无需预先打包。冷启动时间短，只更新修改的模块，无需重新构建，且利用浏览对于es的缓存，使得热更新更快。

开发和生产模式：
webpack 在开发和生产环境使用相同的打包机制
vite 开发环境使用原生es，按需编译。生产环境使用Rollup进行打包，生成优化的静态文件

生态：
webpack 插件丰富，可以处理各种资源类型。社区活跃。
vite 生态相对较新，但是发展迅速，插件是基于Rollup。

## 3、commonJs和ES规范的区别？

用法：
commonJs
- 使用require()引入
- 使用exports.module 或者 exports 导出
esm
- 使用import引入
- 使用export导出

执行时机：
commonJs
- 模块加载和执行是同步的。
- require()会阻塞代码执行，直到代码加载完毕
- 模块的执行顺序和代码出现的顺序一致

esm
- 模块的加载和执行是异步的
- import不会阻塞代码的执行，浏览器会在后台加载模块
- 模块的执行顺序取决于模块之间的依赖关系和浏览器的加载策略

动态导入
commonJs
- 支持动态导入，但是是同步的
ems
- 支持动态导入，是异步的，返回一个promise

顶层作用域
commonJS
- 每个模块都有自己的顶层作用域
- 再一个模块中定义的变量，函数等不会污染全局作用域，也不会被其他模块直接访问，除非显式导出
ems
- 顶层作用域是共享的

兼容性
commonJs
- nodejs环境
- 浏览器需要使用webpack等工作进行转换
ems
- js标准模块
- 现代浏览器都支持原生esm

## 4、为什么要使用打包工具
模块化开发，性能优化，多种文件类型处理， 兼容性处理，开发效率提升

## 5、CDN（Content Delivery Network，内容分发网络）是指通过在不同地理位置部署服务器，来更快、更可靠地向用户分发静态和动态网页内容的技术。CDN的作用是：加速网站访问速度，提高用户体验，降低服务器负载，提高内容的可用性和安全性。

## 6、get请求和post请求有什么区别
从字面看get是请求数据，post是发送数据，其实两者都可以请求和发送。
get是通过url传参，参数数量有限，post是通过请求体携带参数，参数相对更多。
部分get请求不会跨域，script的src属性，img的href等

## 7、简单请求与复杂请求
简单请求：
- 使用GET，POST，HEAD三种方法之一，
- 设置的头部信息仅限于Accept，Accept-Language，Content-Language，Content-Type（仅限于application/x-www-form-unlencoded、multipart/form-data、text/plan），
- 请求中任何XMLHttpRequestUpload对象没有注册任何事件监听器，XMLHttpRequestUpload对象可以使用XMLHttpRequest.upload属性访问，
- 请求中没有使用ReadadleStream对象
复杂请求：
- 使用了除GET，POST，HEAD之外的http方法
- 人为设置的头信息超出了简单请求允许的范围
- 像服务器发送了除允许的类型之外的Content-Type，如application/json

## 8、HTTPS的加密原理
首先客户端发送请求到服务器，服务器给客户端颁发证书，且把自己的公钥和证书一起发送给客户端。证书是有CA私钥加密，客户端使用CA的公钥验证，验证成功后，客户端自己生成一个随机数预主密钥，然后用服务端的公钥加密后，发送给服务端，然后客户端和服务端根据预主密钥等条件生产会话秘钥。后续会话都使用会话密钥加密传输
## 9、对称加密

## 11、前端持久化方案
- localStorage
- sessionStorage 当前会话中有效，关闭浏览器数据丢失
- indexedDB 储存大数据，支持事务和异步操作
  ```
  const request = indexedDB.open('myDataBase', 1)
  request.onupgradeneeded = function(event) {
    const db = event.target.result
    db.createObjectStore('myStore', { keyPath: 'id '})
  }
  request.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction('myStore', 'readwrite')
    const store = transaction.objectStore('myStore');
    store.add({ id: 1, name: 'example'})
  }
  ```
- cookies 储存少量数据，用于会话管理和用户跟踪

## 12、css实现图片高度自适应

## 13、flex
- 容器6个属性
  - flex-direction属性决定主轴的方向
  - flex-wrap 是否换行
  - flex-flow 是上面两个的缩写
  - justify-content属性定义了项目在主轴上的对齐方式。
  - align-items属性定义项目在交叉轴上如何对齐。
  - align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
- 项目的6个属性
  - order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
  - flex-grow 放大比例 默认为0，即如果存在剩余空间，也不放大。
    - 如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
  - flex-shrink 缩小比例 默认为1，即如果空间不足，该项目将缩小。
    - 如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小
  - flex-basis 分配多余空间之前，项目占据的主轴空间.
    - 浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
  - flex 上面三个的缩写 默认值为0 1 auto。后两个属性可选。
    - 该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
  - align-self 允许单个项目有与其他项目不一样的对齐方式。可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

## 14、flex: 1
```
flex-grow: 1;    /* 允许元素增长以填充可用空间 */
flex-shrink: 1;  /* 允许元素缩小以适应容器 */
flex-basis: 0%;  /* 元素的初始大小为 0 */
```

## 15、vue虚拟DOM
虚拟DOM实际上一个javaScript对象，用来表示真实DOM的数据结构。但是不会直接与浏览器交互，虚拟DOM的作用主要目的是减少直接操作真实DOM的次数，从而提高性能。
- 工作原理
  - 创建虚拟DOM：当一开始vue组件渲染的时候，Vue会创建一个虚拟DOM树，表示组件的结构个状态
  - 更新虚拟DOM：当组件状态发生变化的时候，Vue会重新生成一个新的虚拟DOM树
  - 比较差异：Vue使用一种差异算法，来比较新旧虚拟DOM树之间的差异。
  - 更新真实DOM：找到差异，计算出最小的DOM操作，并将这些操作应用到真实DOM上

## 16、Vue双向绑定
两种方式：
 - v-model指令，作用表单元素如input, textarea, select
 - 元素通过$emit('input', value)暴露input，然后v-model指令作用与元素上
双向绑定是指数据和视图之间的同步更新。
内部是通过Object.defineProperty 或 Proxy（在 Vue 3 中）来劫持对象属性，并在属性变化的时候通知视图更新

## 17、浏览器渲染过程
- URL解析
  - 确定协议，域名，端口
  - 特殊字符处理
- DNS查询
  - 本地host，是否有对应的域名ip
  - 查找缓存
    - 浏览器缓存
    - 操作系统缓存
    - 路由器缓存
  - DNS查询，向DNS服务器发送请求，获取对应域名的IP地址
- 建立TCP连接
  - 三次握手
    - 浏览器发送SYN包到服务器
    - 服务器回复SYN+ACK包
    - 浏览器发送ACK包，连接建立
- 发送HTTP请求
- 服务器处理请求
- 接收响应
- 渲染页面
  - 解析HTML 构建DOM树
  - 加载资源 link，script，img等标签资源
  - 解析css 构建CSSOM树
  - 构建渲染树，结合DOM和CSSOM，生成渲染树
  - 布局：计算每个节点的几何信息（位置，大小）
  - 绘制：将渲染树绘制到屏幕上
- 执行javascript
  - 解析和执行javascript代码，可能会修改DOM或者CSSOM，引起重新布局和绘制
- 页面交互
- 关闭连接

## 18、手写防抖和节流
```javascript
// 防抖 取最后一次
const debounce = () => {
  let timer = null
  return function() {
    if(timer) { clearTimeout(timer) }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

// 节流 取第一次
const throttle = () => {
  let timer = null
  return function() {
    if(timer) { return }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}
```
## 19、vue-lazyloader原理
## 20、es5实现es6的class
## 21、浏览器的事件循环和 nodejs 事件循环的区别
## 22、express 的设计原理
## 23、vue-router原理
  - history 底层事件pushState popState
  - hash 底层事件hashchange
## 24、手写promise
## 25、手写promise.all
```javascript
const PromiseAll = async(array) => {

}
```
## 26、手写Vue的mixin方法
## 27、怎么判断一个点是否在圆形内、正方形内
圆形
```javascript 根据勾股定理，a**2 + b**2 = c**2
const isInCircle = (x, y, circle) => {
  // 解构circle对象，获取圆心的x坐标、y坐标和半径
  const { x: cx, y: cy, r } = circle
  // 计算点(x, y)到圆心的距离
  const distance = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
  // 如果距离小于或等于半径，则点在圆内
  return distance <= r
}
```
正方形
```javascript
const isInSquare = (x, y, square) => {
  const { x: sx, y: sy, w, h } = square
  return x >= sx && x <= sx + w && y >= sy && y <= sy + h
}
```
## 28、css 选择器的优先级
!important > 行内样式 > id选择器 > 类选择器 > 标签选择器 > 通配符选择器 > 继承 > 浏览器默认样式
## 29、实现一个发布订阅
```javascript
class PubSub {
  constructor() {
    this.events = new Map()
    this.idCounts = 0
  }

  subscribe(eventName, callback) {
    if(typeof callback !== 'function') {
      throw new Error('callback must be a function')
    }

    const id = this.idCounts++
    if( !this.events.has(eventName) ) {
      this.events.set(eventName, new Map())
    }

    this.events.get(eventName).set(id, callback)
    return {
      unsubscribe: () => this._unsubscribe(eventName, id)
    }
  }
  
  publish(eventName, data) {
    const subscription = thus.events.get(eventName);
    if(subscription) {
      subscription.forEach((callback, id) => {
        try {
          callback(data)
        } catch(error) {
          console.error(`Error in callback ${id} for event ${eventName}:`, error)
        }
      })
    }
  }

  subscribeOnce(eventName, callback) {
    const subscription = this.subscribe(eventName, (data) => {
      callback(data)
      subscription.unsubscribe()
    })
    return subscription
  }

  _unsubscribe(eventName, id) {
    const subscription = this.events.get(eventName)
    if(subscription) {
      subscription.delete(id)
      if(subscription.size === 0) {
        this.events.delete(eventName)
      }
    }
  }

  clearAll() {
    this.events.clear()
  }

  getSubscriptionCount(eventName) {
    if(eventName) {
      return this.events.has(eventName) ? this.events.get(eventName).size : 0
    }
    return Array.from(this.events.values()).reduce((acc, curr) => acc + curr.size, 0)
  }
}

```
## 30、手写bind
```javascript
Function.prototype.myBind = function(context, ...args) {
  const originalFunc = this

  return function(...newArgs) {
    const combinedArgs = args.concat(newArgs)
    const result = originalFunc.apply(context, combinedArgs)
    return result
  }
}
```
## 31、手写call
```javascript
Function.prototype.myCall = function(context, ...args) {
  // 1. 处理 undefined 和 null 的上下文
  context = context || window; // 浏览器环境用 window，Node.js 需改为 globalThis
  // 2. 创建唯一键避免属性覆盖
  const fnKey = Symbol('__tempFn__');
  // 3. 将当前函数绑定到上下文
  context[fnKey] = this; // this 指向原函数
  // 4. 执行函数并保存结果
  const result = context[fnKey](...args);
  // 5. 清理临时属性
  delete context[fnKey];
  // 6. 返回执行结果
  return result;
};
```
## 32、手写apply
```javascript
Function.prototype.myApply = function(context, argsArray) {
  // 类型安全检查
  if (typeof this !== 'function') {
    throw new TypeError('调用者必须是函数');
  }
  // 处理上下文
  context = context != null ? Object(context) : window;
  // 创建唯一键
  const fnKey = Symbol('fn');
  // 绑定函数
  context[fnKey] = this;
  // 参数处理
  let result;
  if (!argsArray) {
    result = context[fnKey]();
  } else {
    if (!Array.isArray(argsArray) && !isArrayLike(argsArray)) {
      throw new TypeError('第二个参数必须为数组或类数组');
    }
    result = context[fnKey](...Array.from(argsArray));
  }
  // 清理
  delete context[fnKey];
  return result;
};
```
## 33、手写new **关键字**
```javascript
const newInstance = (fn, ...args) => {
  const obj = Object.create(fn.prototype) // 创建一个新对象，继承构造函数的原型
  const res = fn.apply(obj, args) // 将构造函数的this指向新创建的对象，并传入参数
  return res instanceof Object ? res : obj // 如果构造函数返回的是一个对象，则返回该对象，否则返回新创建的对象
}
```
## 34、react-fiber
react15 渲染是同步不可中断的
react16 渲染是异步的可中断的
React Fiber 是 React 16 引入的核心架构革新，旨在解决旧版本（如 React 15）因同步渲染机制导致的性能瓶颈和交互卡顿问题。在 React 15 中，协调器（Reconciler）通过递归方式同步构建和对比虚拟 DOM 树，若遇到复杂组件或大规模 DOM 更新，JS 线程会长时间阻塞主线程，导致 GUI 渲染线程无法及时响应用户操作（如点击、滚动），造成界面卡顿甚至丢帧，严重影响用户体验。

Fiber 架构通过三大核心改进优化了这一过程：

任务切片与可中断调度：将虚拟 DOM 拆解为独立的 Fiber 节点链表结构，代替原有树形递归遍历。每个 Fiber 节点对应一个可中断的异步任务单元，利用浏览器空闲时段（通过调度器模拟 requestIdleCallback）分片执行，避免长时间占用主线程。

优先级调度：内置调度器（Scheduler）动态管理任务优先级（如用户交互触发的更新优先于数据请求），确保高优先级任务快速响应，提升交互流畅度。

增量渲染与双缓存：协调器（Reconciler）增量构建 Fiber 树并标记变更，完成后由渲染器（Renderer）按需批量更新真实 DOM，减少布局计算和重绘次数。同时采用双缓存机制，内存中维护新旧两棵 Fiber 树，实现无缝切换与回滚，支持并发模式下的状态一致性。
通过上述机制，Fiber 架构使 React 能够实现异步可中断的渲染流程，在复杂场景下保持界面高响应性，兼顾性能与用户体验，为后续并发模式（Concurrent Mode）和渐进式渲染奠定了基石。

## 35、深度优先遍历和广度优先遍历

## 36、setTimeout 模拟setInterval
```javascript
const setInter = (fn, time) => {
  let running = true
  let timer = null
  const loop = () => {
    if(timer) { clearTimeout(timer) }
    if(!running) return
    fn()
    timer = setTimeout(loop, time)
  }
  loop()
  return {
    stop: () => {
      running = false
      clearTimeout(timer)
    }
  }
}
```
## 38、判断数据类型
```javascript
typeof 可以判断number, string, boolean, undefined, symbol, function, object
instanceof 可以判断对象类型
Object.prototype.toString.call(value).slice(8, -1) 可以判断所有类型
const getType = (value) => {
  return Object.prototype.toString.call(value).slice(8, -1)
}
```
## 39、实现一个深拷贝
```javascript
const deepClone = (obj) => {
  if(typeof obj !== 'object' || obj === null) {
    return obj
  }

  const result = Array.isArray(obj) ? [] : {}
  for(const key in obj) {
    if(obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }
  return result
}
```
## 40、http2和http1的区别
http1 是请求和响应都是文本格式传输，且是顺序处理，每个连接只能处理一个请求和响应，虽然可以使用keep-alive来复用连接，但是不能解决队头阻塞的问题。每次请求和响应都是携带完整的HTTP头部，重复传输相同信息，如User-Agent,cookie等，浪费带宽。
http2 数据是二进制传输，解析效率更高，单个TCP连接可以并发处理多个请求和响应，使用HPACK压缩头部，减少带宽占用。

## 41、xss攻击
xss攻击是跨站脚本攻击，攻击者通过在网页中注入恶意脚本，在用户浏览网页时执行恶意脚本，从而达到攻击目的。

## 42、csrf攻击
csrf攻击是跨站请求伪造，攻击者通过伪造用户请求，向目标网站发送恶意请求，从而达到攻击目的。

## 43、CSRF攻击的防御
- 验证码
- 使用CSRF Token
- 检查Referer
  
## 44、vue的响应式原理
vue2 使用Object.defineProperty 劫持对象属性，当属性发生变化时，触发对应的回调函数。但是不能监听数组的变化，需要使用重写数组的方法来监听数组的变化。还有不能监听对象的添加和删除。嵌套数组和对象需要深度遍历。
vue3 使用Proxy 劫持对象，当对象的属性发生变化时，触发对应的回调函数。
## 45、vue3和vue2的区别
响应式原理：
- vue2 使用Object.defineProperty劫持对象属性，无法检测新增/删除属性，需要$set/$delete
- vue3 使用Proxy代理对象，支持更多数据类型的响应式追踪（如Map/Set等）

组合式API：
- vue2 使用选项式API（data/methods等选项组织代码）
- vue3 新增组合式API（setup + 响应式API），支持更好的逻辑复用和代码组织

性能优化：
- vue3 虚拟DOM算法优化（编译器生成带更新标记的虚拟DOM）
- vue3 打包体积更小（更好的tree-shaking支持）
- vue3 渲染速度提升（静态节点提升、事件缓存等）

生命周期：
- vue3 新增setup生命周期（组合式API入口）
- 重命名beforeDestroy/beforeUnmount，destroyed/unmounted

Fragment特性：
- vue2 模板必须单根节点
- vue3 支持多根节点模板（Fragment特性）

TypeScript支持：
- vue3 使用TypeScript重写，提供更好的类型推导
- vue3 组件选项支持类型声明（defineComponent）

全局API：
- vue2 全局API挂载Vue对象（Vue.use/Vue.component）
- vue3 改为应用实例API（createApp().use()）

## 46、2024年前端面试高频题：React Server Components 的核心优势
1. **服务端渲染优化**：在服务端直接生成静态内容，减少客户端JS包体积
2. **自动代码分割**：根据组件使用情况自动拆分代码，提升首屏加载速度
3. **数据获取优化**：服务端直接访问数据库/API，避免客户端多次请求
4. **SEO友好**：服务端生成完整HTML内容，更利于搜索引擎爬取

## 47、2025年前端趋势预测题：WebAssembly 在前端的应用场景
1. **高性能计算**：图像/视频编辑、3D渲染等CPU密集型任务
2. **跨语言开发**：支持Rust/C++等语言编写前端核心逻辑
3. **浏览器插件**：实现更复杂的浏览器扩展功能
4. **加密算法**：安全执行密码学相关操作（如区块链应用）

## 48、2024年框架特性题：Vue 3.4 的响应式优化
1. **更快的依赖追踪**：使用位运算优化依赖收集速度
2. **内存占用减少**：改进的proxy handlers减少内存消耗
3. **批量更新优化**：自动合并多个状态变更的触发
4. **SSR hydration**：改进服务端渲染的客户端激活过程

## 49、2025年工程化题：前端Monorepo的最佳实践
1. **工作空间管理**：使用pnpm workspace或npm 7+ workspaces
2. **依赖共享**：通过hoisting减少重复安装
3. **构建优化**：增量构建和缓存策略（如Turborepo）
4. **版本管理**：采用changesets进行多包版本控制

## 50、2024年性能优化题：首屏加载FCP优化方案
1. **关键CSS内联**：提取首屏关键样式直接嵌入HTML
2. **字体加载策略**：使用font-display: swap避免布局偏移
3. **资源预加载**：合理使用preload/prefetch指令
4. **代码分割**：基于路由的dynamic import拆分代码

## 51、voidzero框架,基于RUST语言开发
主要是一次构建AST语法树，统一语法树。

## 52、vue2和vue3的diff算法的区别

### Vue2 双端Diff算法
1. **遍历方式**：采用双端比较（头头、尾尾、头尾、尾头）
2. **节点复用**：通过4个指针交叉比较旧新子节点数组
3. **移动策略**：优先处理相同节点，最后处理新增/删除节点
4. **时间复杂度**：O(n) 但存在较多冗余比较

### Vue3 快速Diff算法
1. **预处理阶段**：
   - 前序相同节点直接复用
   - 后序相同节点直接复用
2. **核心Diff**：
   - 构建key-index映射表（keyed fragments）
   - 寻找最长递增子序列（LIS）作为稳定锚点
3. **移动策略**：
   - 仅处理非稳定序列节点
   - 最小化DOM移动操作
4. **时间复杂度**：O(n) + O(k)（k为最长递增子序列长度）

### 关键差异对比
| 特性                | Vue2                      | Vue3                      |
|--------------------|--------------------------|--------------------------|
| 算法类型            | 双端比较                  | 快速Diff + LIS优化        |
| key的作用           | 辅助节点匹配              | 关键索引依据              |
| 移动优化            | 简单位置交换              | 最小化DOM操作             |
| 静态节点处理        | 全量比较                  | 静态提升跳过比较          |
| 动态列表性能        | 平均O(n)                 | 接近O(1)稳定序列场景      |
| 内存占用            | 较高（维护4个指针）        | 较低（使用位运算标记）     |
vue2 使用双端比较算法，先比较头尾节点，然后比较剩余节点。

## 53、keep-alive常用的属性和实现原理

### 常用属性
| 属性名     | 类型               | 说明                                                                 |
|----------|-------------------|--------------------------------------------------------------------|
| include  | String/RegExp/Array | 匹配名称的组件会被缓存（基于组件name选项）                                   |
| exclude  | String/RegExp/Array | 匹配名称的组件不会被缓存                                                   |
| max      | Number             | 最多可以缓存多少组件实例（LRU缓存策略）                                       |

```javascript
<keep-alive :include="['Home','About']" :max="10">
  <router-view />
</keep-alive>
```

### 实现原理
1. **缓存存储结构**  
```javascript
const cache: Record<string, VNode> = {}
const keys: string[] = []
```

2. **缓存策略**  
- 使用LRU（最近最少使用）算法管理缓存
- 当缓存实例数量超过max时，销毁最久未被访问的实例

3. **组件标识**  
- 使用组件name选项 + 特殊标识（如tag名）作为缓存key
- 没有name时自动生成唯一ID

4. **生命周期管理**  
- 缓存组件时触发deactivated钩子
- 激活缓存时触发activated钩子
- 使用VNode的data.keepAlive属性标记缓存状态

5. **渲染机制**  
- 首次渲染时创建真实DOM并缓存VNode
- 后续渲染时直接复用缓存的VNode
- 使用虚拟DOM的diff算法避免重复渲染

## 54、nextTick的原理
Vue的nextTick实现主要基于JavaScript事件循环机制，核心原理如下：
### 关键实现机制
1. **微任务优先**  
- 优先使用Promise.then()（现代浏览器）
- 回退方案：MutationObserver → setImmediate → setTimeout

2. **异步更新队列**  
```javascript
const callbacks = [] // 回调队列
let pending = false // 批量处理标志

function flushCallbacks() {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```

3. **执行优先级**  
- 数据变化 → 触发Watcher → 将更新推入队列
- 同一事件循环内的数据变化会被批量处理
- DOM更新完成后执行nextTick回调

### 核心特点
- **批处理优化**：同一tick内的多次nextTick调用会合并执行
- **环境适配**：自动选择最优的微任务实现方式
- **错误处理**：在微任务中捕获异常并通过console.error输出

### 使用示例
```javascript
// Promise风格
this.$nextTick().then(() => {
  // DOM更新后执行
})

// 传统回调风格
this.$nextTick(() => {
  // 可访问更新后的DOM
})
```
## 55、vue data为什么是函数

### 核心原因
**组件复用时的数据隔离**：当组件被复用时，每个实例需要维护独立的数据副本。如果使用对象形式，所有组件实例将共享同一个数据对象，导致状态污染。

### 源码实现解析
```javascript
function mergeOptions() {
  // 组件初始化时会执行data函数获取独立数据对象
  const data = options.data
  options.data = typeof data === 'function' 
    ? getData(data, vm)
    : data || {}
}
```

### 关键对比
```javascript
// ❌ 错误写法（对象形式）
data: { count: 0 } // 所有实例共享同一个count

// ✅ 正确写法（函数返回对象）
data() {
  return { 
    count: 0 // 每个实例有独立count
  }
}
```

### 特殊场景说明
1. **根实例例外**：new Vue() 根实例可以直接使用对象形式，因为不会被复用
2. **函数调用时机**：在组件初始化时被调用，返回新数据对象
3. **响应式处理**：返回的对象会被Vue进行深度响应式处理

### 设计原则体现
- **组件独立性**：每个组件实例应有独立状态空间
- **可预测性**：避免隐式共享状态带来的副作用
- **生命周期管理**：通过函数调用时机控制数据初始化

## 56、继承
### 原型链继承
```javascript
function Parent() {
  this.name = 'parent';
  this.colors = ['red', 'blue'];
}

Parent.prototype.say = function() {
  console.log('hello');
}

function Child() {}
Child.prototype = Object.create(Parent.prototype); // 直接使用父类实例作为子类原型
Child.prototype.constructor = Child;
```
### 组合继承
```javascript
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
}

Parent.prototype.say = function() {
  console.log('hello');
}

function Child(name, age) {
  Parent.call(this, name); // 第一次调用父类构造函数
  this.age = age;
}

Child.prototype = new Parent(); // 第二次调用父类构造函数
Child.prototype.constructor = Child;
```
### 寄生组合继承
```javascript 
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
}

Parent.prototype.say = function() {
  console.log('hello');
}

function Child(name, age) {
  Parent.call(this, name); // 继承属性
  this.age = age;
}

// 继承原型
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

// 子类可以添加自己的方法
Child.prototype.play = function() {
  console.log('playing');
};
```

### 类继承
```javascript
class Parent {
  constructor(name) {
    this.name = name;
    this.colors = ['red', 'blue'];
  }
  
  say() {
    console.log('hello');
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name); // 必须先调用super
    this.age = age;
  }
  
  play() {
    console.log('playing');
  }
}
```
## 57、浏览器渲染的线程都有哪些
- 主线程
  - 负责解析HTML、CSS、JavaScript
- 合成线程
  - 负责将页面分成多个图层，进行图层合成
- 光栅化线程
  - 负责将图层转换为位图，通常由GPU加速
- JavaScript引擎线程
  - 负责解析和执行JavaScript代码
- 事件处理线程
  - 负责处理事件循环，将事件分发给主线程或其他线程处理。
- 定时器线程
  - 负责处理定时器，如setTimeout、setInterval
- 网络请求线程
  - 负责处理网络请求，如XMLHttpRequest、fetch
- WebWorker线程
  -允许在后台运行JavaScript代码，不阻塞主线程。
- serviceWorker线程
  - 用于实现离线缓存、推送通知等功能，独立于主线程运行。
- GPU线程
  - 负责处理GPU相关任务，如3D渲染、视频解码等。
## 58、避免react重复渲染的手段
- 使用React.memo() 包裹组件，缓存组件渲染结果
- 使用useMemo() 缓存复杂计算结果
- 使用useCallback() 缓存函数引用
- 使用useRef() 创建不变的引用对象
- 使用React.Fragment 包裹组件，避免额外DOM节点
- 使用React.StrictMode 包裹组件，检查潜在问题
## 59、单例模式
``` javascript
//全局变量
let singleInstance
function Person() {
  if(!singleInstance) {
    singleInstance = this
  }
  return singleInstance
}
const p1 = new Person()
const p2 = new Person()
console.log(p1 === p2) // true
```
``` javascript
// 静态方法
function Person() {}
Person.getInstance = function() {
  if(!Person.instance) {
    Person.instance = new Person()
  }
  return Person.instance
}
const p1 = Person.getInstance()
const p2 = Person.getInstance()
console.log(p1 === p2) // true
```
``` javascript
// 闭包
const Singleton = (function() {
  let instance = null
  function createInstance() {
    this.data = '111'
  }
  return function() {
    if(!instance) {
      instance = createInstance()
    }
    return instance
  }
})()
const p1 = Singleton()
const p2 = Singleton()
console.log(p1 === p2) // true
```
## 60、Promise
Promise.all() // 并发执行多个Promise，返回一个Promise，所有Promise都成功时返回成功结果，有一个失败则返回失败结果
Promise.allSettled() // 并发执行多个Promise，返回一个Promise，所有Promise都成功或失败时返回成功或失败结果
Promise.any() // 并发执行多个Promise，返回一个Promise，只要有一个Promise成功则返回成功结果，所有Promise都失败则返回失败结果
Promise.race() // 并发执行多个Promise，返回一个Promise，只要有一个Promise成功或失败则返回成功或失败结果
Promise.resolve() // 返回一个成功的Promise
Promise.reject() // 返回一个失败的Promise

## 61、常见的性能优化的手段有哪些
代码压缩，代码分割，图片压缩，图片懒加载，路由懒加载，SSR/SSG，Web Worker，防抖节流，Web Worker处理密集计算，避免内存泄漏，合理的组件拆分，响应式数据优化，使用SSR/SSG，ESBuild/SWC加速构建，并行构建，增量构建，性能指标监控，错误监控，用户行为分析，性能预算，CI/CD中的性能检测，A/B测试验证
### 1. 网络优化
1. **资源压缩与合并**
   - 代码压缩(JS/CSS/HTML)
   - 图片压缩和合适的格式选择(WebP/AVIF)
   - 合理的文件合并策略

2. **缓存策略**
   - 浏览器缓存(Cache-Control)
   - Service Worker缓存
   - CDN缓存

3. **按需加载**
   - 路由懒加载
   - 组件动态导入
   - 图片懒加载

### 2. 渲染优化
1. **关键渲染路径优化**
   - CSS放头部，JS放底部
   - 内联关键CSS
   - 异步加载非关键资源

2. **减少重排重绘**
   - 使用transform替代位置改变
   - 批量DOM操作
   - 合理使用will-change

3. **虚拟列表**
   - 长列表分页或虚拟滚动
   - 避免一次性渲染大量DOM

### 3. 代码层面优化
1. **JavaScript优化**
   - 防抖节流
   - Web Worker处理密集计算
   - 避免内存泄漏

2. **框架层优化**
   - 合理的组件拆分
   - 响应式数据优化
   - 使用SSR/SSG

### 4. 构建优化
1. **打包优化**
   - Tree Shaking
   - 代码分割(Code Splitting)
   - 压缩混淆

2. **现代化构建**
   - ESBuild/SWC加速构建
   - 并行构建
   - 增量构建

### 5. 监控与分析
1. **性能指标监控**
   - FCP/LCP/TTI等指标 // 首次内容绘制/最大内容绘制/可交互时间
   - 错误监控
   - 用户行为分析

2. **持续优化**
   - 性能预算
   - CI/CD中的性能检测
   - A/B测试验证

