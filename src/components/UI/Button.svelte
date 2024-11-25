<script lang="ts">
    export let label = ''
    export let link = ''
    export let onclick: (() => Promise<void>|void)|undefined = undefined
    export let className: string = 'px-4 py-2 font-semibold text-sm text-white rounded-full shadow-sm bg-slate-600 hover:bg-slate-500'
    let disabled = false
</script>

{ #if onclick }
<button
    disabled={disabled}
    type="button"
    class={className}
    on:click={ 
        async () => {
            disabled = true
            try { 
                await onclick()
            } catch (e) { console.error(e) }
            disabled = false
        } 
    }
>{ label }</button>
{ :else }
<a
    href={ link }
    class={className}
>{ label }</a>
{ /if }