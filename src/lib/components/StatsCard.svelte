<script lang="ts">
  // Actually, I'll just accept class prop.

  export let title: string;
  export let value: string;
  export let trend: number; // percentage
  export let icon: any; // Lucide icon component
  export let color: string = "indigo"; // indigo, rose, emerald, etc.

  // Simple color mapping
  const colors: Record<string, string> = {
    indigo: "bg-indigo-100 text-indigo-600",
    rose: "bg-rose-100 text-rose-600",
    emerald: "bg-emerald-100 text-emerald-600",
    amber: "bg-amber-100 text-amber-600",
  };
</script>

<div
  class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300"
>
  <div class="flex items-start justify-between">
    <div>
      <p class="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 class="text-2xl font-bold text-slate-800 tracking-tight">{value}</h3>
    </div>
    <div class="p-3 rounded-xl {colors[color] || colors.indigo}">
      <svelte:component this={icon} size={22} />
    </div>
  </div>

  <div class="mt-4 flex items-center text-sm">
    <span
      class="{trend >= 0
        ? 'text-emerald-500'
        : 'text-rose-500'} font-semibold flex items-center gap-1"
    >
      {trend > 0 ? "+" : ""}{trend}%
    </span>
    <span class="text-slate-400 ml-2">from last month</span>
  </div>
</div>
