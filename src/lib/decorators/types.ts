import type { Piece } from '@sapphire/pieces';

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
