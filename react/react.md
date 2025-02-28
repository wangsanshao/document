## React

### React 版本历史
#### React 19 (2023.10)
- 引入了新的并发渲染机制，提高了应用程序的响应速度和性能
- 提供了更好的服务器端渲染支持，包括对流式服务器端渲染的支持
- 引入了新的API，例如useId和useSyncExternalStore，用于简化状态管理和数据同步
- 改进了错误边界处理，提供了更好的错误报告和调试体验
- 优化了React DevTools，提供了更好的开发体验

#### React 18 (2022.3)
- 新的并发渲染机制(Concurrent Rendering)
- 自动批处理(Automatic Batching)
- 新的 Suspense SSR 架构
- 新的客户端和服务端渲染 APIs
  - createRoot 作用是创建一个根节点，用于渲染React应用
  - hydrateRoot 作用是水合（hydrate）一个已经存在的DOM，使其成为React应用的一部分
  - startTransition 作用是开始一个过渡，用于优化性能
  - useTransition 作用是用于管理过渡状态
  - useDeferredValue 作用是用于延迟更新，以提高性能
- [React 18 发布公告](https://react.dev/blog/2022/03/29/react-v18)

#### React 17 (2020.10)
- 新的 JSX 转换机制
- 事件委托机制改变
- 去除事件池
- 更好的支持渐进式升级
- [React 17 发布公告](https://legacy.reactjs.org/blog/2020/10/20/react-v17.html)

#### React 16 (2017.9)
- 完全重写的核心架构 (Fiber)
- Error Boundaries 错误边界
- Portals 传送门
- 支持自定义 DOM 属性
- 改进的服务端渲染
- Fragments 片段
- Context API
- Hooks (16.8)
- Suspense (16.6)
- [React 16 发布公告](https://legacy.reactjs.org/blog/2017/09/26/react-v16.0.html)

#### React 15 (2016.4)
- 支持 SVG 属性
- 改进了虚拟 DOM 差异对比算法
- 更新了 React Tools
- [React 15 发布公告](https://legacy.reactjs.org/blog/2016/04/07/react-v15.html)

#### React 14 (2015.10)
- 将 React 拆分为 react 和 react-dom
- 改进了 refs
- 简化了 React 开发工具
- [React 14 发布公告](https://legacy.reactjs.org/blog/2015/10/07/react-v0.14.html)

#### React 13 (2015.3)
- ES6 Classes 支持
- 改进了 React Tools
- 添加了实验性的 API
- [React 13 发布公告](https://legacy.reactjs.org/blog/2015/03/10/react-v0.13.html)
