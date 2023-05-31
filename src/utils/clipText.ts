export const clipText = (text: string, limit: number) => {
    return `${text.slice(0, limit + 1)}...`
}