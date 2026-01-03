<script lang="ts">
  import { enhance } from "$app/forms";
  import { Plus, Search } from "lucide-svelte";
  import Table from "$lib/components/Table.svelte";

  export let data;

  let tableComponent: Table;
  let deleteForm: HTMLFormElement;
  let deleteId = "";
  let searchTerm = "";

  // Reactively filter table when searchTerm changes
  $: if (tableComponent && searchTerm !== undefined) {
    tableComponent.setFilter([
      [
        { field: "firstName", type: "like", value: searchTerm },
        { field: "lastName", type: "like", value: searchTerm },
        { field: "email", type: "like", value: searchTerm },
        { field: "role", type: "like", value: searchTerm },
      ],
    ]);
  }

  // Formatters
  const userFormatter = (cell: any) => {
    const data = cell.getData();
    return `
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs ring-2 ring-white">
          ${data.firstName[0]}${data.lastName[0]}
        </div>
        <div>
          <div class="font-medium text-slate-900 leading-tight">${data.firstName} ${data.lastName}</div>
          <div class="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
             ${data.email}
          </div>
        </div>
      </div>
    `;
  };

  const roleFormatter = (cell: any) => {
    const role = cell.getValue();
    const styles: Record<string, string> = {
      Admin: "bg-purple-100 text-purple-700",
      User: "bg-blue-100 text-blue-700",
      Agent: "bg-emerald-100 text-emerald-700",
    };
    const css = styles[role] || "bg-slate-100 text-slate-700";

    const shieldIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
    const userIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;

    const icon = role === "Admin" ? shieldIcon : userIcon;

    return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${css}">${icon}${role}</span>`;
  };

  const statusFormatter = (cell: any) => {
    const status = cell.getValue();
    let css = "";
    if (status === "Active") css = "bg-emerald-100 text-emerald-700";
    else if (status === "Inactive") css = "bg-slate-100 text-slate-600";
    else css = "bg-amber-100 text-amber-700";

    return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${css}">
        ${status}
    </span>`;
  };

  const actionFormatter = (cell: any) => {
    return `
        <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button class="edit-btn p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors" title="Edit User">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
            </button>
            <button class="delete-btn p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete User">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
            </button>
        </div>
      `;
  };

  // Define Columns
  const columns = [
    {
      title: "USER",
      field: "firstName",
      formatter: userFormatter,
      minWidth: 260,
    },
    { title: "ROLE", field: "role", formatter: roleFormatter, width: 140 },
    {
      title: "STATUS",
      field: "status",
      formatter: statusFormatter,
      width: 140,
    },
    {
      title: "ACTIONS",
      formatter: actionFormatter,
      headerSort: false,
      hozAlign: "right",
      width: 120,
      cellClick: (e: any, cell: any) => {
        const target = e.target as HTMLElement;
        const id = cell.getData().id;

        if (target.closest(".edit-btn")) {
          window.location.href = `/users/${id}/edit`;
        }

        if (target.closest(".delete-btn")) {
          if (confirm("Are you sure you want to delete this user?")) {
            triggerDelete(id);
          }
        }
      },
    },
  ];

  function triggerDelete(id: string) {
    deleteId = id;
    setTimeout(() => {
      deleteForm.requestSubmit();
    }, 0);
  }
</script>

<div class="flex flex-col gap-6 max-w-7xl mx-auto">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-slate-800">User Management</h1>
      <p class="text-slate-500 mt-1">Manage user access and details</p>
    </div>
    <a
      href="/users/add"
      class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm shadow-indigo-200"
    >
      <Plus size={18} />
      Add User
    </a>
  </div>

  <div
    class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col"
  >
    <!-- Toolbar with Search -->
    <div class="p-5 border-b border-slate-100 flex items-center gap-4">
      <div class="relative flex-1 max-w-md">
        <Search
          class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          type="text"
          bind:value={searchTerm}
          placeholder="Search users..."
          class="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm transition-all"
        />
      </div>
    </div>

    <!-- Table Component -->
    <Table
      bind:this={tableComponent}
      data={data.users}
      {columns}
      placeholder="No users found."
    />
  </div>
</div>

<form
  method="POST"
  action="?/delete"
  use:enhance
  bind:this={deleteForm}
  class="hidden"
>
  <input type="hidden" name="id" bind:value={deleteId} />
</form>
