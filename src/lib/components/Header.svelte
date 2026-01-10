<script lang="ts">
  import {
    Bell,
    Search,
    User,
    CreditCard,
    AlertCircle,
    Check,
    X,
    LogOut,
    Settings,
    ChevronDown,
    Menu,
  } from "lucide-svelte";
  import { fade, slide } from "svelte/transition";
  import { userAvatar } from "$lib/stores/user";

  export let user: { email: string; role: string } | null = null;
  export let toggleSidebar: () => void = () => {};

  let showNotifications = false;
  let showProfileMenu = false;

  // Mock Data
  let notifications = [
    {
      id: 1,
      title: "New User Registered",
      message: "John Doe created an account.",
      time: "2 min ago",
      type: "user",
      read: false,
    },
    {
      id: 2,
      title: "Payment Received",
      message: "Payment of $1,200 from Alice confirmed.",
      time: "1 hour ago",
      type: "payment",
      read: false,
    },
    {
      id: 3,
      title: "System Alert",
      message: "Database backup completed successfully.",
      time: "3 hours ago",
      type: "system",
      read: true,
    },
    {
      id: 4,
      title: "High Fee Detected",
      message: "Agent reported unusually high gas fees.",
      time: "5 hours ago",
      type: "alert",
      read: true,
    },
  ];

  function toggleNotifications() {
    showNotifications = !showNotifications;
    showProfileMenu = false;
  }

  function toggleProfileMenu() {
    showProfileMenu = !showProfileMenu;
    showNotifications = false;
  }

  function markAsRead(id: number) {
    notifications = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n,
    );
  }

  function markAllRead() {
    notifications = notifications.map((n) => ({ ...n, read: true }));
  }

  $: unreadCount = notifications.filter((n) => !n.read).length;
</script>

<header
  class="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-20 px-8 flex items-center justify-between shadow-sm relative"
>
  <div class="flex items-center gap-4 flex-1">
    <button
      on:click={toggleSidebar}
      class="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
    >
      <Menu size={24} />
    </button>
    <div class="relative w-96 hidden md:block group">
      <Search
        class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
        size={20}
      />
      <input
        type="text"
        placeholder="Search transactions, users..."
        class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100/50 border border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-sm transition-all duration-300 placeholder:text-slate-400"
      />
    </div>
  </div>

  <div class="flex items-center gap-6">
    <!-- Notifications -->
    <div class="relative">
      <button
        on:click={toggleNotifications}
        class="relative w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors {showNotifications
          ? 'bg-slate-100 text-indigo-600'
          : ''}"
      >
        <Bell size={20} />
        {#if unreadCount > 0}
          <span
            class="absolute top-2 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse"
          ></span>
        {/if}
      </button>

      {#if showNotifications}
        <div
          transition:slide={{ duration: 200, axis: "y" }}
          class="absolute right-0 top-full mt-4 w-96 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden ring-1 ring-black/5 z-50 origin-top-right"
        >
          <div
            class="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50"
          >
            <h3 class="font-semibold text-slate-800">Notifications</h3>
            {#if unreadCount > 0}
              <button
                on:click={markAllRead}
                class="text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Mark all as read
              </button>
            {/if}
          </div>

          <div class="max-h-[400px] overflow-y-auto">
            {#if notifications.length === 0}
              <div class="p-8 text-center text-slate-500 text-sm">
                No notifications
              </div>
            {:else}
              {#each notifications as notification (notification.id)}
                <button
                  on:click={() => markAsRead(notification.id)}
                  class="w-full text-left p-4 hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors flex gap-4 group relative"
                >
                  <div class="flex-shrink-0">
                    <div
                      class="w-10 h-10 rounded-full flex items-center justify-center
                                        {notification.type === 'user'
                        ? 'bg-indigo-100 text-indigo-600'
                        : notification.type === 'payment'
                          ? 'bg-emerald-100 text-emerald-600'
                          : notification.type === 'alert'
                            ? 'bg-amber-100 text-amber-600'
                            : 'bg-slate-100 text-slate-600'}"
                    >
                      {#if notification.type === "user"}<User size={18} />
                      {:else if notification.type === "payment"}<CreditCard
                          size={18}
                        />
                      {:else if notification.type === "alert"}<AlertCircle
                          size={18}
                        />
                      {:else}<Bell size={18} />{/if}
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-slate-900 truncate pr-4">
                      {notification.title}
                    </p>
                    <p class="text-xs text-slate-500 mt-0.5 line-clamp-2">
                      {notification.message}
                    </p>
                    <p
                      class="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1"
                    >
                      {notification.time}
                    </p>
                  </div>
                  {#if !notification.read}
                    <div
                      class="absolute top-5 right-4 w-2 h-2 bg-indigo-500 rounded-full"
                    ></div>
                  {/if}
                </button>
              {/each}
            {/if}
          </div>

          <div class="p-2 border-t border-slate-50 bg-slate-50/50 text-center">
            <a
              href="/notifications"
              class="text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors block py-1"
            >
              View all notifications
            </a>
          </div>
        </div>

        <!-- Backdrop for click-outside -->
        <div
          class="fixed inset-0 z-40 bg-transparent"
          on:click={() => (showNotifications = false)}
          aria-hidden="true"
        ></div>
      {/if}
    </div>

    <!-- User Profile -->
    {#if user}
      <div class="relative">
        <button
          on:click={toggleProfileMenu}
          class="flex items-center gap-3 hover:bg-slate-50 p-1.5 pr-3 rounded-full transition-all border border-transparent hover:border-slate-100 {showProfileMenu
            ? 'bg-slate-50 border-slate-100'
            : ''}"
        >
          <div
            class="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white overflow-hidden"
          >
            {#if $userAvatar}
              <img
                src={$userAvatar}
                alt="Avatar"
                class="w-full h-full object-cover"
              />
            {:else}
              {user.email[0].toUpperCase()}
            {/if}
          </div>
          <div class="text-left hidden lg:block">
            <p class="text-sm font-semibold text-slate-800 leading-none">
              {user.email.split("@")[0]}
            </p>
            <p
              class="text-[10px] text-slate-500 font-medium pt-1 uppercase tracking-wide"
            >
              {user.role}
            </p>
          </div>
          <ChevronDown size={14} class="text-slate-400 ml-1" />
        </button>

        {#if showProfileMenu}
          <div
            transition:slide={{ duration: 150, axis: "y" }}
            class="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden ring-1 ring-black/5 z-50 origin-top-right p-1"
          >
            <div class="px-4 py-3 border-b border-slate-50 mb-1">
              <p class="text-sm font-medium text-slate-900 truncate">
                {user.email}
              </p>
              <p class="text-xs text-slate-500 mt-0.5 capitalize">
                {user.role} Account
              </p>
            </div>

            <a
              href="/profile"
              class="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg text-sm transition-colors"
            >
              <User size={16} />
              Profile
            </a>
            <a
              href="/settings"
              class="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg text-sm transition-colors"
            >
              <Settings size={16} />
              Settings
            </a>

            <div class="h-px bg-slate-50 my-1"></div>

            <form action="/logout" method="POST" class="w-full">
              <button
                type="submit"
                class="flex w-full items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg text-sm transition-colors"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </form>
          </div>

          <!-- Backdrop for click-outside -->
          <div
            class="fixed inset-0 z-40 bg-transparent"
            on:click={() => (showProfileMenu = false)}
            aria-hidden="true"
          ></div>
        {/if}
      </div>
    {/if}
  </div>
</header>
