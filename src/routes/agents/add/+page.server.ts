import { fail, redirect } from '@sveltejs/kit';
import { DB } from '$lib/server/db';
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(2, 'Too short'),
    email: yup.string().email('Invalid email').required('Email is required'),
    commissionRate: yup.number().min(0).max(100).required('Commission is required'),
    status: yup.string().oneOf(['Active', 'Inactive']).required('Status is required'),
});

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const values = {
            name: data.get('name') as string,
            email: data.get('email') as string,
            commissionRate: Number(data.get('commissionRate')),
            status: data.get('status') as any,
            totalSales: 0 // Default
        };

        try {
            await schema.validate(values, { abortEarly: false });
        } catch (err: any) {
            if (err instanceof yup.ValidationError) {
                const errors = err.inner.reduce((acc: any, curr: any) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {});
                return fail(400, { errors, values });
            }
        }

        DB.addAgent(values);
        throw redirect(303, '/agents');
    }
};
