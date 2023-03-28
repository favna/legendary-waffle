import type { Piece, Container } from '@sapphire/pieces';
import type { Ctor } from '@sapphire/utilities';

/**
 * The function precondition interface.
 */
export interface FunctionPrecondition<Args extends unknown[]> {
	/**
	 * The arguments passed to the function or class' method.
	 */
	(...args: Args): boolean;
}

/**
 * The method that is called in `createMethodDecorator` for modifying the source method.
 */
export type MethodDecoratorModifier = () => void;

/**
 * The fallback interface, this is called when the function precondition returns or resolves with a falsy value.
 */
export interface FunctionFallback<This, Args extends unknown[], Return = unknown> {
	/**
	 * The arguments passed to the function or class' method.
	 */
	(this: This, ...args: Args): Return;
}

/**
 * A class method that is decorated.
 */
export type ClassMethodDecoratorTarget<This, Args extends unknown[], Return> = (this: This, ...args: Args) => Return;

/**
 * A stricter context for {@link ClassMethodDecoratorContext} that includes {@link ClassMethodDecoratorTarget}
 */
export type StrictClassMethodDecoratorContext<This, Args extends unknown[], Return> = ClassMethodDecoratorContext<
	This,
	ClassMethodDecoratorTarget<This, Args, Return>
>;

/**
 * The return type for class method decorators that is strictly typed
 */
export type ClassMethodDecorator<This, Args extends unknown[], Return> = (
	target: ClassMethodDecoratorTarget<This, Args, Return>,
	context: StrictClassMethodDecoratorContext<This, Args, Return>
) => ClassMethodDecoratorTarget<This, Args, Return>;

/**
 * The cache for enumerable entries for the `Enumerable` decorator.
 */
export interface EnumerableCacheEntry {
	fieldName: string | symbol;
	shouldBeEnumerable: boolean;
}

/**
 * A generic interface for classes that have a `name` property.
 * This is a stand-in for `typeof Piece` because its other properties are not necessary.
 */
export type ClassWithName = Pick<Piece, 'name'>;

/**
 * The constructor of the {@link Piece} class using {@link Ctor} and {@link ConstructorParameters}
 */
export type PieceConstructor = Ctor<ConstructorParameters<typeof Piece>>;

/**
 * The return type for the `Enumerable` decorator when using on a class field
 * @param This a reference to the `this` context of the decorated class. This should be added automatically by TypeScript.
 * @param Value a reference to the current value being decorated. This should be added automatically by TypeScript.
 */
export type EnumerableFieldReturnType<This, Value> = (
	_value: undefined,
	context: ClassFieldDecoratorContext<This, Value>
) => (this: ClassWithName, initialValue: Value) => Value;

/**
 * The return type of the `Enumerable` decorator when using on a class
 * @param Class A reference to the class being decorated. This should be added automatically by TypeScript.
 */
export type EnumerableClassReturnType<Class extends Ctor<ConstructorParameters<typeof Piece>>> = (
	DecoratedClass: Class,
	_context: ClassDecoratorContext
) => void | Class;

/**
 * The parameters for the `ApplyOptions` decorator when used with a callback function
 */
export interface ApplyOptionsCallbackParameters {
	/** The {@link Container} of Sapphire */
	container: Container;
	/** The context of the current piece */
	context: Piece.Context;
}