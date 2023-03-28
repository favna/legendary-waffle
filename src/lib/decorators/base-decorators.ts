import type { Piece } from '@sapphire/framework';
import type { Ctor } from '@sapphire/utilities';
import type { ClassWithName, EnumerableCacheEntry } from './types';

const enumerableCache: Map<string, EnumerableCacheEntry[]> = new Map();

export function Enumerable<Class extends Ctor<ConstructorParameters<typeof Piece>>>(): any;
export function Enumerable<This, Value>(enumerable: boolean): any;
export function Enumerable<ThisOrClass, Value>(enumerable?: boolean) {
	if (typeof enumerable === 'boolean') {
		return (_value: undefined, context: ClassFieldDecoratorContext<ThisOrClass, Value>) =>
			function (this: ClassWithName, initialValue: Value): Value {
				const classFields = enumerableCache.get(this.name);

				if (classFields) {
					classFields.push({
						fieldName: context.name,
						shouldBeEnumerable: enumerable ?? true
					});
				} else {
					enumerableCache.set(this.name, [
						{
							fieldName: context.name,
							shouldBeEnumerable: enumerable ?? true
						}
					]);
				}

				return initialValue;
			};
	}

	return (DecoratedClass: Ctor<ConstructorParameters<typeof Piece>>, _context: ClassDecoratorContext) =>
		function (...args: ConstructorParameters<typeof Piece>) {
			const classInstance = new DecoratedClass(...args);

			for (const cacheEntry of (enumerableCache.get(classInstance.name) ?? []).values()) {
				Object.defineProperty(classInstance, cacheEntry.fieldName, {
					enumerable: cacheEntry.shouldBeEnumerable
				});
			}

			return classInstance;
		};
}
