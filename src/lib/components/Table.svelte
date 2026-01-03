<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte";
    import "tabulator-tables/dist/css/tabulator.min.css";

    export let data: any[] = [];
    export let columns: any[] = [];
    export let paginationSize = 10;
    export let placeholder = "No records found";

    // Expose tabulator instance or methods if needed
    export const setFilter = (filters: any) => {
        if (tabulator) {
            tabulator.setFilter(filters);
        }
    };

    let tableElement: HTMLDivElement;
    let tabulator: any;
    const dispatch = createEventDispatcher();

    onMount(async () => {
        const { TabulatorFull } = await import("tabulator-tables");

        tabulator = new TabulatorFull(tableElement, {
            data: data,
            layout: "fitColumns", // "fitColumns" tries to fit everything in width
            pagination: true,
            paginationSize: paginationSize,
            headerSortElement: function (col, dir) {
                return ""; // Fix "undefined" text
            },
            columns: columns,
            placeholder: placeholder,
            rowFormatter: function (row: any) {
                row.getElement().classList.add("group");
            },
        });
    });

    // React to data prop updates
    $: if (tabulator && data) {
        tabulator.replaceData(data);
    }
</script>

<div class="relative w-full">
    <div bind:this={tableElement} class="tabulator-custom w-full"></div>
</div>

<style>
    /* 
   * PREMIUM CSS OVERRIDES
   * Focusing on lighter borders, better spacing, and smoother interactions.
   */

    :global(.tabulator-custom) {
        font-family: inherit;
        width: 100%;
    }

    :global(.tabulator) {
        border: none !important;
        background-color: transparent !important;
    }

    /* Header Styling */
    :global(.tabulator-header) {
        background-color: #f8fafc !important; /* slate-50 */
        border-bottom: 1px solid #e2e8f0 !important; /* slate-200 */
        border-top: none !important;
        padding-top: 4px;
        padding-bottom: 4px;
        /* FLEXBOX FIX for Layout Issues */
        display: flex !important;
        width: 100% !important;
    }

    :global(.tabulator-header .tabulator-col) {
        background-color: transparent !important;
        border: none !important;
        display: inline-flex !important;
        align-items: center !important;
    }

    :global(.tabulator-header .tabulator-col-content) {
        padding: 12px 24px !important;
        width: 100% !important;
    }

    :global(.tabulator-header .tabulator-col-title) {
        color: #64748b !important; /* slate-500 */
        font-weight: 700 !important;
        font-size: 0.7rem !important; /* Slightly smaller for premium feel */
        text-transform: uppercase !important;
        letter-spacing: 0.08em !important; /* Wider tracking */
    }

    /* Row Styling */
    :global(.tabulator-row) {
        background-color: #ffffff !important;
        border-bottom: 1px solid #f1f5f9 !important; /* slate-100 */
        min-height: 72px !important;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

        /* FLEXBOX FIX for Row Layout */
        display: flex !important;
        width: 100% !important;
    }

    :global(.tabulator-row:hover) {
        background-color: #f8fafc !important;
        transform: translateY(-1px);
        box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.01),
            0 2px 4px -2px rgba(0, 0, 0, 0.01);
        position: relative;
        z-index: 10;
        /* Ensure hover doesn't break layout */
        width: 100% !important;
        display: flex !important;
    }

    :global(.tabulator-cell) {
        border-right: none !important;
        padding: 16px 24px !important;
        display: flex !important;
        align-items: center !important;
        height: auto !important; /* Allow height to fit */
        min-height: 100%;
        color: #334155;
        font-size: 0.875rem;
    }

    /* Footer & Pagination - Modern "Isolated" Look */
    :global(.tabulator-footer) {
        background-color: #ffffff !important;
        border-top: 1px solid #f1f5f9 !important;
        padding: 16px 24px !important;
        width: 100% !important;
    }

    :global(.tabulator-paginator label) {
        display: none;
    }

    :global(.tabulator-page) {
        border-radius: 8px !important;
        border: 1px solid #e2e8f0 !important;
        color: #64748b !important;
        font-weight: 500 !important;
        margin: 0 3px !important;
        padding: 8px 14px !important;
        font-size: 0.875rem;
        transition: all 0.2s;
        background: white !important;
    }

    :global(.tabulator-page:hover) {
        border-color: #cbd5e1 !important;
        color: #0f172a !important;
        background: #f8fafc !important;
    }

    :global(.tabulator-page.active) {
        background-color: #4f46e5 !important;
        color: #ffffff !important;
        border-color: #4f46e5 !important;
        box-shadow: 0 2px 4px rgba(79, 70, 229, 0.1);
    }

    :global(.tabulator-page:disabled) {
        opacity: 0.4;
        cursor: not-allowed;
        border-color: #f1f5f9 !important;
    }

    /* Placeholder Styling */
    :global(.tabulator-placeholder) {
        opacity: 1 !important;
        width: 100% !important;
    }
    :global(.tabulator-placeholder-contents) {
        padding: 4rem !important;
        color: #94a3b8 !important;
        font-weight: 500;
        display: block !important;
    }
</style>
