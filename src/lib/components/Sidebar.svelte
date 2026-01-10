<script lang="ts">
  import { page } from "$app/stores";

  export let isOpen = false;
  export let closeSidebar: () => void = () => {};

  import {
    LayoutDashboard,
    Users,
    CreditCard,
    Settings,
    Wallet,
    LogOut,
    ChevronDown,
    ChevronRight,
    Percent,
    X,
  } from "lucide-svelte";

  const menuItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Users", href: "/users", icon: Users },
    { label: "Transactions", href: "/transactions", icon: CreditCard },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
      children: [
        { label: "User Fees", href: "/settings/fees/user", icon: Percent },
        { label: "Agent Fees", href: "/settings/fees/agent", icon: Percent },
      ],
    },
  ];

  // Simple accordion state
  let openMenus: Record<string, boolean> = { Settings: true };

  function toggleMenu(label: string) {
    // Svelte 5 state reaction is fine, but for Svelte 4/simple obj need reassignment
    openMenus[label] = !openMenus[label];
  }

  const roleColors = {
    Admin: "bg-purple-100 text-purple-700",
    User: "bg-blue-100 text-blue-700",
    Agent: "bg-green-100 text-green-700",
  };
</script>

<aside
  class="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 shadow-xl z-50 transition-transform duration-300 md:translate-x-0 {isOpen
    ? 'translate-x-0'
    : '-translate-x-full'}"
>
  <div class="p-6 border-b border-slate-100 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div
        class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white"
      >
        <Wallet size={20} />
      </div>
      <span class="font-bold text-xl text-slate-800 tracking-tight"
        >Wallet App</span
      >
    </div>
    <!-- Mobile Close Button -->
    <button
      on:click={closeSidebar}
      class="md:hidden text-slate-400 hover:text-slate-600"
    >
      <X size={24} />
    </button>
  </div>

  <nav class="flex-1 overflow-y-auto py-6 px-4 space-y-1">
    {#each menuItems as item}
      <div>
        {#if item.children}
          <!-- Parent Item -->
          <button
            class="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
            on:click={() => toggleMenu(item.label)}
          >
            <div class="flex items-center gap-3">
              <svelte:component this={item.icon} size={20} class="stroke-2" />
              {item.label}
            </div>
            {#if openMenus[item.label]}
              <ChevronDown size={16} />
            {:else}
              <ChevronRight size={16} />
            {/if}
          </button>

          <!-- Children -->
          {#if openMenus[item.label]}
            <div
              class="ml-4 pl-4 border-l-2 border-slate-100 space-y-1 mt-1 transition-all"
            >
              {#each item.children as child}
                <a
                  href={child.href}
                  class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                     {$page.url.pathname === child.href
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}"
                >
                  <svelte:component this={child.icon} size={16} />
                  {child.label}
                </a>
              {/each}
            </div>
          {/if}
        {:else}
          <!-- Regular Item -->
          <a
            href={item.href}
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-medium transition-all duration-200
            {$page.url.pathname === item.href
              ? 'bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-200'
              : 'hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1'}"
          >
            <svelte:component
              this={item.icon}
              size={20}
              class={$page.url.pathname === item.href
                ? "stroke-[2.5px]"
                : "stroke-2"}
            />
            {item.label}
          </a>
        {/if}
      </div>
    {/each}
  </nav>

  <div class="p-4 border-t border-slate-100">
    <div
      class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200"
    >
      <div
        class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold shrink-0"
      >
        {$page.data.user?.email?.[0].toUpperCase() ?? "U"}
      </div>
      <div class="overflow-hidden flex-1">
        <div class="flex items-center gap-2">
          <p class="text-sm font-semibold text-slate-900 truncate">Demo User</p>
          <span
            class="text-[10px] font-bold px-1.5 py-0.5 rounded {roleColors[
              $page.data.user?.role ?? 'User'
            ]}"
          >
            {$page.data.user?.role ?? "User"}
          </span>
        </div>
        <p
          class="text-xs text-slate-500 truncate"
          title={$page.data.user?.email}
        >
          {$page.data.user?.email ?? "user@wallet.com"}
        </p>
      </div>
      <form action="/logout" method="POST">
        <button
          type="submit"
          class="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </form>
    </div>
  </div>
</aside>
