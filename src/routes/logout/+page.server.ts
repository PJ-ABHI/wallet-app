import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
    cookies.delete('session', { path: '/' });
    throw redirect(303, '/login');
};

export const actions = {
    default: async ({ cookies }) => {
        cookies.delete('session', { path: '/' });
        throw redirect(303, '/login');
    }
};
