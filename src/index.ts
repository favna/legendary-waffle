import { Enumerable } from './lib/decorators';

@Enumerable()
class SampleClass {
	public name: string = 'SampleClass';

	public sampleMethod(): void {
		console.log('Hello World!');
	}

	@Enumerable(false)
	public sampleField: string = 'Hello World!';
}

const sampleClass = new SampleClass();

console.group('result logging');
console.log('sampleField: ', sampleClass.sampleField);
console.log('sampleField property property descriptor', Object.getOwnPropertyDescriptor(sampleClass, 'sampleField'));
console.groupEnd();
