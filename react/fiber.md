## fiber

fiber 是 react 16 引入的一种新的调度算法，用于优化 react 的渲染过程。

### fiber解决了哪些问题

#### 性能问题
在react15中，当需要渲染大量的DOM的时候，由于是同步渲染，就会导致整个渲染过程阻塞主线程，使得用户界面得不到响应，甚至还会出现丢帧的现象。当状态更新导致重新渲染时，React需要重新构建整个虚拟DOM树，并与之前的虚拟DOM树进行比较以找出差异（diff），然后将这些差异应用到实际的DOM上，如果这个过程非常耗时，那么在渲染期间用户将无法与应用交互。

#### 体验问题
用户期望现在web应用能够快速响应他们的操作，然后，在旧版React中，如果某个部分正在重新渲染，那么这段时间内用户无法得到任何反馈，这降低了用户体验，为了应对这些问题，React16引入了Fiber架构,他改变了React的核心算法。

### react15 性能差的原因

#### 浏览器绘制原理：

浏览器进程是多线程的，主要进程
- 主进程
- 渲染进程
- 插件进程
- GPU进程
本次我们主要关注渲染进程，主要是页面渲染，HTML解析，CSS解析和JS执行的地方。


在渲染进程中，有两个核心线程：

- GUI线程： 负责浏览器界面的渲染，包括解析HTML，CSS，执行JS，布局和绘制等。
- JS线程： 包含我们编写的JS代码解析引擎，JS引擎和GUI引擎是互斥的，js可能会更改HTML或CSS样式，如果同时执行会导致页面渲染混乱，因此当JS引擎执行时，GUI渲染线程会被挂起，直到JS引擎执行完毕。

我们平时看到的动画和视频的本质是快速切换图片来欺骗人眼，让人感觉是连续的动画。每秒切的图片越多，动画越流畅，通常60帧每秒（FPS）就能让人感觉流畅，因此，chrome浏览器需要在16ms内完成渲染任务，以免掉帧，如果JS执行时间过长，用户会感到明显的卡顿，很影响用户体验。


### React15 架构问题

React15 的架构主要分为协调器（Reconciler）和渲染器（Renderer）

- Reconciler(协调器)： VDOM、diff,协调器主要负责根据自变量变化计算出UI变化
- Renderer(渲染器)： 负责将协调器计算出的UI变化应用到实际的DOM上。也就是将UI变化渲染到宿主环境中。

Reconciler采用地用的方式创建，更新VDOM，递归一旦开始则不可中断和停止，如果执行比较复杂的深层次的VDOM递归运算，则会导致Reconciler长时间占用JS线程，导致无法进行Renderer渲染，从而导致页面卡顿。



### 那么fiber是如何解决这个问题的
日常生活中一个比较大的任务，一次性处理起来耗时很长，需要我们去优化。既然一次性处理起来比耗时很长，那么能不能分多次处理，可不可以只在浏览器空闲的时候处理，繁忙的时候先暂停处理。
#### 任务大的问题
日常开发中遇到的大任务，比如大文件上传，我们用到的是切片思想，将大任务切成一个个小任务，然后按照一定顺序依次执行，这样我们就能减少大任务的执行时间，让浏览器有 breathing time，让用户有更好的体验。

类比到fiber中，VDOM就是一个大任务，将VDOM切成一个个小任务，也就是fiber节点，fiber节点组成一个fiber树

#### 递归，可中断的问题
之前的diff是递归的，不可中断的，我们该怎么做到中断

以前的VDOM是一个树结构想要遍历只能采取递归的方式，我们要舍弃递归只能把树结构转换成另一种数据结构，react采用了链表把每个fiber关联起来，然后进行遍历，然后中断的时候记录下来链表当前的指针，回复是可以继续执行。


#### 调度的问题

解决了任务大，递归，那么我们怎么才能在浏览器空闲的时候去调用呢？

