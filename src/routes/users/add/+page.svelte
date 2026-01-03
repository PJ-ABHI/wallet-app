<script lang="ts">
  import {
    ArrowLeft,
    Save,
    AlertCircle,
    UploadCloud,
    FileText,
  } from "lucide-svelte";
  import { enhance } from "$app/forms";
  import FileUpload from "$lib/components/FileUpload.svelte";

  export let form;
</script>

<div class="max-w-3xl mx-auto">
  <div class="flex items-center gap-4 mb-8">
    <a
      href="/users"
      class="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
    >
      <ArrowLeft size={20} />
    </a>
    <div>
      <h1 class="text-2xl font-bold text-slate-800">Add New User</h1>
      <p class="text-slate-500 mt-1">
        Create a new user account with role access
      </p>
    </div>
  </div>

  <div
    class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
  >
    <form
      method="POST"
      enctype="multipart/form-data"
      use:enhance
      class="p-8 space-y-8"
    >
      <!-- Personal Info Section -->
      <div class="space-y-6">
        <h3
          class="font-semibold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100"
        >
          Personal Information
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- First Name -->
          <div class="space-y-2">
            <label
              for="firstName"
              class="block text-sm font-semibold text-slate-700"
              >First Name</label
            >
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={form?.values?.firstName ?? ""}
              class="w-full px-4 py-2.5 rounded-xl border {form?.errors
                ?.firstName
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
                : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all"
              placeholder="John"
            />
            {#if form?.errors?.firstName}
              <p class="text-xs text-rose-500 flex items-center gap-1 mt-1">
                <AlertCircle size={12} />
                {form.errors.firstName}
              </p>
            {/if}
          </div>

          <!-- Last Name -->
          <div class="space-y-2">
            <label
              for="lastName"
              class="block text-sm font-semibold text-slate-700"
              >Last Name</label
            >
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={form?.values?.lastName ?? ""}
              class="w-full px-4 py-2.5 rounded-xl border {form?.errors
                ?.lastName
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
                : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all"
              placeholder="Doe"
            />
            {#if form?.errors?.lastName}
              <p class="text-xs text-rose-500 flex items-center gap-1 mt-1">
                <AlertCircle size={12} />
                {form.errors.lastName}
              </p>
            {/if}
          </div>
        </div>

        <!-- Email -->
        <div class="space-y-2">
          <label for="email" class="block text-sm font-semibold text-slate-700"
            >Email Address</label
          >
          <div class="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={form?.values?.email ?? ""}
              class="w-full px-4 py-2.5 rounded-xl border {form?.errors?.email
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
                : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all"
              placeholder="john@example.com"
            />
          </div>
          {#if form?.errors?.email}
            <p class="text-xs text-rose-500 flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              {form.errors.email}
            </p>
          {/if}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Role -->
          <div class="space-y-2">
            <label for="role" class="block text-sm font-semibold text-slate-700"
              >Role</label
            >
            <select
              name="role"
              id="role"
              value={form?.values?.role ?? "User"}
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all appearance-none"
            >
              <option value="User">User</option>
              <option value="Agent">Agent</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <!-- Status -->
          <div class="space-y-2">
            <label
              for="status"
              class="block text-sm font-semibold text-slate-700">Status</label
            >
            <select
              name="status"
              id="status"
              value={form?.values?.status ?? "Active"}
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all appearance-none"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Verified Documents Section -->
      <div class="space-y-6">
        <h3
          class="font-semibold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100"
        >
          Identity Verification Documents
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FileUpload name="aadhar" label="Aadhar Card" />
          <FileUpload name="pan" label="PAN Card" />
          <FileUpload name="voterId" label="Voter ID" />
        </div>
      </div>

      <div
        class="pt-6 border-t border-slate-100 flex items-center justify-end gap-3"
      >
        <a
          href="/users"
          class="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
        >
          Cancel
        </a>
        <button
          type="submit"
          class="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/20 shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2"
        >
          <Save size={18} />
          <span>Create User</span>
        </button>
      </div>
    </form>
  </div>
</div>
