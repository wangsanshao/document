# Promise

```javascript
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);

    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(value) {
    if (this.state === 'pending') {
      this.state = 'fulfilled';
      this.value = value;
      this.onResolvedCallbacks.forEach(callback => callback(value));
    }
  }

  reject(reason) {
    if (this.state === 'pending') {
      this.state = 'rejected';
      this.reason = reason;
      this.onRejectedCallbacks.forEach(callback => callback(reason));
    }
  }

  static resolve(value) {
    return new MyPromise((resolve) => {
        resolve(value);
    });
  }

  static reject(reason) {
    return new MyPromise((_, reject) => {
        reject(reason);
    });
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
        const results = [];
        let completed = 0;

        promises.forEach((promise, index) => {
            MyPromise.resolve(promise).then(value => {
                results[index] = value;
                completed += 1;

                if (completed === promises.length) {
                    resolve(results);
                }
            }).catch(reject); // 如果有一个 Promise 失败，直接拒绝
        });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
        promises.forEach(promise => {
            MyPromise.resolve(promise).then(resolve).catch(reject);
        });
    });
  }

  static any(promises) {
    return new MyPromise((resolve, reject) => {
        const errors = [];
        let count = 0;

        promises.forEach((promise, index) => {
            MyPromise.resolve(promise).then(resolve).catch(error => {
                errors[index] = error;
                count += 1;

                if (count === promises.length) {
                    reject(new AggregateError(errors, 'All promises were rejected'));
                }
            });
        });
    });
  }

  static allSettled(promises) {
    return new MyPromise((resolve) => {
        const results = [];
        let completed = 0;

        promises.forEach((promise, index) => {
            MyPromise.resolve(promise).then(value => {
                results[index] = { status: 'fulfilled', value };
            }).catch(reason => {
                results[index] = { status: 'rejected', reason };
            }).finally(() => {
                completed += 1;
                if (completed === promises.length) {
                    resolve(results);
                }
            });
        });
    });
  }

  then(onFulfilled, onRejected) {
    // 返回一个新的 Promise
    return new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        // 执行 onFulfilled
        try {
          const result = onFulfilled(this.value);
          resolve(result); // 解析返回的结果
        } catch (error) {
          reject(error); // 捕获错误并拒绝
        }
      }

      if (this.state === 'rejected') {
        // 执行 onRejected
        try {
          const result = onRejected(this.reason);
          resolve(result); // 解析返回的结果
        } catch (error) {
          reject(error); // 捕获错误并拒绝
        }
      }

      if (this.state === 'pending') {
        this.onResolvedCallbacks.push((value) => {
          try {
            const result = onFulfilled(value);
            resolve(result); // 解析返回的结果
          } catch (error) {
            reject(error); // 捕获错误并拒绝
          }
        });

        this.onRejectedCallbacks.push((reason) => {
          try {
            const result = onRejected(reason);
            resolve(result); // 解析返回的结果
          } catch (error) {
            reject(error); // 捕获错误并拒绝
          }
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected); // catch 方法可以使用 then 的功能
  }

  finally(callback) {
    if (this.state === 'fulfilled') {
        callback();
    }
    if (this.state === 'rejected') {
        callback();
    }
    if (this.state === 'pending') {
        this.onResolvedCallbacks.push(callback);
        this.onRejectedCallbacks.push(callback);
    }
  }
  
}

```

