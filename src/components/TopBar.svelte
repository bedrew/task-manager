<script lang="ts">
    import Button from '../components/UI/Button.svelte'
    import { TaskPriorty, TaskStatus } from '../schema/Task';
    export let buttonLabel: string
    export let buttonUrl: string
    export let filter: {
		active: boolean,
		visible: boolean
	} = { active: false, visible: false }
</script>

<div class="sticky top-0 z-40 w-full backdrop-blur flex-none lg:z-50 lg:border-b border-slate-800 bg-transparent">
    <div class="mx-auto max-w-7xl">
        <div class="py-4 border-b border-slate-800 sm:px-4 lg:border-0  mx-4 lg:mx-0">
            <div class="relative flex items-center justify-between">
                <Button label={buttonLabel} link={buttonUrl} />
                {#if filter.visible }
                <div class="hidden sm:flex">
                    {#if !filter.active }<span class="text-white mr-3">Filter: </span>{ /if }
                    <div>
                        {#if !filter.active }
                            <Button
                                label={'High-priority'} 
                                link={`/?priority=${TaskPriorty.HIGH}`} 
                                className='px-4 py-2 font-semibold mr-2 text-sm text-white rounded-full shadow-sm bg-slate-600 hover:bg-slate-500'
                            />
                            <Button 
                                label={'Completed'} 
                                link={`/?status=${TaskStatus.COMPLETE}`} 
                                className='px-4 py-2 font-semibold text-sm text-white rounded-full shadow-sm bg-slate-600 hover:bg-slate-500'
                             />
                        { /if }
                        {#if filter.active }<Button label={'Reset filter'} link={`/`} />{ /if }
                    </div>
                </div>
                { /if }
            </div>
        </div>
    </div>
</div>