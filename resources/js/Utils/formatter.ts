export const itemFormatter = (items: any[]) =>
    items.map((item: any) => item.name).join(', ')

export const characterNameFormatter = (characters: any[]) =>
    characters.map((character: any) => character.name).join(', ')
