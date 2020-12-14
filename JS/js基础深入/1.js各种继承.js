// https://github.com/mqyqingfeng/Blog/issues/16
// 组合继承
function Parent (name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child (name, age) {

  Parent.call(this, name);

  this.age = age;

}

Child.prototype = new Parent();
Child.prototype.constructor = Child;


// 寄生组合式继承


function Parent (name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child (name, age) {
  Parent.call(this, name)
  this.age = age
}

function F () { }
F.prototype = Parent.prototype
Child.prototype = new F();

function Parent (name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child (name, ager) {
  Parent.call(this, name)
  this.age = age
}
function F () { }
F.prototype = Parent.prototype
Child.prototype = new F()