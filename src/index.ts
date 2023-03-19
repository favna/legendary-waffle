import { NonEnumerable } from "./lib/decorators";

class SampleClass {
    public sampleMethod(): void {
        console.log('Hello World!');
    }

    @NonEnumerable
    public sampleField: string = 'Hello World!';
}

const sampleClass = new SampleClass();

console.log(sampleClass.sampleField);
