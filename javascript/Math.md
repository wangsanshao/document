# Math

## 常量属性
```javascript
Math.E        // 自然对数的底数，约等于 2.718
Math.LN2      // 2的自然对数，约等于 0.693
Math.LN10     // 10的自然对数，约等于 2.303
Math.LOG2E    // 以2为底E的对数，约等于 1.443
Math.LOG10E   // 以10为底E的对数，约等于 0.434
Math.PI       // 圆周率，约等于 3.14159
Math.SQRT1_2  // 1/2的平方根，约等于 0.707
Math.SQRT2    // 2的平方根，约等于 1.414
```

## 方法
```javascript
// 基本运算
Math.abs(x)     // 绝对值
Math.max(x,y,z) // 最大值
Math.min(x,y,z) // 最小值
Math.pow(x,y)   // x的y次幂
Math.sqrt(x)    // 平方根

// 取整
Math.ceil(x)    // 向上取整
Math.floor(x)   // 向下取整
Math.round(x)   // 四舍五入
Math.trunc(x)   // 去除小数部分

// 随机数
Math.random()   // 0到1之间的随机数

// 三角函数
Math.sin(x)     // 正弦
Math.cos(x)     // 余弦
Math.tan(x)     // 正切
Math.asin(x)    // 反正弦
Math.acos(x)    // 反余弦
Math.atan(x)    // 反正切
Math.atan2(y,x) // 从原点到点(x,y)的角度

// 对数运算
Math.exp(x)     // e的x次幂
Math.log(x)     // 自然对数
Math.log10(x)   // 以10为底的对数
Math.log2(x)    // 以2为底的对数

// 双曲函数
Math.sinh(x)    // 双曲正弦
Math.cosh(x)    // 双曲余弦
Math.tanh(x)    // 双曲正切
Math.asinh(x)   // 反双曲正弦
Math.acosh(x)   // 反双曲余弦
Math.atanh(x)   // 反双曲正切

// 符号函数
Math.sign(x)    // 返回数字的符号，正数返回1，负数返回-1，0返回0
```