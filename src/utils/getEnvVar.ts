export const getEnvVar = (name: string, defaultValue?: string): string => {
    const env: any = process.env[name]
    if (!env) {
        if (defaultValue) return defaultValue
        throw `Forgot to declare "${name}" var in your .env?`
    }
    return env
}