我们来看看一个新的函数requestIdleCallback，这个函数会在浏览器空闲的时候执行回调，我们可以在这个回调中执行一些任务，这样就不会阻塞主线程，也不会影响页面的渲染。

但是由于这个api的兼容性问题
- 有的浏览器不支持
- 这个方法任务执行的优先级无法自定义。

react团队自己实现了一个requestIdleCallback，也就是我们后面要说的scheduler（调度器）。

#### fiber架构

- Scheduler（调度器）： 时间切片，调度任务优先级
- Reconciler（协调器）：diff过程，协调器主要根据自变量变化计算出UI的变化
- Renderer（渲染器）： 负责将协调器计算出的UI变化应用到实际的DOM上。也就是将UI变化渲染到宿主环境中。

### fiberNode 结构

```js
function Counter() {
  const [count, setCount] = useState(0);
  return <div onClick={() => setCount(count + 1)}>Count:{count}</div>;
}

// 简单的vdom结构

{
  type: 'div',
  props: {
    children: [
      {
        type: 'text',
        props: {
          nodeValue: 'Count:',
          children: []
        }
      },
      {
        type: 'text',
        props: {
          nodeValue: '1',
          children: []
        }
      }
    ]
  }
}
```

上面是之前的vdom结构，我们来看看fiber的结构

```js
const fiber = {
  type: 'div',
  props: {
    children: []
  }
}

const fiber = {
  type: 'text',
  props: {
    nodeValue: 'Count:',
    children: []
  }
}

const fiber = {
  type: 'text',
  props: {
    nodeValue: '1',
    children: []
  }
}
``` 

上面就是三个fiber节点，我们需要将他们关联起来，我们需要通过链表的方式将他们关联

- 父节点通过children指向子节点
- 子节点通过sibling指向兄弟节点
- 子节点通过return指向父节点

```js
const fiber = {
  type: 'div',
  props: {
    children: fiber1
  }
}

const fiber1 = {
  type: 'text',
  props: {
    nodeValue: 'Count:',
    children: null
  },
  sibling: fiber2,
  return: fiber
}

const fiber2 = {
  type: 'text',
  props: {
    nodeValue: '1',
    children: null
  },
  sibling: null,
  return: fiber
}
```

上面就是我们得到的一个fiber的基本结构

下面是源码中的fiber结构

