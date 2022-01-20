export const itemFormatter = (items: any[]) => {
    if (items.length === 0) return 'None'
    let value: string = ''
    items.forEach((item: any, index: number) => {
        if (index !== 0) {
            value += ', '
        }
        value += item.name
    })
    return value
}
