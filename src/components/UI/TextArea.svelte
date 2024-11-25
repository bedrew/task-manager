<script lang="ts">
    export let label: string
    export let form: { [key: string]: any }
    export let value: string
</script>

<label class="flex-col flex">
    <span class="text-white">{label}</span>
    <textarea class="p-2 my-2 rounded-md bg-slate-300 h-40" bind:value={form[value]} ></textarea>
</label>