```js
// react/packages/react-reconciler/src/ReactInternalTypes.js
// Fiber是一个需要完成或已经完成的组件工作单元。每个组件可以有多个Fiber。
export type Fiber = {
  // 以下字段在概念上是Instance的成员。这曾经被拆分成一个单独的类型
  // 并与其他Fiber字段相交，但由于Flow的交集bug，我们将它们合并成
  // 一个单一类型。

  // Instance在组件的所有版本之间共享。我们可以轻松地将其拆分为
  // 一个单独的对象，以避免在树的备用版本中进行大量复制。
  // 我们现在将其放在一个单一对象上，以最小化初始渲染期间创建的对象数量。

  // 标识fiber类型的标签
  tag: WorkTag,

  // 此子节点的唯一标识符
  key: null | string,

  // element.type的值，用于在协调此子节点期间保持标识
  elementType: any,

  // 与此fiber关联的已解析的函数/类
  type: any,

  // 与此fiber关联的本地状态
  stateNode: any,

  // 概念别名
  // parent : Instance -> return 父节点与return fiber相同，
  // 因为我们已经合并了fiber和instance

  // 以下字段属于Fiber

  // 处理完当前fiber后要返回的Fiber
  // 这实际上是父节点，但可能有多个父节点（两个）
  // 所以这只是我们当前正在处理的内容的父节点
  // 在概念上，它与堆栈帧的返回地址相同
  return: Fiber | null,

  // 单向链表树结构
  child: Fiber | null,
  sibling: Fiber | null,
  index: number,

  // 最后用于附加此节点的ref
  // 我避免为prod添加owner字段，而是将其建模为函数
  ref:
    | null
    | (((handle: mixed) => void) & {_stringRef: ?string, ...})
    | RefObject,

  refCleanup: null | (() => void),

  // 输入是进入处理此fiber的数据。参数。Props。
  pendingProps: any, // 一旦我们重载标签，此类型将更具体
  memoizedProps: any, // 用于创建输出的props

  // 状态更新和回调的队列
  updateQueue: mixed,

  // 用于创建输出的状态
  memoizedState: any,

  // 此fiber的依赖项（上下文，事件），如果有的话
  dependencies: Dependencies | null,

  // 描述fiber及其子树属性的位字段。例如
  // ConcurrentMode标志表示子树是否应该默认为异步。
  // 当创建fiber时，它继承其父节点的模式。
  // 可以在创建时设置其他标志，但之后该值应在fiber的
  // 生命周期内保持不变，特别是在创建其子fiber之前。
  mode: TypeOfMode,

  // Effect
  flags: Flags,
  subtreeFlags: Flags,
  deletions: Array<Fiber> | null,

  lanes: Lanes,
  childLanes: Lanes,

  // 这是一个池化的Fiber版本。每个被更新的fiber最终都会
  // 有一个配对。在需要时，我们可以清理配对以节省内存。
  alternate: Fiber | null,

  // 当前更新中渲染此Fiber及其后代所花费的时间。
  // 这告诉我们树如何利用sCU进行记忆化。
  // 每次渲染时都会重置为0，仅在我们不退出时更新。
  // 此字段仅在enableProfilerTimer标志启用时设置。
  actualDuration?: number,

  // 如果Fiber当前在"render"阶段处于活动状态，
  // 这标记了工作开始的时间。
  // 此字段仅在enableProfilerTimer标志启用时设置。
  actualStartTime?: number,

  // 此Fiber最近渲染时间的持续时间。
  // 当我们因记忆化而退出时，此值不会更新。
  // 此字段仅在enableProfilerTimer标志启用时设置。
  selfBaseDuration?: number,

  // 此Fiber所有后代的基准时间总和。
  // 此值在"complete"阶段向上冒泡。
  // 此字段仅在enableProfilerTimer标志启用时设置。
  treeBaseDuration?: number,

  // 概念别名
  // workInProgress : Fiber -> alternate 用于重用的alternate
  // 恰好与进行中的工作相同。
  // 仅用于__DEV__

  _debugInfo?: ReactDebugInfo | null,
  _debugOwner?: ReactComponentInfo | Fiber | null,
  _debugStack?: string | Error | null,
  _debugTask?: ConsoleTask | null,
  _debugIsCurrentlyTiming?: boolean,
  _debugNeedsRemount?: boolean,

  // 用于验证钩子的顺序在渲染之间不会改变。
  _debugHookTypes?: Array<HookType> | null,
};

```

### 总结

fiber 架构的引入，使得react的渲染过程更加灵活和高效，通过将大任务分解成一个个小任务，并在浏览器空闲的时候执行，从而减少了页面卡顿，提高了用户体验。同时，fiber架构还引入了一些新的概念，如优先级调度、任务中断和恢复等，使得React能够更好地处理复杂的UI变化和动画效果。

### 问题

#### fiber数据结构为什么必须是链表，数组不行吗

链表数据结构可以方便的在列表中间插入和删除元素，这在构建和更新用户界面时非常有用。因为可能有大量的元素需要删除和插入

数组数据结构虽然也可以存储多个元素，但是插入和删除元素时需要移动其他元素，效率较低。

链表缺点：
- 访问元素时需要遍历整个链表，效率较低。查找效率低

数组缺点：
- 插入和删除元素时需要移动其他元素，效率较低。

选择链表是因为在构建和更新用户界面时插入和删除的需求要远远大于查找的需求。
