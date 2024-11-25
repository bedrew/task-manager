// src/actions/index.ts
import { defineAction } from "astro:actions"
import prisma from "../../prisma/db"
import type { Task } from "@prisma/client"
import { taskSchema } from "../schema/Task"
import { z } from "astro/zod"
import { getConfig, OpenAIConfig } from "../config"

const getDayStartTimestamp = (ts: number) => {
    const dayStart = new Date(ts * 1000)
    dayStart.setHours(0)
    dayStart.setMinutes(0)
    dayStart.setSeconds(0)
    dayStart.setMilliseconds(0)
    return Math.floor(dayStart.getTime() / 1000)
}

export const server = {
    task: {
        collection: defineAction({
            input: z.object({
                filter: z.array(z.object({ key: z.string(), value: z.string() })).optional()
            }), 
            handler: async (data) => {
                const query: any = { 
                    orderBy: { id: "desc" }
                }
                if(data.filter) {
                    query.where = {}
                    for (const item of data.filter) {
                        query.where[item.key] = item.value
                    }
                }
                return prisma.task.findMany(query)
            },
        }),
        update: defineAction({
            accept: "json",
            input: taskSchema, 
            handler: async (data) => {
                const dataTimestamp = getDayStartTimestamp(data.tsExpire)
                const nowTimestamp = getDayStartTimestamp(Date.now() / 1000)
                if(dataTimestamp !== nowTimestamp && dataTimestamp < nowTimestamp) { 
                    throw new Error("Expiration date must be today or in the future")
                }
                if(data.id) {
                    return prisma.task.update({ where: { id: data.id }, data: data as any as Task })
                }
                return prisma.task.create({ data: data as any as Task })
            },
        }),
        findById: defineAction({
            accept: "json",
            input: z.number(), 
            handler: async (id) => {
                return prisma.task.findFirst({ where: { id } })
            },
        }),
        delete: defineAction({
            accept: "json",
            input: z.number(), 
            handler: async (id) => {
                return prisma.task.delete({ where: { id } })
            },
        })
    },
    openAI: {
        autocomplete: defineAction({
            accept: "json",
            input: z.string().min(5).max(64), 
            handler: async (data) => {
                const openAIConfig = getConfig(OpenAIConfig)
                return fetch(openAIConfig.url, {
                    method: 'POST', 
                    headers: {
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${openAIConfig.token}`,
                    },
                    body: JSON.stringify({
                        model: openAIConfig.model,
                        messages: [
                            {
                                "role": "user",
                                "content": `${openAIConfig.prompt} ${data}`
                            }
                        ]
                    })
                }).then(result => result.json())
                    .then(r=> r.choices.map((i:any) => i.message.content))
            },
        })
    }
}