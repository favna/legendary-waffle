import { Piece, Store } from '@sapphire/framework';

export const fakeStore = new Store(Piece, {
	name: 'fakeStore'
});

export const fakePieceContext: Piece.Context = {
	name: 'fake',
	path: __dirname,
	root: __dirname,
	store: fakeStore
} satisfies Piece.Context;
