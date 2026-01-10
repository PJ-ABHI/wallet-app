import { fail, redirect } from '@sveltejs/kit';
import * as yup from 'yup';

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
});

const USERS = {
    'admin@wallet.com': { role: 'Admin', password: 'password' },
    'user@wallet.com': { role: 'User', password: 'password' },
    'agent@wallet.com': { role: 'Agent', password: 'password' }
} as const;

export const load = async () => {
    return {
        email: 'admin@wallet.com',
        password: 'password'
    };
};

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email') as string;
        const password = data.get('password') as string;

        try {
            await schema.validate({ email, password }, { abortEarly: false });
        } catch (err: any) {
            if (err instanceof yup.ValidationError) {
                const errors = err.inner.reduce((acc: any, curr: any) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {});
                return fail(400, { errors, email });
            }
        }

        const user = USERS[email as keyof typeof USERS];

        if (user && user.password === password) {
            cookies.set('session', JSON.stringify({ email, role: user.role }), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7 // 1 week
            });
            throw redirect(303, '/');
        }

        return fail(400, {
            message: 'Invalid credentials. Please use one of the demo accounts.',
            email
        });
    }
};
