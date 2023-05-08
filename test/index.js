Function.prototype.call1 = function(context, args) {
  var context = context || window;
  var fnCatch = context.fn;
  context.fn = this;
  var result;
  if(!args) {
    result = context.fn();
  } else {
    
  }
  context.fn = fnCatch;
  return result
}
