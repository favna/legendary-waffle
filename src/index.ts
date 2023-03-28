import { Command } from '@sapphire/framework';
import { ApplyOptions, Enumerable } from './lib/decorators';
import { fakePieceContext } from './lib/fakePieceData';

@Enumerable()
@ApplyOptions<Command.Options>({ name: 'a very cool class' })
class SampleClass extends Command {
	public sampleMethod(): void {
		console.log('Hello World!');
	}

	@Enumerable(false)
	public sampleField: string = 'Hello World!';
}

const sampleClass = new SampleClass({ ...fakePieceContext, name: 'index' }, { name: 'SampleClass' });

console.group('result logging');
console.log(sampleClass.name);
console.log('sampleField: ', sampleClass.sampleField);
console.log('sampleField property property descriptor', Object.getOwnPropertyDescriptor(sampleClass, 'sampleField'));
console.groupEnd();
