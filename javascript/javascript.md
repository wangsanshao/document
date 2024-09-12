#### 简介
javascript是一门动态的，弱类型的编程语言
1、动态语言，运行时确定数据类型
2、静态语言，编译的时候就确定了数据类型

#### 数据类型
##### 基本数据类型 储存在栈内存中
undefined, null, boolean, string, number, symbol, bignit
##### 引用类型 储存在堆内存中
object
##### 基本数据类型和引用类型的区别
基本类型花销的内存小，所以拷贝值
引用类型花销的内存大，所以拷贝引用地址
> https://pic2.zhimg.com/80/v2-c0f6cd629d0eb7159619184bfb883835_720w.webp

##### 类型判断
- typeof
- instanceof
- constructor
- Object.prototype.toString.call()

###### typeof 操作符返回正在使用值的基本类型
> typeof null 返回object
> typeof new Function(){} 返回function

###### instanceof 运算符用于检测构造函数的prototype属性是否出现某个实例对象的原型链上
（实例对象的原型链上是否有构造函数的protitype属性）
> 不能判断基础数据类型

###### constructor Object原型上的方法，
Object.prototype.constructor
constructor 的指针是可以改变的（因为它就是个属性，以下例子属于属性赋值）

###### Object.prototype.toString.call()
Object.prototype.toString().call(source)返回一个表示该对象的字符串。真正能做到类型的检测
类似[object Null] [object Undefined] [object Array]


#### 为什么说一切皆对象
> https://pic3.zhimg.com/80/v2-418e6bb0fe7147b3f99df867ab091762_720w.webp