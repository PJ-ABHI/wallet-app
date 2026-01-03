<script lang="ts">
  import { page } from '$app/stores';
  import { LayoutDashboard, Users, CreditCard, Settings, Wallet } from 'lucide-svelte';

  const menuItems = [
    { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    { label: 'Users', href: '/users', icon: Users },
    { label: 'Transactions', href: '/transactions', icon: CreditCard },
    { label: 'Settings', href: '/settings', icon: Settings }
  ];
</script>

<aside class="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 shadow-sm z-10 transition-all duration-300">
  <div class="p-6 border-b border-slate-100 flex items-center gap-3">
    <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
      <Wallet size={20} />
    </div>
    <span class="font-bold text-xl text-slate-800 tracking-tight">WalletAdmin</span>
  </div>

  <nav class="flex-1 overflow-y-auto py-6 px-4 space-y-1">
    {#each menuItems as item}
      <a 
        href={item.href}
        class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-medium transition-all duration-200 
        {$page.url.pathname === item.href 
          ? 'bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-200' 
          : 'hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1'}"
      >
        <svelte:component this={item.icon} size={20} class={$page.url.pathname === item.href ? 'stroke-[2.5px]' : 'stroke-2'} />
        {item.label}
      </a>
    {/each}
  </nav>

  <div class="p-4 border-t border-slate-100">
    <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
      <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
        AD
      </div>
      <div class="overflow-hidden">
        <p class="text-sm font-semibold text-slate-900 truncate">Admin User</p>
        <p class="text-xs text-slate-500 truncate">admin@wallet.com</p>
      </div>
    </div>
  </div>
</aside>
