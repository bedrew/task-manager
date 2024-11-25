<script lang="ts">
    export let label: string
    export let form: { [key: string]: any }
    export let value: string
</script>

<label class="flex-col flex my-3 w-full">
    <span class="text-white">{label}</span>
    <input class="p-2 my-2 rounded-md bg-slate-300" bind:value={form[value]} />
</label>
