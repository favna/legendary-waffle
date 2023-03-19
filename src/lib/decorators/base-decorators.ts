import type { Piece } from '@sapphire/framework';
import type { Ctor } from '@sapphire/utilities';
import type { ClassWithName, EnumerableCacheEntry } from './types';

const enumerableCache: Map<string, EnumerableCacheEntry[]> = new Map();

/**
 * Decorator that sets the enumerable property of the decorated field to `false`.
 */
export function NonEnumerableOld<This, Value>(_value: undefined, context: ClassFieldDecoratorContext<This, Value>) {
	return function (this: This, initialValue: Value) {
		Object.defineProperty(this, context.name, { enumerable: false, configurable: true, writable: true, value: initialValue });
	};
}

/**
 * Decorator that reads {@link enumerableCache} for the decorated class and sets the enumerable property of any fields decorated with {@link NonEnumerable} to `false`.
 */
export function NonEnumerableClass<C extends Ctor<ConstructorParameters<typeof Piece>>>(DecoratedClass: C, _context: ClassDecoratorContext): any {
	return function (...args: ConstructorParameters<typeof Piece>) {
		const classInstance = new DecoratedClass(...args);

		for (const cacheEntry of (enumerableCache.get(classInstance.name) ?? []).values()) {
			Object.defineProperty(classInstance, cacheEntry.fieldName, {
				enumerable: cacheEntry.shouldBeEnumerable
			});
		}

		return classInstance;
	};
}

/**
 * Decorator that queues the decorated field for being marked as `enumerable` `false`. Apply to the class using {@link NonEnumerableClass}
 */
export function NonEnumerable<This, Value>(_value: undefined, context: ClassFieldDecoratorContext<This, Value>) {
	return function (this: ClassWithName, initialValue: Value): Value {
		const classFields = enumerableCache.get(this.name);

		if (classFields) {
			classFields.push({
				fieldName: context.name,
				shouldBeEnumerable: false
			});
		} else {
			enumerableCache.set(this.name, [
				{
					fieldName: context.name,
					shouldBeEnumerable: false
				}
			]);
		}

		return initialValue;
	};
}
