<script lang="ts">
  import { Bell, Search } from 'lucide-svelte';
</script>

<header class="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-20 px-8 flex items-center justify-between shadow-sm">
  <div class="flex items-center gap-4 flex-1">
    <div class="relative w-96 hidden md:block group">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
      <input 
        type="text" 
        placeholder="Search transactions, users..." 
        class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100/50 border border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-sm transition-all duration-300 placeholder:text-slate-400"
      />
    </div>
  </div>

  <div class="flex items-center gap-4">
    <button class="relative w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
      <Bell size={20} />
      <span class="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
    </button>
  </div>
</header>
