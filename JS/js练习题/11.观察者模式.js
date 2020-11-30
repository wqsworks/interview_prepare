/**
 * 观察者模式代码实现
 */

class SubJect {
	constructor() {
		this.observer = [];
	}

	addOberser (oberser) {
		this.observer.push(oberser);
	}

	cancelOberser (oberser) {
		this.observer = this.observer.filter(item => item !== oberser);
	}

	notify () {
		this.observer.forEach(i => i.update());
	}
}

class Oberver {
	constructor(name) {
		this.name = name;
	}

	update () {
		console.log(`my name updateing ${this.name}`)
	}
}

let test = new SubJect();

let person1 = new Oberver('person: 囡囡子');
// console.log(person1)
let person2 = new Oberver('person: 崽崽子');

test.addOberser(person1);
test.addOberser(person2);
test.cancelOberser(person1);

test.notify();

