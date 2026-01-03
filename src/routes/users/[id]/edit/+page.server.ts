import { error, fail, redirect } from '@sveltejs/kit';
import { DB } from '$lib/server/db';
import * as yup from 'yup';

export const load = async ({ params }) => {
    const user = DB.getUser(params.id);
    if (!user) throw error(404, 'User not found');
    return { user };
};

const schema = yup.object().shape({
    firstName: yup.string().required('First name is required').min(2, 'Too short'),
    lastName: yup.string().required('Last name is required').min(2, 'Too short'),
    email: yup.string().email('Invalid email').required('Email is required'),
    role: yup.string().oneOf(['Admin', 'User', 'Agent']).required('Role is required'),
    status: yup.string().oneOf(['Active', 'Inactive', 'Pending']).required('Status is required'),
});

export const actions = {
    default: async ({ request, params }) => {
        const data = await request.formData();
        const values = {
            firstName: data.get('firstName') as string,
            lastName: data.get('lastName') as string,
            email: data.get('email') as string,
            role: data.get('role') as any,
            status: data.get('status') as any
        };

        // Extract files
        const aadhar = data.get('aadhar') as File;
        const pan = data.get('pan') as File;
        const voterId = data.get('voterId') as File;

        try {
            await schema.validate(values, { abortEarly: false });
        } catch (err: any) {
            if (err instanceof yup.ValidationError) {
                const errors = err.inner.reduce((acc: any, curr: any) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {});
                return fail(400, { errors, values, user: { id: params.id, ...values } });
            }
        }

        // Get existing user to preserve docs if not updated
        const existingUser = DB.getUser(params.id);
        const existingDocs = existingUser?.documents || {};

        // Mock saving files (or keeping existing if not replaced and size > 0)
        // Note: form data file input sending empty file if no selection.
        const documents = {
            aadhar: aadhar?.size > 0 ? `uploads/${aadhar.name}` : existingDocs.aadhar,
            pan: pan?.size > 0 ? `uploads/${pan.name}` : existingDocs.pan,
            voterId: voterId?.size > 0 ? `uploads/${voterId.name}` : existingDocs.voterId
        };

        const updated = DB.updateUser(params.id, {
            ...values,
            documents
        });

        if (!updated) return fail(404, { message: 'User not found' });

        throw redirect(303, '/users');
    }
};
