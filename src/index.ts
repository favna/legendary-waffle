import { NonEnumerable } from './lib/decorators';

class SampleClass {
	public sampleMethod(): void {
		console.log('Hello World!');
	}

	// @ts-ignore asdasd
	@NonEnumerable
	public sampleField: string = 'Hello World!';
}

const sampleClass = new SampleClass();

console.group('result logging');
console.log('sampleField: ', sampleClass.sampleField);
console.log('sampleField property property descriptor', Object.getOwnPropertyDescriptor(sampleClass, 'sampleField'));
console.groupEnd();
