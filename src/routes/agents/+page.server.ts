import { DB } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export const load = async () => {
    return {
        agents: DB.getAgents()
    };
};

export const actions = {
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id') as string;

        if (!id) return fail(400, { message: 'ID is required' });

        DB.deleteAgent(id);
        return { success: true };
    }
};
