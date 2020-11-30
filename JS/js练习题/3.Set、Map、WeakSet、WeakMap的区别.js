// Set
let set = new Set([1, 2, 3])
console.log(set.keys())	// SetIterator {1, 2, 3}
console.log(set.values())	// SetIterator {1, 2, 3}
console.log(set.entries())	// SetIterator {1, 2, 3}

for (let item of set.keys()) {
  console.log(item);
}	// 1	2	 3
for (let item of set.entries()) {
  console.log(item);
}	// [1, 1]	[2, 2]	[3, 3]

set.forEach((value, key) => {
  console.log(key + ' : ' + value)
})	// 1 : 1	2 : 2	3 : 3
console.log([...set])	// [1, 2, 3]

// 可以实现map和filter方法
let set = new Set([1, 2, 3])
set = new Set([...set].map(item => item * 2))
console.log([...set])	// [2, 4, 6]

set = new Set([...set].filter(item => (item >= 4)))
console.log([...set])	//[4, 6]


// WeakSet
// WeakSet 与 Set 的区别：

// WeakSet 只能储存对象引用，不能存放值，而 Set 对象都可以
// WeakSet 对象中储存的对象值都是被弱引用的，即垃圾回收机制不考虑 WeakSet 对该对象的应用，如果没有其他的变量或属性引用这个对象值，则这个对象将会被垃圾回收掉（不考虑该对象还存在于 WeakSet 中），所以，WeakSet 对象里有多少个成员元素，取决于垃圾回收机制有没有运行，运行前后成员个数可能不一致，遍历结束之后，有的成员可能取不到了（被垃圾回收了），WeakSet 对象是无法被遍历的（ES6 规定 WeakSet 不可遍历），也没有办法拿到它包含的所有元素
