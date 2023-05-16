var a = null;
var b = undefined;
var c = 1;
var d = '2';
var e = Symbol('e');
var f = true;
var g = String(1)
var h = Number('2')
var i = Boolean('true')

console.log(typeof a) // "object"
console.log(typeof b)// "undefined"
console.log(typeof c)// "number"
console.log(typeof d)// "string"
console.log(typeof e)// "symbol"
console.log(typeof f)// "boolean"
console.log(typeof g)// "string"
console.log(typeof h)// "number"
console.log(typeof i) // "boolean"

var myString = new String('male');
var myNumber = new Number(23);
var myBoolean = new Boolean(false);
var myObject = new Object();
var myArray = new Array('foo', 'bar');
var myFunction = new Function('x', 'y', 'return x * y');
var myDate = new Date();
var myRegExp = new RegExp('\\bt[a-z]+\\b');
var myError = new Error('error');

console.log(typeof myString); // 输出 object
console.log(typeof myNumber); // 输出 object
console.log(typeof myBoolean); // 输出 object
console.log(typeof myObject); // 输出 object
console.log(typeof myArray); // 输出 object
console.log(typeof myFunction); // 输出 function 需要注意
console.log(typeof myDate); // 输出 object
console.log(typeof myRegExp); // 输出 object
console.log(typeof myError); 


function _new() {
  var constructor = Array.prototype.shift.call(arguments)
  var obj = {}
  var F = function() {}
  F.prototype = constructor.prototype
  obj = new F()
  var args = Array.prototype.slice.call(arguments)
  var result = constructor.apply(obj, args) 
  return typeof result === 'object' ? result : obj
}

var Person = function(name, age) {
  this.name = name
  this.age = age
}

var p = _new(Person, 'tom', 18)

console.log(p)