<script lang="ts">
  import StatsCard from '$lib/components/StatsCard.svelte';
  import Chart from '$lib/components/Chart.svelte';
  import { Users, DollarSign, TrendingUp, Activity, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-svelte';

  // Mock Data
  const stats = [
    { title: 'Total Revenue', value: '$54,239', trend: 12.5, icon: DollarSign, color: 'indigo' },
    { title: 'Active Users', value: '2,543', trend: 8.2, icon: Users, color: 'emerald' },
    { title: 'Transactions', value: '12,404', trend: -2.4, icon: Activity, color: 'rose' },
    { title: 'Growth', value: '+18.2%', trend: 4.1, icon: TrendingUp, color: 'amber' },
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Revenue',
      data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
      borderColor: '#6366f1', // indigo-500
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#ffffff',
      pointBorderColor: '#6366f1',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  };

  const transactions = [
    { id: '#TRX-9871', user: 'Alex Morgan', amount: '+$450.00', status: 'Completed', date: '2 mins ago', type: 'incoming' },
    { id: '#TRX-9872', user: 'Sarah Lee', amount: '-$120.50', status: 'Pending', date: '15 mins ago', type: 'outgoing' },
    { id: '#TRX-9873', user: 'Mike Chen', amount: '+$950.00', status: 'Completed', date: '1 hour ago', type: 'incoming' },
    { id: '#TRX-9874', user: 'Jessica Wu', amount: '-$35.00', status: 'Failed', date: '3 hours ago', type: 'outgoing' },
    { id: '#TRX-9875', user: 'David Kim', amount: '+$1,200.00', status: 'Completed', date: '5 hours ago', type: 'incoming' },
  ];
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {#each stats as stat}
    <StatsCard {...stat} />
  {/each}
</div>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
  <!-- Chart Section -->
  <div class="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
     <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-lg font-bold text-slate-800">Revenue Overview</h3>
          <p class="text-sm text-slate-500">Monthly revenue performance</p>
        </div>
        <select class="text-sm border-slate-200 rounded-lg p-2 text-slate-600 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
          <option>Last 6 Months</option>
          <option>Last Year</option>
        </select>
     </div>
     <div class="h-80 w-full relative">
       <Chart data={chartData} />
     </div>
  </div>

  <!-- Recent Transactions -->
  <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-bold text-slate-800">Recent Transactions</h3>
      <button class="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</button>
    </div>
    
    <div class="space-y-4 overflow-y-auto flex-1 pr-2 max-h-[340px]">
      {#each transactions as trx}
        <div class="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full flex items-center justify-center 
              {trx.type === 'incoming' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}">
              {#if trx.type === 'incoming'}
                <ArrowDownRight size={18} />
              {:else}
                <ArrowUpRight size={18} />
              {/if}
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{trx.user}</p>
              <p class="text-xs text-slate-500">{trx.date}</p>
            </div>
          </div>
          <div class="text-right">
             <p class="text-sm font-bold {trx.type === 'incoming' ? 'text-emerald-600' : 'text-slate-900'}">
               {trx.amount}
             </p>
             <p class="text-[10px] font-medium uppercase tracking-wider 
               {trx.status === 'Completed' ? 'text-emerald-500' : 
                trx.status === 'Pending' ? 'text-amber-500' : 'text-rose-500'}">
               {trx.status}
             </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
