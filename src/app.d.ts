// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				email: string;
				role: 'Admin' | 'User' | 'Agent';
			} | null;
		}
		interface PageData {
			user: {
				email: string;
				role: 'Admin' | 'User' | 'Agent';
			} | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
