<script lang="ts">
    import { ArrowLeft, Save, AlertCircle } from "lucide-svelte";
    import { enhance } from "$app/forms";

    export let data;
    export let form;

    // Use form values if validation failed, otherwise use loaded user data
    $: values = form?.values ?? data.user;
</script>

<div class="max-w-3xl mx-auto">
    <div class="flex items-center gap-4 mb-8">
        <a
            href="/users"
            class="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
        >
            <ArrowLeft size={20} />
        </a>
        <div>
            <h1 class="text-2xl font-bold text-slate-800">Edit User</h1>
            <p class="text-slate-500 mt-1">
                Update user details and access details
            </p>
        </div>
    </div>

    <div
        class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
    >
        <form method="POST" use:enhance class="p-8 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- First Name -->
                <div class="space-y-2">
                    <label
                        for="firstName"
                        class="block text-sm font-semibold text-slate-700"
                        >First Name</label
                    >
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={values.firstName}
                        class="w-full px-4 py-2.5 rounded-xl border {form
                            ?.errors?.firstName
                            ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
                            : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all"
                        placeholder="John"
                    />
                    {#if form?.errors?.firstName}
                        <p
                            class="text-xs text-rose-500 flex items-center gap-1 mt-1"
                        >
                            <AlertCircle size={12} />
                            {form.errors.firstName}
                        </p>
                    {/if}
                </div>

                <!-- Last Name -->
                <div class="space-y-2">
                    <label
                        for="lastName"
                        class="block text-sm font-semibold text-slate-700"
                        >Last Name</label
                    >
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={values.lastName}
                        class="w-full px-4 py-2.5 rounded-xl border {form
                            ?.errors?.lastName
                            ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
                            : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all"
                        placeholder="Doe"
                    />
                    {#if form?.errors?.lastName}
                        <p
                            class="text-xs text-rose-500 flex items-center gap-1 mt-1"
                        >
                            <AlertCircle size={12} />
                            {form.errors.lastName}
                        </p>
                    {/if}
                </div>
            </div>

            <!-- Email -->
            <div class="space-y-2">
                <label
                    for="email"
                    class="block text-sm font-semibold text-slate-700"
                    >Email Address</label
                >
                <div class="relative">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={values.email}
                        class="w-full px-4 py-2.5 rounded-xl border {form
                            ?.errors?.email
                            ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
                            : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all"
                        placeholder="john@example.com"
                    />
                </div>
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
                <!-- Role -->
                <div class="space-y-2">
                    <label
                        for="role"
                        class="block text-sm font-semibold text-slate-700"
                        >Role</label
                    >
                    <select
                        name="role"
                        id="role"
                        value={values.role}
                        class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all appearance-none"
                    >
                        <option value="User">User</option>
                        <option value="Agent">Agent</option>
                        <option value="Admin">Admin</option>
                    </select>
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
                        <option value="Pending">Pending</option>
                    </select>
                </div>
            </div>

            <div
                class="pt-6 border-t border-slate-100 flex items-center justify-end gap-3"
            >
                <a
                    href="/users"
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
