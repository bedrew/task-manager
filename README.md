# Task-manager

Simple todo list application build with sqlite/astro/svelte

# Installation

Application was developed with Node.js v20.13.1 but 18+ should work fine.

Also as OS was used Ubuntu 24.04 (not tested on any other OS).

To run, first you need a configuration file **config.ts**, copy it from the template **config.ts.example**

```typescript
const appConfig: Config = {
    openAIConfig: {
        url: 'https://api.groq.com/openai/v1/chat/completions',
        token: "TOKEN", // token can be obtained from https://console.groq.com/login (free to use)
        model: 'llama3-8b-8192'
    },
}
```
Also you need to copy **.env.example** to **.env**.

Then run the following command to start application:

```typescript
npm run first-start
```

# Usage
Application is a simple todo list with a few features:

- Add new task
- Edit task
- Delete task
- Mark task as comleted
- Filter tasks by status | prority
- Generate OpenAI description based on the task title

# Pros
- The functionality from the technical specifications is almost or completely implemented

# Cons 
- No test coverage
- Very basic OpenAI integration (no api-limits handling and etc.)

# Challenges
My main challenge was to learn Astro/Svelte/Prisma in a short amount of time and create boilerplate for the project.