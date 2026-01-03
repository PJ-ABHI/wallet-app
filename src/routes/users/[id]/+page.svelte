<script lang="ts">
    import { page } from "$app/stores";
    import {
        ArrowLeft,
        Mail,
        Shield,
        Calendar,
        Clock,
        Edit2,
    } from "lucide-svelte";

    const userId = $page.params.id;

    // Mock User Data
    const user = {
        id: userId,
        name: "Alex Morgan",
        email: "alex@example.com",
        role: "Admin",
        status: "Active",
        joined: "Jan 12, 2025",
        lastLogin: "2 hours ago",
        bio: "Senior Administrator managing system configurations and user access.",
        avatar: "AM",
    };
</script>

<div class="max-w-4xl mx-auto">
    <div class="flex items-center gap-4 mb-8">
        <a
            href="/users"
            class="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
        >
            <ArrowLeft size={20} />
        </a>
        <div>
            <h1 class="text-2xl font-bold text-slate-800">User Profile</h1>
            <p class="text-slate-500 mt-1">View user details and activity</p>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Profile Card -->
        <div
            class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center"
        >
            <div
                class="w-24 h-24 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl font-bold mb-4"
            >
                {user.avatar}
            </div>
            <h2 class="text-xl font-bold text-slate-900">{user.name}</h2>
            <p class="text-slate-500 text-sm mb-4">{user.email}</p>

            <div class="flex items-center gap-2 mb-6">
                <span
                    class="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold uppercase tracking-wide"
                >
                    {user.role}
                </span>
                <span
                    class="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold uppercase tracking-wide"
                >
                    {user.status}
                </span>
            </div>

            <button
                class="w-full py-2.5 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
                <Edit2 size={16} />
                Edit Profile
            </button>
        </div>

        <!-- Details Section -->
        <div class="lg:col-span-2 space-y-6">
            <div
                class="bg-white rounded-2xl border border-slate-200 shadow-sm p-8"
            >
                <h3 class="text-lg font-bold text-slate-800 mb-6">
                    General Information
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                    <div>
                        <span
                            class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                            >Full Name</span
                        >
                        <p class="text-slate-900 font-medium mt-1">
                            {user.name}
                        </p>
                    </div>
                    <div>
                        <span
                            class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                            >Email Address</span
                        >
                        <div
                            class="flex items-center gap-2 mt-1 text-slate-900 font-medium"
                        >
                            <Mail size={16} class="text-slate-400" />
                            {user.email}
                        </div>
                    </div>
                    <div>
                        <span
                            class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                            >Role</span
                        >
                        <div
                            class="flex items-center gap-2 mt-1 text-slate-900 font-medium"
                        >
                            <Shield size={16} class="text-slate-400" />
                            {user.role}
                        </div>
                    </div>
                    <div>
                        <span
                            class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                            >Status</span
                        >
                        <p class="text-slate-900 font-medium mt-1">
                            {user.status}
                        </p>
                    </div>
                    <div>
                        <span
                            class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                            >Date Joined</span
                        >
                        <div
                            class="flex items-center gap-2 mt-1 text-slate-900 font-medium"
                        >
                            <Calendar size={16} class="text-slate-400" />
                            {user.joined}
                        </div>
                    </div>
                    <div>
                        <span
                            class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                            >Last Login</span
                        >
                        <div
                            class="flex items-center gap-2 mt-1 text-slate-900 font-medium"
                        >
                            <Clock size={16} class="text-slate-400" />
                            {user.lastLogin}
                        </div>
                    </div>
                </div>

                <div class="mt-6 pt-6 border-t border-slate-100">
                    <span
                        class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                        >Bio</span
                    >
                    <p class="text-slate-600 mt-2 leading-relaxed">
                        {user.bio}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
