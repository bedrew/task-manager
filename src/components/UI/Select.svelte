<script lang="ts">
    export let options: {title: string, value: string}[] = []
    export let form: { [key: string]: any }
    export let value: string
    export let label
  </script>
  
<label class="flex-col flex my-3">
    <span class="text-white">{label}</span>
    <select class="p-2 my-2 rounded-md bg-slate-300" bind:value={form[value]}>
        {#each options as option}
            <option value={option.value}>{option.title}</option>
        {/each}
    </select>
</label>

  