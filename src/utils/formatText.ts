export const pluralize = (keyword: string, count: number) => {
    if (count <= 1) return keyword
    else `${keyword}s`
}
