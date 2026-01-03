import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, url }) => {
    const session = cookies.get('session');
    let user = null;

    if (session) {
        try {
            user = JSON.parse(session);
        } catch {
            cookies.delete('session', { path: '/' });
        }
    }

    if (!user && url.pathname !== '/login') {
        throw redirect(303, '/login');
    }

    if (user && url.pathname === '/login') {
        throw redirect(303, '/');
    }

    return {
        user
    };
};
