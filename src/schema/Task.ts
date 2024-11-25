import { z } from "astro/zod"

export enum TaskStatus {
    COMPLETE = 'COMPLETE', 
    ACTIVE = 'ACTIVE' 
}

export enum TaskPriorty {
    LOW = 'LOW', 
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}

export const taskSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(5).max(64),
    description: z.string().max(4096).optional(),
    priority: z.nativeEnum(TaskPriorty),
    tsExpire: z.number(),
    status: z.nativeEnum(TaskStatus)
})

export type TaskType = z.infer<typeof taskSchema>
