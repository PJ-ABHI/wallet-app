export type Role = 'Admin' | 'User' | 'Agent';
export type Status = 'Active' | 'Inactive' | 'Pending';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    status: Status;
    createdAt: Date;
}

export interface Agent {
    id: string;
    name: string;
    email: string;
    status: Status;
    totalSales: number;
    commissionRate: number; // percentage
    createdAt: Date;
}

export interface Transaction {
    id: string;
    userId: string;
    userEmail: string;
    amount: number;
    type: 'Credit' | 'Debit';
    status: 'Completed' | 'Pending' | 'Failed';
    date: Date;
    description: string;
}

export interface FeeStructure {
    percentage: number;
    fixed: number;
}

export interface Settings {
    userFees: { wallet: FeeStructure; card: FeeStructure };
    agentFees: { wallet: FeeStructure; card: FeeStructure };
}

// In-memory store (Global variable to persist across server function calls in dev)
// Note: In production serverless, this would reset frequently. For demo/VPS it works.
const db = globalThis as any;

if (!db._data) {
    db._data = {
        users: [
            { id: '1', firstName: 'Alex', lastName: 'Morgan', email: 'alex@example.com', role: 'Admin', status: 'Active', createdAt: new Date('2023-01-01') },
            { id: '2', firstName: 'Sarah', lastName: 'Lee', email: 'sarah@example.com', role: 'User', status: 'Active', createdAt: new Date('2023-02-15') },
            { id: '3', firstName: 'Mike', lastName: 'Chen', email: 'mike@example.com', role: 'User', status: 'Inactive', createdAt: new Date('2023-03-10') },
        ] as User[],
        agents: [
            { id: '1', name: 'James Bond', email: '007@agent.com', status: 'Active', totalSales: 150000, commissionRate: 5, createdAt: new Date('2023-01-01') },
            { id: '2', name: 'Ethan Hunt', email: 'ethan@agent.com', status: 'Active', totalSales: 95000, commissionRate: 4, createdAt: new Date('2023-04-20') },
        ] as Agent[],
        transactions: [
            { id: '101', userId: '2', userEmail: 'sarah@example.com', amount: 500, type: 'Credit', status: 'Completed', date: new Date('2023-12-01'), description: 'Deposit' },
            { id: '102', userId: '2', userEmail: 'sarah@example.com', amount: 50, type: 'Debit', status: 'Completed', date: new Date('2023-12-05'), description: 'Coffee Shop' },
            { id: '103', userId: '3', userEmail: 'mike@example.com', amount: 1200, type: 'Credit', status: 'Pending', date: new Date('2023-12-06'), description: 'Freelance Payout' },
        ] as Transaction[],
        settings: {
            userFees: {
                wallet: { percentage: 1.5, fixed: 0 },
                card: { percentage: 2.9, fixed: 0.30 }
            },
            agentFees: {
                wallet: { percentage: 0.5, fixed: 0 },
                card: { percentage: 1.0, fixed: 0.15 }
            }
        } as Settings
    };
}

// Migration for existing data (if server didn't restart)
if (db._data && !db._data.settings) {
    db._data.settings = {
        userFees: {
            wallet: { percentage: 1.5, fixed: 0 },
            card: { percentage: 2.9, fixed: 0.30 }
        },
        agentFees: {
            wallet: { percentage: 0.5, fixed: 0 },
            card: { percentage: 1.0, fixed: 0.15 }
        }
    } as Settings;
}

export const DB = {
    // Users
    getUsers: () => db._data.users as User[],
    getUser: (id: string) => db._data.users.find((u: User) => u.id === id),
    addUser: (user: Omit<User, 'id' | 'createdAt'>) => {
        const newUser = { ...user, id: crypto.randomUUID(), createdAt: new Date() };
        db._data.users.unshift(newUser);
        return newUser;
    },
    updateUser: (id: string, data: Partial<User>) => {
        const index = db._data.users.findIndex((u: User) => u.id === id);
        if (index !== -1) {
            db._data.users[index] = { ...db._data.users[index], ...data };
            return db._data.users[index];
        }
        return null;
    },
    deleteUser: (id: string) => {
        db._data.users = db._data.users.filter((u: User) => u.id !== id);
    },

    // Agents
    getAgents: () => db._data.agents as Agent[],
    addAgent: (agent: Omit<Agent, 'id' | 'createdAt'>) => {
        const newAgent = { ...agent, id: crypto.randomUUID(), createdAt: new Date() };
        db._data.agents.unshift(newAgent);
        return newAgent;
    },
    updateAgent: (id: string, data: Partial<Agent>) => {
        const index = db._data.agents.findIndex((a: Agent) => a.id === id);
        if (index !== -1) {
            db._data.agents[index] = { ...db._data.agents[index], ...data };
            return db._data.agents[index];
        }
        return null;
    },
    deleteAgent: (id: string) => {
        db._data.agents = db._data.agents.filter((a: Agent) => a.id !== id);
    },

    // Transactions
    getTransactions: () => db._data.transactions as Transaction[],

    // Settings
    getSettings: () => db._data.settings as Settings,
    updateSettings: (newSettings: Partial<Settings>) => {
        db._data.settings = { ...db._data.settings, ...newSettings };
        return db._data.settings;
    }
};
