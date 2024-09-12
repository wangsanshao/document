### Objcet冻结

#### Object.freeze()
简单来讲：Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改。

Object.freeze() 静态方法可以使一个对象被冻结。冻结对象可以防止扩展，并使现有的属性不可写入和不可配置。被冻结的对象不能再被更改：不能添加新的属性，不能移除现有的属性，不能更改它们的可枚举性、可配置性、可写性或值，对象的原型也不能被重新指定。freeze() 返回与传入的对象相同的对象。

```javascript
const obj = {
  prop: 42,
};

Object.freeze(obj);

obj.prop = 33;
// Throws an error in strict mode

console.log(obj.prop);
// Expected output: 42
```


#### Object.seal()
Object.freeze() 方法会密封一个对象。一个被冻结的对象，之前可修改的属性还是可以被修改的。

Object.seal() 静态方法密封一个对象。密封一个对象会阻止其扩展并且使得现有属性不可配置。密封对象有一组固定的属性：不能添加新属性、不能删除现有属性或更改其可枚举性和可配置性、不能重新分配其原型。只要现有属性的值是可写的，它们仍然可以更改。

```javaScript
const object1 = {
  property1: 42,
};

Object.seal(object1);
object1.property1 = 33;
console.log(object1.property1);
// Expected output: 33

delete object1.property1; // Cannot delete when sealed
console.log(object1.property1);
// Expected output: 33

```
#### Object.isFrozen() 和 Object.isSealed()

Object.isFrozen() 静态方法判断一个对象是否被冻结。
Object.isSealed() 静态方法判断一个对象是否被密封。

如果是被冻结的对象，就一定是被密封的对象。

```javascript
var obj1 = { a:  1}
var obj2 = { b: 2 }

Object.freeze(obj1)
Object.seal(obj2)

console.log(Object.isFrozen(obj1)) // true
console.log(Object.isSealed(obj2)) // true
consolle.log(Object.isSealed(obj1)) // true
console.log(Object.isFrozen(obj2))  // false

```
