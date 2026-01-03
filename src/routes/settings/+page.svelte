<script lang="ts">
    import {
        Receipt,
        Users,
        Settings as SettingsIcon,
        ChevronRight,
    } from "lucide-svelte";
</script>

<div class="space-y-6">
    <div>
        <h1 class="text-2xl font-bold text-slate-800">Settings</h1>
        <p class="text-slate-500 mt-1">
            Configure application preferences and fees
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- User Fees -->
        <a
            href="/settings/fees/user"
            class="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all"
        >
            <div
                class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
            >
                <Users size={24} />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-1">User Fees</h3>
            <p class="text-sm text-slate-500 mb-4">
                Configure transaction fee percentages and fixed charges for
                standard users.
            </p>
            <div
                class="flex items-center text-sm font-medium text-indigo-600 group-hover:translate-x-1 transition-transform"
            >
                Manage Fees <ChevronRight size={16} class="ml-1" />
            </div>
        </a>

        <!-- Agent Fees -->
        <a
            href="/settings/fees/agent"
            class="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all"
        >
            <div
                class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
            >
                <Receipt size={24} />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-1">Agent Fees</h3>
            <p class="text-sm text-slate-500 mb-4">
                Set up commission rates and fee structures for agent accounts.
            </p>
            <div
                class="flex items-center text-sm font-medium text-emerald-600 group-hover:translate-x-1 transition-transform"
            >
                Manage Fees <ChevronRight size={16} class="ml-1" />
            </div>
        </a>

        <!-- General Settings (Placeholder) -->
        <div
            class="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm opacity-60 cursor-not-allowed"
        >
            <div
                class="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center mb-4"
            >
                <SettingsIcon size={24} />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-1">
                General (Coming Soon)
            </h3>
            <p class="text-sm text-slate-500 mb-4">
                System-wide configurations, branding, and notification
                preferences.
            </p>
        </div>
    </div>
</div>
