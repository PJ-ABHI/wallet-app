<script lang="ts">
    import {
        Plus,
        Search,
        Trash2,
        Edit2,
        Shield,
        Mail,
        DollarSign,
    } from "lucide-svelte";
    import { enhance } from "$app/forms";

    export let data;
    $: agents = data.agents;

    let searchTerm = "";
    $: filteredAgents = agents.filter(
        (a: any) =>
            a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
</script>

<div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold text-slate-800">Agent Management</h1>
            <p class="text-slate-500 mt-1">
                Manage sales agents and commissions
            </p>
        </div>
        <a
            href="/agents/add"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm shadow-indigo-200"
        >
            <Plus size={18} />
            Add Agent
        </a>
    </div>

    <div
        class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
    >
        <!-- Toolbar -->
        <div
            class="p-5 border-b border-slate-100 flex items-center justify-between gap-4"
        >
            <div class="relative w-64">
                <Search
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                />
                <input
                    type="text"
                    bind:value={searchTerm}
                    placeholder="Search agents..."
                    class="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm transition-all"
                />
            </div>
            <div class="flex items-center gap-3">
                <select
                    class="text-sm border-slate-200 rounded-lg p-2 text-slate-600 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-slate-50"
                >
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
            </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
            <table class="w-full text-left">
                <thead
                    class="bg-slate-50 text-slate-500 text-xs uppercase font-semibold tracking-wider border-b border-slate-100"
                >
                    <tr>
                        <th class="px-6 py-4">Agent</th>
                        <th class="px-6 py-4">Total Sales</th>
                        <th class="px-6 py-4">Commission</th>
                        <th class="px-6 py-4">Status</th>
                        <th class="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    {#each filteredAgents as agent (agent.id)}
                        <tr
                            class="hover:bg-slate-50/50 transition-colors group"
                        >
                            <td class="px-6 py-4">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm"
                                    >
                                        {agent.name[0]}
                                    </div>
                                    <div>
                                        <p class="font-medium text-slate-900">
                                            {agent.name}
                                        </p>
                                        <div
                                            class="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5"
                                        >
                                            <Mail size={12} />
                                            {agent.email}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div
                                    class="flex items-center gap-1 font-medium text-slate-700"
                                >
                                    <DollarSign
                                        size={14}
                                        class="text-slate-400"
                                    />
                                    {agent.totalSales.toLocaleString()}
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <span
                                    class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                                >
                                    {agent.commissionRate}%
                                </span>
                            </td>
                            <td class="px-6 py-4">
                                <span
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  {agent.status === 'Active'
                                        ? 'bg-emerald-100 text-emerald-700'
                                        : agent.status === 'Inactive'
                                          ? 'bg-slate-100 text-slate-600'
                                          : 'bg-amber-100 text-amber-700'}"
                                >
                                    {agent.status}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <div
                                    class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <a
                                        href="/agents/{agent.id}/edit"
                                        class="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 size={16} />
                                    </a>
                                    <form
                                        method="POST"
                                        action="?/delete"
                                        use:enhance
                                    >
                                        <input
                                            type="hidden"
                                            name="id"
                                            value={agent.id}
                                        />
                                        <button
                                            type="submit"
                                            class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        {#if filteredAgents.length === 0}
            <div class="p-12 text-center text-slate-400">No agents found.</div>
        {/if}
    </div>
</div>
