<script lang="ts">
    import { Save, AlertCircle, Wallet, CreditCard } from "lucide-svelte";
    import { enhance } from "$app/forms";

    export let data;
    export let form;

    // Transform nested structures for flat form binding if needed, or bind directly
    // We'll flatten the structure slightly for easier binding if coming from DB
    $: values = form?.values ?? {
        walletPercentage: data.fees.wallet.percentage,
        walletFixed: data.fees.wallet.fixed,
        cardPercentage: data.fees.card.percentage,
        cardFixed: data.fees.card.fixed,
    };
</script>

<div class="max-w-3xl">
    <div class="mb-8">
        <h1 class="text-2xl font-bold text-slate-800">User Fees</h1>
        <p class="text-slate-500 mt-1">
            Configure transaction fees for regular users
        </p>
    </div>

    <div
        class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
    >
        {#if form?.success}
            <div
                class="p-4 bg-emerald-50 border-b border-emerald-100 text-emerald-700 text-sm flex items-center gap-2"
            >
                <Save size={16} />
                Settings saved successfully.
            </div>
        {/if}

        <form method="POST" use:enhance class="p-8 space-y-8">
            <!-- Wallet Fee -->
            <div class="space-y-4">
                <div
                    class="flex items-center gap-3 text-slate-800 font-semibold border-b border-slate-100 pb-2"
                >
                    <Wallet size={20} class="text-indigo-600" />
                    <h3>Wallet Transactions</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pl-8">
                    <div class="space-y-2">
                        <label
                            for="walletPercentage"
                            class="block text-sm font-medium text-slate-600"
                            >Percentage Fee (%)</label
                        >
                        <div class="relative">
                            <input
                                type="number"
                                step="0.01"
                                name="walletPercentage"
                                id="walletPercentage"
                                value={values.walletPercentage}
                                class="w-full px-4 py-2.5 rounded-xl border {form
                                    ?.errors?.walletPercentage
                                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
                                    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all"
                            />
                            <span
                                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
                                >%</span
                            >
                        </div>
                        {#if form?.errors?.walletPercentage}
                            <p
                                class="text-xs text-rose-500 flex items-center gap-1"
                            >
                                <AlertCircle size={12} />
                                {form.errors.walletPercentage}
                            </p>
                        {/if}
                    </div>

                    <div class="space-y-2">
                        <label
                            for="walletFixed"
                            class="block text-sm font-medium text-slate-600"
                            >Fixed Fee ($)</label
                        >
                        <div class="relative">
                            <span
                                class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
                                >$</span
                            >
                            <input
                                type="number"
                                step="0.01"
                                name="walletFixed"
                                id="walletFixed"
                                value={values.walletFixed}
                                class="w-full pl-8 pr-4 py-2.5 rounded-xl border {form
                                    ?.errors?.walletFixed
                                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
                                    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all"
                            />
                        </div>
                        {#if form?.errors?.walletFixed}
                            <p
                                class="text-xs text-rose-500 flex items-center gap-1"
                            >
                                <AlertCircle size={12} />
                                {form.errors.walletFixed}
                            </p>
                        {/if}
                    </div>
                </div>
                <p class="text-xs text-slate-400 pl-8">
                    Fee applied to wallet-to-wallet transfers.
                </p>
            </div>

            <!-- Card Fee -->
            <div class="space-y-4">
                <div
                    class="flex items-center gap-3 text-slate-800 font-semibold border-b border-slate-100 pb-2"
                >
                    <CreditCard size={20} class="text-purple-600" />
                    <h3>Card Transactions</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pl-8">
                    <div class="space-y-2">
                        <label
                            for="cardPercentage"
                            class="block text-sm font-medium text-slate-600"
                            >Percentage Fee (%)</label
                        >
                        <div class="relative">
                            <input
                                type="number"
                                step="0.01"
                                name="cardPercentage"
                                id="cardPercentage"
                                value={values.cardPercentage}
                                class="w-full px-4 py-2.5 rounded-xl border {form
                                    ?.errors?.cardPercentage
                                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
                                    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all"
                            />
                            <span
                                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
                                >%</span
                            >
                        </div>
                        {#if form?.errors?.cardPercentage}
                            <p
                                class="text-xs text-rose-500 flex items-center gap-1"
                            >
                                <AlertCircle size={12} />
                                {form.errors.cardPercentage}
                            </p>
                        {/if}
                    </div>

                    <div class="space-y-2">
                        <label
                            for="cardFixed"
                            class="block text-sm font-medium text-slate-600"
                            >Fixed Fee ($)</label
                        >
                        <div class="relative">
                            <span
                                class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
                                >$</span
                            >
                            <input
                                type="number"
                                step="0.01"
                                name="cardFixed"
                                id="cardFixed"
                                value={values.cardFixed}
                                class="w-full pl-8 pr-4 py-2.5 rounded-xl border {form
                                    ?.errors?.cardFixed
                                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
                                    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all"
                            />
                        </div>
                        {#if form?.errors?.cardFixed}
                            <p
                                class="text-xs text-rose-500 flex items-center gap-1"
                            >
                                <AlertCircle size={12} />
                                {form.errors.cardFixed}
                            </p>
                        {/if}
                    </div>
                </div>
                <p class="text-xs text-slate-400 pl-8">
                    Fee applied to card payments/top-ups.
                </p>
            </div>

            <div
                class="pt-6 border-t border-slate-100 flex items-center justify-end"
            >
                <button
                    type="submit"
                    class="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/20 shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2"
                >
                    <Save size={18} />
                    <span>Save Configuration</span>
                </button>
            </div>
        </form>
    </div>
</div>
