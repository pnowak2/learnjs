export var color = 'red';
export let name = 'peter';
export const magicNumber = 7;

export function sum (a, b) {
	return a + b;
}

export class Rectangle {
	constructor(length, width) {
		this.length = length;
		this.width = width;
	}

	area() {
		return this.length * this.width;
	}
}

export function toExport () {

}

function notExported () {

}

