<script lang="ts">
    import { enhance } from "$app/forms";

    export let data;
    export let form;

    // Use form value if error occurred (user input), otherwise use load data default
    $: email = form?.email ?? data?.email ?? "";
    $: password = form?.password ?? data?.password ?? "";
</script>

<div class="min-h-screen bg-gray-950 flex items-center justify-center p-4">
    <div
        class="max-w-md w-full bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl"
    >
        <div class="text-center mb-8">
            <h1
                class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
                Welcome Back
            </h1>
            <p class="text-gray-400 mt-2">Sign in to manage your wallet</p>
        </div>

        <form method="POST" use:enhance class="space-y-6">
            {#if form?.message}
                <div
                    class="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
                >
                    {form.message}
                </div>
            {/if}

            <div>
                <label
                    for="email"
                    class="block text-sm font-medium text-gray-300 mb-2"
                    >Email</label
                >
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    class="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-100 placeholder-gray-500 transition-all outline-none"
                    placeholder="demo@wallet.com"
                />
                {#if form?.errors?.email}
                    <p class="mt-2 text-sm text-red-400">{form.errors.email}</p>
                {/if}
            </div>

            <div>
                <label
                    for="password"
                    class="block text-sm font-medium text-gray-300 mb-2"
                    >Password</label
                >
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    class="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-100 placeholder-gray-500 transition-all outline-none"
                    placeholder="password"
                />
                {#if form?.errors?.password}
                    <p class="mt-2 text-sm text-red-400">
                        {form.errors.password}
                    </p>
                {/if}
            </div>

            <button
                type="submit"
                class="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-blue-500/25"
            >
                Sign In
            </button>

            <div class="mt-6 text-center text-sm text-gray-500">
                <p class="mb-2">
                    Demo Credentials (password: <span class="font-mono text-xs"
                        >password</span
                    >):
                </p>
                <div class="flex flex-col gap-1 items-center">
                    <code
                        class="text-xs bg-gray-800/50 px-2 py-1 rounded text-purple-400 font-mono"
                        >admin@wallet.com (Admin)</code
                    >
                    <code
                        class="text-xs bg-gray-800/50 px-2 py-1 rounded text-blue-400 font-mono"
                        >user@wallet.com (User)</code
                    >
                    <code
                        class="text-xs bg-gray-800/50 px-2 py-1 rounded text-green-400 font-mono"
                        >agent@wallet.com (Agent)</code
                    >
                </div>
            </div>
        </form>
    </div>
</div>
