<script lang="ts">
    import { UploadCloud, FileCheck, X, FileText } from "lucide-svelte";
    import { slide } from "svelte/transition";

    export let name: string;
    export let label: string;
    export let accept: string = ".pdf,image/*";
    export let existingFile: string | null = null;

    let inputElement: HTMLInputElement;
    let fileName: string | null = null;
    let dragging = false;

    function handleChange(e: Event) {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            fileName = target.files[0].name;
        } else {
            fileName = null;
        }
    }

    function handleDrop(e: DragEvent) {
        e.preventDefault();
        dragging = false;
        if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
            const files = e.dataTransfer.files;
            inputElement.files = files; // Manually assign to input
            fileName = files[0].name;
        }
    }

    function clearFile(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        inputElement.value = "";
        fileName = null;
    }
</script>

<div class="space-y-2">
    <label for={name} class="block text-sm font-semibold text-slate-700"
        >{label}</label
    >

    <!-- Svelte a11y: label acts as trigger for hidden input -->
    <label
        class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 group relative overflow-hidden
      {dragging
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}
      {fileName ? 'border-emerald-500 bg-emerald-50' : ''}
      {existingFile && !fileName ? 'border-indigo-200 bg-indigo-50/30' : ''}"
        on:dragover|preventDefault={() => (dragging = true)}
        on:dragleave={() => (dragging = false)}
        on:drop={handleDrop}
    >
        {#if fileName}
            <!-- New File Selected -->
            <div
                class="flex flex-col items-center justify-center pt-5 pb-6 text-emerald-600 animate-in fade-in zoom-in-95"
                transition:slide
            >
                <FileCheck size={32} class="mb-2" />
                <p class="mb-1 text-sm font-semibold truncate max-w-[200px]">
                    {fileName}
                </p>
                <p class="text-xs opacity-80">Ready to upload</p>

                <button
                    on:click={clearFile}
                    class="absolute top-2 right-2 p-1 bg-white/50 hover:bg-white text-emerald-700 rounded-full transition-colors"
                    title="Remove file"
                >
                    <X size={14} />
                </button>
            </div>
        {:else if existingFile}
            <!-- Existing File Display -->
            <div
                class="flex flex-col items-center justify-center pt-5 pb-6 text-slate-600"
            >
                <FileText size={32} class="mb-2 text-indigo-500" />
                <p class="mb-1 text-sm font-semibold truncate max-w-[200px]">
                    {existingFile.split("/").pop() ?? "Document Uploaded"}
                </p>
                <p class="text-[10px] text-slate-400">Click to replace</p>
            </div>
            <div
                class="absolute top-2 right-2 bg-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full font-bold"
            >
                Saved
            </div>
        {:else}
            <!-- Default State -->
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud
                    size={24}
                    class="text-slate-400 mb-2 group-hover:text-indigo-500 transition-colors {dragging
                        ? 'text-indigo-500 scale-110'
                        : ''}"
                />
                <p class="mb-1 text-xs text-slate-500 font-medium">
                    Click or drag {label.toLowerCase()}
                </p>
                <p class="text-[10px] text-slate-400">PDF, JPG or PNG</p>
            </div>
        {/if}

        <input
            {name}
            id={name}
            type="file"
            class="hidden"
            {accept}
            bind:this={inputElement}
            on:change={handleChange}
        />
    </label>
</div>
