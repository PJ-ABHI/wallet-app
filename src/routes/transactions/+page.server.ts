import { DB } from '$lib/server/db';

export const load = async () => {
    return {
        transactions: DB.getTransactions(),
        users: DB.getUsers()
    };
};
