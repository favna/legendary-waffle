/**
 * Decorator that sets the enumerable property of a class field to the desired value.
 * @param value Whether the property should be enumerable or not
 */

// @ts-ignore asdasd
export function NonEnumerable<This, Value>(value: Value, context: ClassFieldDecoratorContext<This, Value>) {
	return function (this: This, initialValue: Value): Value {
		Object.defineProperty(this, context.name, { enumerable: false, configurable: true, writable: true, value: initialValue });
		return initialValue as Value;
	};
}

// export function NonEnumerable<This extends ClassWithName, Value = never>(shouldBeEnumerable?: boolean) {
//   return function decorate(
//     value: Ctor<ConstructorParameters<typeof Piece>>,
//     context: ClassFieldDecoratorContext<This, Value> | ClassDecoratorContext
//   ) {
//     switch (context.kind) {
//       case 'field': {
//         return function (this: This) {
//           const classFields = enumerableCache.get(this.name);

//           if (classFields) {
//             classFields.push({
//               fieldName: context.name,
//               shouldBeEnumerable: shouldBeEnumerable ?? true
//             });
//           } else {
//             enumerableCache.set(this.name, [
//               {
//                 fieldName: context.name,
//                 shouldBeEnumerable: shouldBeEnumerable ?? true
//               }
//             ]);
//           }
//         };
//       }

//       case 'class': {
//         return function (...args: ConstructorParameters<typeof Piece>) {
//           const classInstance = new value(...args);

//           for (const cacheEntry of (enumerableCache.get(classInstance.name) ?? []).values()) {
//             Object.defineProperty(classInstance, cacheEntry.fieldName, {
//               enumerable: cacheEntry.shouldBeEnumerable
//             });
//           }

//           return classInstance;
//         };
//       }
//     }
//   };
// }
