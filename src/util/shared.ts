export const time = () => Math.round(new Date().getTime() / 1000)

export const capitalize = (val: string) => String(val).charAt(0).toUpperCase() + String(val).slice(1)

export const cloneObject = <T>(obj: T): T => JSON.parse(JSON.stringify(obj))