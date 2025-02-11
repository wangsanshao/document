# document

1、浏览器强缓存和协商缓存

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

2、webpack和vite的区别

构建速度：
webpack 需要将项目所有的资源，进行静态分析，生成分析依赖图，进行打包。冷启动时间长，热更新的时候需要重新构建依赖图，热更新也慢。
vite 是基于现代浏览器对于原生ES的支持，无需预先打包。冷启动时间短，只更新修改的模块，无需重新构建，且利用浏览对于es的缓存，使得热更新更快。

开发和生产模式：
webpack 在开发和生产环境使用相同的打包机制
vite 开发环境使用原生es，按需编译。生产环境使用Rollup进行打包，生成优化的静态文件

生态：
webpack 插件丰富，可以处理各种资源类型。社区活跃。
vite 生态相对较新，但是发展迅速，插件是基于Rollup。

3、commonJs和ES规范的区别？

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
4、为什么要使用打包工具
模块化开发，性能优化，多种文件类型处理， 兼容性处理，开发效率提升
5、CDN（Content Delivery Network，内容分发网络）是指通过在不同地理位置部署服务器，来更快、更可靠地向用户分发静态和动态网页内容的技术。CDN的作用是：加速网站访问速度，提高用户体验，降低服务器负载，提高内容的可用性和安全性。
6、get请求和post请求有什么区别
从字面看get是请求数据，post是发送数据，其实两者都可以请求和发送。
get是通过url传参，参数数量有限，post是通过请求体携带参数，参数相对更多。
部分get请求不会跨域，script的src属性，img的href等
7、简单请求与复杂请求
简单请求：
- 使用GET，POST，HEAD三种方法之一，
- 设置的头部信息仅限于Accept，Accept-Language，Content-Language，Content-Type（仅限于application/x-www-form-unlencoded、multipart/form-data、text/plan），
- 请求中任何XMLHttpRequestUpload对象没有注册任何事件监听器，XMLHttpRequestUpload对象可以使用XMLHttpRequest.upload属性访问，
- 请求中没有使用ReadadleStream对象
复杂请求：
- 使用了除GET，POST，HEAD之外的http方法
- 人为设置的头信息超出了简单请求允许的范围
- 像服务器发送了除允许的类型之外的Content-Type，如application/json
8、HTTPS的加密原理
9、对称加密
11、前端持久化方案
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
12、css实现图片高度自适应
13、flex
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
14、flex: 1
```
flex-grow: 1;    /* 允许元素增长以填充可用空间 */
flex-shrink: 1;  /* 允许元素缩小以适应容器 */
flex-basis: 0%;  /* 元素的初始大小为 0 */
```
15、vue虚拟DOM
虚拟DOM实际上一个javaScript对象，用来表示真实DOM的数据结构。但是不会直接与浏览器交互，虚拟DOM的作用主要目的是减少直接操作真实DOM的次数，从而提高性能。
- 工作原理
  - 创建虚拟DOM：当一开始vue组件渲染的时候，Vue会创建一个虚拟DOM树，表示组件的结构个状态
  - 更新虚拟DOM：当组件状态发生变化的时候，Vue会重新生成一个新的虚拟DOM树
  - 比较差异：Vue使用一种差异算法，来比较新旧虚拟DOM树之间的差异。
  - 更新真实DOM：找到差异，计算出最小的DOM操作，并将这些操作应用到真实DOM上
16、Vue双向绑定
两种方式：
 - v-model指令，作用表单元素如input, textarea, select
 - 元素通过$emit('input', value)暴露input，然后v-model指令作用与元素上
双向绑定是指数据和视图之间的同步更新。
内部是通过Object.defineProperty 或 Proxy（在 Vue 3 中）来劫持对象属性，并在属性变化的时候通知视图更新
17、浏览器渲染过程
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
18、手写防抖和节流
```
const debounce = () => {

}

const throttle = () => {

}
```
19、vue-lazyloader原理
20、es5实现es6的class
21、浏览器的事件循环和 nodejs 事件循环的区别
22、express 的设计原理
23、vue-router原理
24、手写promise
25、手写promise.all
26、手写Vue的mixin方法
27、怎么判断一个点是否在圆形内、正方形内
28、css 选择器的优先级
29、实现一个发布订阅
30、手写bind
31、手写call
32、手写apply
33、手写new 关键字
34、react-fiber
35、
