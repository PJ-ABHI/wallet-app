<script lang="ts">
    import { ArrowLeft, Save, AlertCircle } from "lucide-svelte";
    import { enhance } from "$app/forms";

    export let data;
    export let form;

    $: values = form?.values ?? data.agent;
</script>

<div class="max-w-3xl mx-auto">
    <div class="flex items-center gap-4 mb-8">
        <a
            href="/agents"
            class="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
        >
            <ArrowLeft size={20} />
        </a>
        <div>
            <h1 class="text-2xl font-bold text-slate-800">Edit Agent</h1>
            <p class="text-slate-500 mt-1">Update agent details</p>
        </div>
    </div>

    <div
        class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
    >
        <form method="POST" use:enhance class="p-8 space-y-6">
            <!-- Name -->
            <div class="space-y-2">
                <label
                    for="name"
                    class="block text-sm font-semibold text-slate-700"
                    >Full Name</label
                >
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={values.name}
                    class="w-full px-4 py-2.5 rounded-xl border {form?.errors
                        ?.name
                        ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
                        : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all"
                />
                {#if form?.errors?.name}
                    <p
                        class="text-xs text-rose-500 flex items-center gap-1 mt-1"
                    >
                        <AlertCircle size={12} />
                        {form.errors.name}
                    </p>
                {/if}
            </div>

            <!-- Email -->
            <div class="space-y-2">
                <label
                    for="email"
                    class="block text-sm font-semibold text-slate-700"
                    >Email Address</label
                >
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    class="w-full px-4 py-2.5 rounded-xl border {form?.errors
                        ?.email
                        ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
                        : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all"
                />
                {#if form?.errors?.email}
                    <p
                        class="text-xs text-rose-500 flex items-center gap-1 mt-1"
                    >
                        <AlertCircle size={12} />
                        {form.errors.email}
                    </p>
                {/if}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Commission -->
                <div class="space-y-2">
                    <label
                        for="commissionRate"
                        class="block text-sm font-semibold text-slate-700"
                        >Commission Rate (%)</label
                    >
                    <input
                        type="number"
                        name="commissionRate"
                        id="commissionRate"
                        value={values.commissionRate}
                        class="w-full px-4 py-2.5 rounded-xl border {form
                            ?.errors?.commissionRate
                            ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
                            : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all"
                    />
                    {#if form?.errors?.commissionRate}
                        <p
                            class="text-xs text-rose-500 flex items-center gap-1 mt-1"
                        >
                            <AlertCircle size={12} />
                            {form.errors.commissionRate}
                        </p>
                    {/if}
                </div>

                <!-- Status -->
                <div class="space-y-2">
                    <label
                        for="status"
                        class="block text-sm font-semibold text-slate-700"
                        >Status</label
                    >
                    <select
                        name="status"
                        id="status"
                        value={values.status}
                        class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all appearance-none"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div
                class="pt-6 border-t border-slate-100 flex items-center justify-end gap-3"
            >
                <a
                    href="/agents"
                    class="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
                >
                    Cancel
                </a>
                <button
                    type="submit"
                    class="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/20 shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2"
                >
                    <Save size={18} />
                    <span>Save Changes</span>
                </button>
            </div>
        </form>
    </div>
</div>
