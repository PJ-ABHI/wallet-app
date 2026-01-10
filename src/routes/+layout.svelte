<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Header from "$lib/components/Header.svelte";

  import { afterNavigate } from "$app/navigation";

  let { children, data } = $props();

  let isSidebarOpen = $state(false);

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }

  afterNavigate(() => {
    isSidebarOpen = false;
  });
</script>

<div
  class="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-500/20"
>
  {#if $page.url.pathname.startsWith("/login")}
    {@render children()}
  {:else}
    <Sidebar
      isOpen={isSidebarOpen}
      closeSidebar={() => (isSidebarOpen = false)}
    />

    <!-- Mobile Overlay -->
    {#if isSidebarOpen}
      <div
        class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        onclick={() => (isSidebarOpen = false)}
        aria-hidden="true"
      ></div>
    {/if}

    <div
      class="md:pl-64 flex flex-col min-h-screen transition-all duration-300"
    >
      <Header user={data.user} {toggleSidebar} />
      <main class="flex-1 p-4 md:p-8 overflow-x-hidden">
        <div
          class="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          {@render children()}
        </div>
      </main>
    </div>
  {/if}
</div>
