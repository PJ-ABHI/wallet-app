<script lang="ts">
    import {
        Search,
        Filter,
        Download,
        ArrowUpRight,
        ArrowDownLeft,
        Calendar,
        X,
    } from "lucide-svelte";
    import Table from "$lib/components/Table.svelte";

    export let data;

    // Data from server
    $: transactions = data.transactions;
    $: users = data.users;

    let tableComponent: Table;
    let searchTerm = "";
    let selectedDate = "";

    // Reactive Filtering: Combines Text Search + Date Filter
    $: if (tableComponent) {
        const filters: any[] = [];

        // 1. Text Search (OR logic across fields)
        if (searchTerm) {
            filters.push([
                { field: "description", type: "like", value: searchTerm },
                { field: "userEmail", type: "like", value: searchTerm },
                { field: "status", type: "like", value: searchTerm },
                { field: "type", type: "like", value: searchTerm },
            ]);
        }

        // 2. Date Filter (AND logic)
        if (selectedDate) {
            // Custom filter to compare date part only (ignoring time)
            filters.push({
                field: "date",
                type: function (
                    headerValue: any,
                    rowValue: any,
                    rowData: any,
                    filterParams: any,
                ) {
                    // rowValue is from the data (e.g. ISO string or timestamp)
                    // headerValue is the selectedDate (YYYY-MM-DD from input)
                    const rowDate = new Date(rowValue)
                        .toISOString()
                        .split("T")[0];
                    return rowDate === headerValue;
                },
                value: selectedDate,
            });
        }

        tableComponent.setFilter(filters);
    }

    // Formatters
    const typeFormatter = (cell: any) => {
        const data = cell.getData();
        const isCredit = data.type === "Credit";
        const bgColor = isCredit ? "bg-emerald-100" : "bg-rose-100";
        const textColor = isCredit ? "text-emerald-600" : "text-rose-600";

        // Using SVG strings for simplicity
        const icon = isCredit
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 7 7 17"/><path d="M17 17H7V7"/></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>`;

        return `
         <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full flex items-center justify-center ${bgColor} ${textColor}">
                ${icon}
            </div>
            <div>
                <p class="font-medium text-slate-900 leading-tight">${data.description}</p>
                <p class="text-xs text-slate-500 uppercase tracking-wider mt-0.5">${data.type}</p>
            </div>
         </div>
      `;
    };

    const amountFormatter = (cell: any) => {
        const data = cell.getData();
        const isCredit = data.type === "Credit";
        const color = isCredit ? "text-emerald-600" : "text-slate-900";
        const sign = isCredit ? "+" : "-";
        return `<span class="font-semibold ${color}">${sign}$${data.amount.toLocaleString()}</span>`;
    };

    const statusFormatter = (cell: any) => {
        const status = cell.getValue();
        let css = "";
        if (status === "Completed") css = "bg-emerald-100 text-emerald-700";
        else if (status === "Pending") css = "bg-amber-100 text-amber-700";
        else css = "bg-rose-100 text-rose-700";

        return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${css}">${status}</span>`;
    };

    const dateFormatter = (cell: any) => {
        const date = new Date(cell.getValue()).toLocaleDateString();
        return `
        <div class="flex items-center gap-1.5 text-slate-500 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            ${date}
        </div>
      `;
    };

    const columns = [
        {
            title: "TRANSACTION DETAILS",
            field: "description",
            formatter: typeFormatter,
            minWidth: 280,
        },
        { title: "USER", field: "userEmail", width: 220 },
        { title: "DATE", field: "date", formatter: dateFormatter, width: 160 },
        {
            title: "AMOUNT",
            field: "amount",
            formatter: amountFormatter,
            width: 140,
        },
        {
            title: "STATUS",
            field: "status",
            formatter: statusFormatter,
            width: 140,
        },
    ];

    // Export to CSV
    function exportCSV() {
        const headers = [
            "ID",
            "User",
            "Type",
            "Amount",
            "Date",
            "Status",
            "Description",
        ];

        // Use filtered data if accessible, otherwise use source data
        // For accurate export respecting filters, simplest here is source data unless we read back from table.
        // Given current simple filters, filtering the source array here mirrors the table logic.

        let rowsData = transactions;

        // Simple manual filter mirror for CSV export (Optional, but better UX)
        if (searchTerm || selectedDate) {
            rowsData = transactions.filter((t: any) => {
                const rowDate = new Date(t.date).toISOString().split("T")[0];
                const dateMatch = !selectedDate || rowDate === selectedDate;
                const searchLower = searchTerm.toLowerCase();
                // Matches existing table logic mostly
                const searchMatch =
                    !searchTerm ||
                    t.description.toLowerCase().includes(searchLower) ||
                    t.userEmail.toLowerCase().includes(searchLower) ||
                    t.status.toLowerCase().includes(searchLower) ||
                    t.type.toLowerCase().includes(searchLower);
                return dateMatch && searchMatch;
            });
        }

        const rows = rowsData.map((t: any) => [
            t.id,
            t.userEmail,
            t.type,
            t.amount,
            new Date(t.date).toLocaleDateString(),
            t.status,
            t.description,
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map((row: any) => row.join(",")),
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `transactions-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }
</script>

<div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold text-slate-800">Transactions</h1>
            <p class="text-slate-500 mt-1">
                Monitor and export system transactions
            </p>
        </div>
        <button
            on:click={exportCSV}
            class="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
            <Download size={18} />
            Export CSV
        </button>
    </div>

    <div
        class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col"
    >
        <!-- Toolbar -->
        <div
            class="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4"
        >
            <!-- Search -->
            <div class="flex items-center gap-4 flex-1 min-w-[300px]">
                <div class="relative flex-1 max-w-md">
                    <Search
                        class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                    />
                    <input
                        type="text"
                        bind:value={searchTerm}
                        placeholder="Search transactions..."
                        class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm transition-all shadow-sm"
                    />
                </div>
            </div>

            <!-- Date Filter -->
            <div class="relative">
                <div class="relative">
                    <input
                        type="date"
                        bind:value={selectedDate}
                        class="pl-10 pr-8 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none shadow-sm cursor-pointer transition-all"
                    />
                    <Calendar
                        class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        size={18}
                    />
                </div>

                {#if selectedDate}
                    <button
                        on:click={() => (selectedDate = "")}
                        class="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
                        title="Clear date"
                    >
                        <X size={14} />
                    </button>
                {/if}
            </div>
        </div>

        <!-- Table Component -->
        <Table
            bind:this={tableComponent}
            data={transactions}
            {columns}
            placeholder="No transactions found."
        />
    </div>
</div>
