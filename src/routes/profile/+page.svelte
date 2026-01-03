<script lang="ts">
    import {
        User,
        Mail,
        Shield,
        Building,
        Phone,
        MapPin,
        Camera,
    } from "lucide-svelte";
    import { page } from "$app/stores";
    import { userAvatar } from "$lib/stores/user";

    // Access user from layout data via page store or data prop
    $: user = $page.data.user;

    let fileInput: HTMLInputElement;
    // let avatarPreview: string | null = null; // This line is removed as per instruction

    function handleFileChange(e: Event) {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            const file = target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                userAvatar.set(result); // Update global store
            };
            reader.readAsDataURL(file);
        }
    }
</script>

<div class="space-y-6">
    <div>
        <h1 class="text-2xl font-bold text-slate-800">My Profile</h1>
        <p class="text-slate-500 mt-1">Manage your account information</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- User Card -->
        <div
            class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center"
        >
            <div class="relative group mb-4">
                <div
                    class="w-24 h-24 rounded-full overflow-hidden shadow-lg ring-4 ring-slate-50"
                >
                    {#if $userAvatar}
                        <img
                            src={$userAvatar}
                            alt="Profile"
                            class="w-full h-full object-cover animate-in fade-in"
                        />
                    {:else}
                        <div
                            class="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-3xl font-bold"
                        >
                            {user?.email?.[0]?.toUpperCase() ?? "U"}
                        </div>
                    {/if}
                </div>

                <button
                    on:click={() => fileInput.click()}
                    class="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors border-2 border-white group-hover:scale-110"
                    title="Change Photo"
                >
                    <Camera size={16} />
                </button>
                <input
                    type="file"
                    accept="image/*"
                    bind:this={fileInput}
                    on:change={handleFileChange}
                    class="hidden"
                />
            </div>

            <h2 class="text-xl font-bold text-slate-900">
                {user?.email?.split("@")[0]}
            </h2>
            <p class="text-slate-500 text-sm">{user?.email}</p>

            <div
                class="mt-4 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wide"
            >
                {user?.role ?? "User"}
            </div>
        </div>

        <!-- Details -->
        <div class="lg:col-span-2 space-y-6">
            <div
                class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
            >
                <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h3
                        class="font-semibold text-slate-800 flex items-center gap-2"
                    >
                        <User size={18} class="text-slate-400" />
                        Account Details
                    </h3>
                </div>
                <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label
                            class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"
                            >Email Address</label
                        >
                        <div
                            class="flex items-center gap-2 text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                        >
                            <Mail size={16} class="text-slate-400" />
                            {user?.email}
                        </div>
                    </div>
                    <div>
                        <label
                            class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"
                            >Role</label
                        >
                        <div
                            class="flex items-center gap-2 text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                        >
                            <Shield size={16} class="text-slate-400" />
                            {user?.role}
                        </div>
                    </div>
                    <div>
                        <label
                            class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"
                            >Company</label
                        >
                        <div
                            class="flex items-center gap-2 text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                        >
                            <Building size={16} class="text-slate-400" />
                            Wallet App Inc.
                        </div>
                    </div>
                    <div>
                        <label
                            class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"
                            >Location</label
                        >
                        <div
                            class="flex items-center gap-2 text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                        >
                            <MapPin size={16} class="text-slate-400" />
                            New York, USA
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
