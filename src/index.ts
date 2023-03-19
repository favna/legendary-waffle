import { NonEnumerable, NonEnumerableClass } from './lib/decorators';

@NonEnumerableClass
class SampleClass {
	public name: string = 'SampleClass';

	public sampleMethod(): void {
		console.log('Hello World!');
	}

	@NonEnumerable
	public sampleField: string = 'Hello World!';
}

const sampleClass = new SampleClass();

console.group('result logging');
console.log('sampleField: ', sampleClass.sampleField);
console.log('sampleField property property descriptor', Object.getOwnPropertyDescriptor(sampleClass, 'sampleField'));
console.groupEnd();
