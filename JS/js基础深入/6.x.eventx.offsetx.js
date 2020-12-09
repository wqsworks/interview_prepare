// console.log(a)
app.addEventListener('click', function (e) {
  console.log(e)
})

var b = 10;
function fn () {
  return this.b + 1;
}
var obj = {
  b: 5,
  test1 () {
    return fn();
  }
}
obj.test2 = fn;
console.log(obj.test1()); //11
console.log(fn() === obj.test2()); //false