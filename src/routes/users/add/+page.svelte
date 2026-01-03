<script lang="ts">
  import { ArrowLeft, Save, AlertCircle } from 'lucide-svelte';
  import * as yup from 'yup';
  
  // Validation Schema
  const schema = yup.object().shape({
    firstName: yup.string().required('First name is required').min(2, 'Too short'),
    lastName: yup.string().required('Last name is required').min(2, 'Too short'),
    email: yup.string().email('Invalid email').required('Email is required'),
    role: yup.string().required('Role is required'),
    status: yup.string().required('Status is required'),
  });

  let formValues = {
    firstName: '',
    lastName: '',
    email: '',
    role: 'User',
    status: 'Active'
  };

  let errors: Record<string, string> = {};
  let isSubmitting = false;

  async function handleSubmit() {
    isSubmitting = true;
    errors = {}; // Reset errors

    try {
      await schema.validate(formValues, { abortEarly: false });
      // Simulate API call
      console.log('Form Submitted', formValues);
      alert('User created successfully (Mock)');
      // In real app, redirect or clear form
    } catch (err: any) {
      if (err.inner) {
        err.inner.forEach((e: any) => {
          errors[e.path] = e.message;
        });
      }
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="max-w-3xl mx-auto">
  <div class="flex items-center gap-4 mb-8">
    <a href="/users" class="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors">
      <ArrowLeft size={20} />
    </a>
    <div>
      <h1 class="text-2xl font-bold text-slate-800">Add New User</h1>
      <p class="text-slate-500 mt-1">Create a new user account with role access</p>
    </div>
  </div>

  <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    <form on:submit|preventDefault={handleSubmit} class="p-8 space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- First Name -->
        <div class="space-y-2">
          <label for="firstName" class="block text-sm font-semibold text-slate-700">First Name</label>
          <input 
            type="text" 
            id="firstName"
            bind:value={formValues.firstName}
            class="w-full px-4 py-2.5 rounded-xl border {errors.firstName ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all"
            placeholder="John"
          />
          {#if errors.firstName}
            <p class="text-xs text-rose-500 flex items-center gap-1 mt-1">
              <AlertCircle size={12} /> {errors.firstName}
            </p>
          {/if}
        </div>

        <!-- Last Name -->
        <div class="space-y-2">
          <label for="lastName" class="block text-sm font-semibold text-slate-700">Last Name</label>
          <input 
            type="text" 
            id="lastName" 
            bind:value={formValues.lastName}
            class="w-full px-4 py-2.5 rounded-xl border {errors.lastName ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all"
            placeholder="Doe"
          />
          {#if errors.lastName}
            <p class="text-xs text-rose-500 flex items-center gap-1 mt-1">
              <AlertCircle size={12} /> {errors.lastName}
            </p>
          {/if}
        </div>
      </div>

      <!-- Email -->
      <div class="space-y-2">
        <label for="email" class="block text-sm font-semibold text-slate-700">Email Address</label>
        <div class="relative">
          <input 
            type="email" 
            id="email" 
            bind:value={formValues.email}
            class="w-full px-4 py-2.5 rounded-xl border {errors.email ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all"
            placeholder="john@example.com"
          />
        </div>
        {#if errors.email}
          <p class="text-xs text-rose-500 flex items-center gap-1 mt-1">
            <AlertCircle size={12} /> {errors.email}
          </p>
        {/if}
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Role -->
        <div class="space-y-2">
          <label for="role" class="block text-sm font-semibold text-slate-700">Role</label>
          <select 
            id="role" 
            bind:value={formValues.role}
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all appearance-none"
          >
            <option value="User">User</option>
            <option value="Editor">Editor</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <!-- Status -->
        <div class="space-y-2">
          <label for="status" class="block text-sm font-semibold text-slate-700">Status</label>
          <select 
            id="status" 
            bind:value={formValues.status}
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 bg-slate-50 focus:bg-white outline-none focus:ring-4 transition-all appearance-none"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <div class="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
        <button 
          type="button" 
          class="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
          on:click={() => window.history.back()}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={isSubmitting}
          class="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/20 shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {#if isSubmitting}
            <span>Saving...</span>
          {:else}
            <Save size={18} />
            <span>Create User</span>
          {/if}
        </button>
      </div>
    </form>
  </div>
</div>
