# Redux 和 MobX 的对比

## 基本概念

### Redux
Redux 是一个基于 Flux 架构的状态管理库，强调：
- 单一数据源（Single Source of Truth）
- 状态只读（State is Read-Only）
- 使用纯函数进行修改（Changes are Made with Pure Functions）

### MobX
MobX 是一个简单、可扩展的状态管理库，基于观察者模式：
- 可观察状态（Observable State）
- 计算值（Computed Values）
- 响应式更新（Reactions）

## 主要区别

### 1. 数据结构
- **Redux**：
  - 使用不可变（Immutable）数据
  - 状态树是扁平的
  - 需要手动处理数据范式化
```javascript
// Redux 状态示例
{
  users: {
    byId: {
      1: { id: 1, name: 'John' },
      2: { id: 2, name: 'Jane' }
    },
    allIds: [1, 2]
  }
}
```

- **MobX**：
  - 使用可变（Mutable）数据
  - 支持嵌套数据结构
  - 自动处理引用关系
```javascript
// MobX 状态示例
class Store {
  @observable users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ];
}
```

### 2. 状态更新
- **Redux**：
  - 通过 dispatch action 更新状态
  - 使用 reducer 处理状态更新
  - 强制使用不可变更新模式
```javascript
// Redux 更新示例
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    default:
      return state;
  }
};
```

- **MobX**：
  - 直接修改状态
  - 自动追踪依赖关系
  - 支持可变数据操作
```javascript
// MobX 更新示例
class UserStore {
  @action
  addUser(user) {
    this.users.push(user);
  }
}
```

### 3. 性能
- **Redux**：
  - 需要手动优化重渲染
  - 使用 reselect 等库做缓存
  - 大型应用可能需要更多性能优化

- **MobX**：
  - 自动优化重渲染
  - 精确更新依赖组件
  - 开箱即用的良好性能

### 4. 调试能力
- **Redux**：
  - 强大的开发者工具
  - 完整的状态变更历史
  - 时间旅行调试

- **MobX**：
  - 基本的开发者工具
  - 简单的状态追踪
  - 专注于当前状态

## 使用场景

### Redux 适合：
1. 大型应用，需要严格的状态管理
2. 需要详细的状态变更追踪
3. 团队开发，需要统一的状态更新模式
4. 对状态变更有严格要求的场景
5. 需要支持撤销/重做功能

### MobX 适合：
1. 中小型应用
2. 需要快速开发
3. 偏好面向对象的编程风格
4. 需要更灵活的状态管理
5. 对性能优化要求不是特别高

## 代码示例

### Redux 完整示例
```javascript
// Action Types
const ADD_TODO = 'ADD_TODO';

// Action Creators
const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { text, id: Date.now() }
});

// Reducer
const todoReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    default:
      return state;
  }
};

// Store
const store = createStore(todoReducer);

// Component
function TodoList() {
  const todos = useSelector(state => state);
  const dispatch = useDispatch();

  const handleAdd = (text) => {
    dispatch(addTodo(text));
  };

  return (
    // JSX
  );
}
```

### MobX 完整示例
```javascript
// Store
class TodoStore {
  @observable todos = [];

  @action
  addTodo(text) {
    this.todos.push({
      id: Date.now(),
      text
    });
  }

  @computed
  get todoCount() {
    return this.todos.length;
  }
}

// Component
const TodoList = observer(({ store }) => {
  const handleAdd = (text) => {
    store.addTodo(text);
  };

  return (
    // JSX
  );
});
```

## 最佳实践

### Redux 最佳实践：
1. 使用 Redux Toolkit 简化开发
2. 实现状态的范式化
3. 使用选择器（Selectors）优化性能
4. 遵循单一数据源原则
5. 保持 action 和 reducer 的纯函数特性

### MobX 最佳实践：
1. 使用装饰器简化代码
2. 合理使用 computed 值
3. 使用 strict 模式强制 action
4. 避免过度使用全局状态
5. 正确处理异步操作

## 总结

选择 Redux 还是 MobX 主要取决于：
1. 项目规模和复杂度
2. 团队开发经验和偏好
3. 性能需求
4. 调试需求
5. 代码可维护性要求

两者都是优秀的状态管理方案，在各自的适用场景中都能发挥最大价值。
