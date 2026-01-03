import { fail, redirect } from '@sveltejs/kit';
import { DB } from '$lib/server/db';
import * as yup from 'yup';

const schema = yup.object().shape({
    firstName: yup.string().required('First name is required').min(2, 'Too short'),
    lastName: yup.string().required('Last name is required').min(2, 'Too short'),
    email: yup.string().email('Invalid email').required('Email is required'),
    role: yup.string().oneOf(['Admin', 'User', 'Agent']).required('Role is required'),
    status: yup.string().oneOf(['Active', 'Inactive', 'Pending']).required('Status is required'),
    // Files are validated manually or via bespoke checks since yup doesn't handle File objects natively well in all envs
});

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        // Extract basic fields
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
                return fail(400, { errors, values });
            }
        }

        // Mock saving files - In a real app, upload to S3/Cloudinary/Local disk here
        // For this demo, we'll verify they exist and maybe store a reference aka "Mock URL"
        const documents = {
            aadhar: aadhar?.size > 0 ? `uploads/${aadhar.name}` : null,
            pan: pan?.size > 0 ? `uploads/${pan.name}` : null,
            voterId: voterId?.size > 0 ? `uploads/${voterId.name}` : null
        };

        DB.addUser({
            ...values,
            documents
        });

        throw redirect(303, '/users');
    }
};
