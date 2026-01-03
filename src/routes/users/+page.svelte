<script lang="ts">
  import { Plus, Search, MoreVertical, Trash2, Edit2, Shield, Mail } from 'lucide-svelte';

  const users = [
    { id: 1, name: 'Alex Morgan', email: 'alex@example.com', role: 'Admin', status: 'Active', avatar: 'AM' },
    { id: 2, name: 'Sarah Lee', email: 'sarah@example.com', role: 'User', status: 'Active', avatar: 'SL' },
    { id: 3, name: 'Mike Chen', email: 'mike@example.com', role: 'Editor', status: 'Inactive', avatar: 'MC' },
    { id: 4, name: 'Jessica Wu', email: 'jessica@example.com', role: 'User', status: 'Active', avatar: 'JW' },
    { id: 5, name: 'David Kim', email: 'david@example.com', role: 'User', status: 'Pending', avatar: 'DK' },
  ];
</script>

<div class="flex flex-col gap-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-slate-800">User Management</h1>
      <p class="text-slate-500 mt-1">Manage system access and user roles</p>
    </div>
    <a href="/users/add" class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm shadow-indigo-200">
      <Plus size={18} />
      Add User
    </a>
  </div>

  <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
    <!-- Toolbar -->
    <div class="p-5 border-b border-slate-100 flex items-center justify-between gap-4">
      <div class="relative w-64">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search users..." 
          class="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm transition-all"
        />
      </div>
      <div class="flex items-center gap-3">
        <select class="text-sm border-slate-200 rounded-lg p-2 text-slate-600 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-slate-50">
          <option>All Roles</option>
          <option>Admin</option>
          <option>User</option>
          <option>Editor</option>
        </select>
        <select class="text-sm border-slate-200 rounded-lg p-2 text-slate-600 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-slate-50">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Pending</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead class="bg-slate-50 text-slate-500 text-xs uppercase font-semibold tracking-wider border-b border-slate-100">
          <tr>
            <th class="px-6 py-4">User</th>
            <th class="px-6 py-4">Role</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each users as user}
            <tr class="hover:bg-slate-50/50 transition-colors group">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                    {user.avatar}
                  </div>
                  <div>
                    <p class="font-medium text-slate-900">{user.name}</p>
                    <div class="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                      <Mail size={12} />
                      {user.email}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <Shield size={14} class="text-slate-400" />
                  <span class="text-sm text-slate-600 font-medium">{user.role}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  {user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                   user.status === 'Inactive' ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-700'}">
                  {user.status}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button class="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                    <Edit2 size={16} />
                  </button>
                  <button class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    
    <!-- Pagination -->
    <div class="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
      <span>Showing 1 to 5 of 24 entries</span>
      <div class="flex gap-2">
        <button class="px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-50">Previous</button>
        <button class="px-3 py-1 rounded border border-slate-200 hover:bg-slate-50">Next</button>
      </div>
    </div>
  </div>
</div>
