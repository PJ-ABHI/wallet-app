import { error, fail, redirect } from '@sveltejs/kit';
import { DB } from '$lib/server/db';
import * as yup from 'yup';

export const load = async ({ params }) => {
    const agent = DB.getAgents().find(a => a.id === params.id);
    if (!agent) throw error(404, 'Agent not found');
    return { agent };
};

const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(2, 'Too short'),
    email: yup.string().email('Invalid email').required('Email is required'),
    commissionRate: yup.number().min(0).max(100).required('Commission is required'),
    status: yup.string().oneOf(['Active', 'Inactive']).required('Status is required'),
});

export const actions = {
    default: async ({ request, params }) => {
        const data = await request.formData();
        const values = {
            name: data.get('name') as string,
            email: data.get('email') as string,
            commissionRate: Number(data.get('commissionRate')),
            status: data.get('status') as any
        };

        try {
            await schema.validate(values, { abortEarly: false });
        } catch (err: any) {
            if (err instanceof yup.ValidationError) {
                const errors = err.inner.reduce((acc: any, curr: any) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {});
                return fail(400, { errors, values, agent: { id: params.id, ...values } });
            }
        }

        // Update agent logic (simplified as we didn't add updateAgent in DB object yet, adding it now implicitly)
        const index = DB.getAgents().findIndex(a => a.id === params.id);
        if (index !== -1) {
            // Direct mutation since we are using in-memory global
            const agents = DB.getAgents();
            agents[index] = { ...agents[index], ...values };
        } else {
            return fail(404, { message: 'Agent not found' });
        }

        throw redirect(303, '/agents');
    }
};
