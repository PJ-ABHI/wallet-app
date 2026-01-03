<script lang="ts">
  import '../app.css';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Header from '$lib/components/Header.svelte';
  
  let { children } = $props();
</script>

<div class="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-500/20">
  <Sidebar />
  
  <div class="pl-64 flex flex-col min-h-screen transition-all duration-300">
    <Header />
    <main class="flex-1 p-8 overflow-x-hidden">
      <div class="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {@render children()}
      </div>
    </main>
  </div>
</div>
