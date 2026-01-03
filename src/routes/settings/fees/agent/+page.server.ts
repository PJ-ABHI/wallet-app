import { DB } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import * as yup from 'yup';

export const load = async () => {
    return {
        fees: DB.getSettings().agentFees
    };
};

const schema = yup.object().shape({
    walletPercentage: yup.number().min(0).max(100).required('Wallet % is required'),
    walletFixed: yup.number().min(0).required('Wallet fixed fee is required'),
    cardPercentage: yup.number().min(0).max(100).required('Card % is required'),
    cardFixed: yup.number().min(0).required('Card fixed fee is required'),
});

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const values = {
            walletPercentage: Number(data.get('walletPercentage')),
            walletFixed: Number(data.get('walletFixed')),
            cardPercentage: Number(data.get('cardPercentage')),
            cardFixed: Number(data.get('cardFixed')),
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

        // Update settings
        DB.updateSettings({
            agentFees: {
                wallet: { percentage: values.walletPercentage, fixed: values.walletFixed },
                card: { percentage: values.cardPercentage, fixed: values.cardFixed }
            }
        });

        return { success: true };
    }
};
