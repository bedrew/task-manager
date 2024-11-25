<script lang="ts">
    import Button from '../components/UI/Button.svelte'
    import Input from '../components/UI/Input.svelte'
    import TextArea from '../components/UI/TextArea.svelte'
    import Select from '../components/UI/Select.svelte'
    import Calendar from '../components/UI/Calendar.svelte'
    import { TaskPriorty, TaskStatus, type TaskType } from "../schema/Task"
    import { capitalize, cloneObject } from "../util/shared"
    import { actions } from "astro:actions"

    export let entity: TaskType
    
    let error = ''
    let form = { 
        ...cloneObject(entity), 
        date: new Date(Number(entity.tsExpire) * 1000).toISOString().split('T')[0] 
    }
    
    const getErrorMessage = (result: any) => {
        let error = ''
        if(result.error && result.data && result.data.fields) { 
            const message: string[] = []
            for (const key in result.data.fields) {
                result.data.fields[key].forEach((error: string) => {
                    message.push(`${capitalize(key)}: ${error}`)
                })
            }
            error = message.join('\n')
        }
        if(result.error && !error) {
            error = result.data
        }
        return error
    }

    const handleClick = (callback: () => Promise<any>) => async () => {
        error = ''
        const errorMessage = getErrorMessage(await callback())
        if(errorMessage) {
            error = errorMessage
            return 
        }
        location.href = '/'
    }

    const getResultWithError = <T>(data: T): T => (data as any)
            .then((r:any) => { 
                if(r.error) {
                    return { error: true, data: r.error }
                }
                if(r.data && r.data.error) {
                    return { error: true, data: r.data.error }
                }
                return { error: false, data: r.data }
            })
            .catch((r: any) => ({ error: true, data: r.message }))

    const handleUpdate = async () => {       
        form.tsExpire = new Date(form.date as string).getTime() / 1000
        return getResultWithError(actions.task.update(form))
    }

    const handleDelete = async () => {       
        if(!form.id) {
            throw new Error('No id provided')
        }
        return getResultWithError(actions.task.delete(form.id))
    }

    const handleAutoComplete = async () => {
        error = ''
        const result: any = await getResultWithError(actions.openAI.autocomplete(form.title))
        if(result.error) {
            error = result.data.message
            return
        }
        form.description = result.data.join('\n')
    }

    const getOptions = <T extends Object>(obj: T) => Object
            .keys(obj)
            .map(i => ({ title: capitalize(i.toLowerCase()), value: i }))

</script>

<form class="mx-auto max-w-7xl">
    { #if error }<div class="text-black bg-red-300 p-2 rounded-md mt-5"><p>{ error }</p></div>{ /if }
    <Input value={'title'} form={form} label={'Title'} />
    <TextArea value={'description'} form={form} label={'Description'} />
    <div class="mb-2 mt-2">
        <Button label={'Generate description'} onclick={()=> {
           return handleAutoComplete()
        }}></Button>
    </div>
    <div class="sm:flex">
        <div class="sm:mr-4">
            <Select
                options={getOptions(TaskPriorty)}
                form={form}
                value={'priority'}
                label={'Priority'}
            />
        </div>
        <div class="sm:mr-4">
            <Select
                options={getOptions(TaskStatus)}
                form={form}
                value={'status'}
                label={'Status'}
            />
        </div>
        <div class="sm:mr-4">
            <Calendar value={'date'} form={form} label={'Due Date'} />
        </div>
    </div>
    <Button label={form.id ? 'Update': 'Create'} onclick={handleClick(handleUpdate)} />
    { #if form.id }
        <Button 
            label={'Delete'} 
            className={'px-4 py-2 font-semibold text-sm text-white rounded-full shadow-sm bg-red-500 hover:bg-red-700 ml-2'} 
            onclick={handleClick(handleDelete)} 
        />
    { /if }
</form>