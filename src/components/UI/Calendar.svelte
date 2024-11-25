<script lang="ts">
    export let label: string
    export let form: { [key: string]: any }
    export let value: string
</script>

<label class="flex-col flex my-3">
    <span class="text-white">{label}</span>
    <input 
        class="p-1.5 my-2 rounded-md bg-slate-300" 
        type="date" bind:value={form[value]} 
        onchange={(e) => console.log(e.currentTarget.value) }
    >
</label>