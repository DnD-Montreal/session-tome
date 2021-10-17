/* eslint-disable no-undef */
export const CharacterDetailData = [
    {
        date: '5-10-2021',
        adventure: 'Cupcake',
        session: 21,
        level: 14,
        gp: 100,
        downtime: 10,
        magicItems: ['Item 3', 'Item 7'],
    },
    {
        date: '3-3-2021',
        adventure: 'Donut',
        session: 22,
        level: 16,
        gp: 50,
        downtime: 12,
        magicItems: ['Item 6'],
    },
    {
        date: '12-11-2020',
        adventure: 'Eclair',
        session: 23,
        level: 9,
        gp: 25,
        downtime: 20,
        magicItems: ['Item 2'],
    },
    {
        date: '5-10-2020',
        adventure: 'Frozen yoghurt',
        session: 24,
        level: 32,
        gp: 75,
        downtime: 24,
        magicItems: ['Item 4'],
    },
    {
        date: '31-10-2019',
        adventure: 'Gingerbread',
        session: 25,
        level: 2,
        gp: 60,
        downtime: 8,
        magicItems: ['Item 5'],
    },
    {
        date: '12-5-2018',
        adventure: 'Cookie',
        session: 26,
        level: 4,
        gp: 30,
        downtime: 15,
        magicItems: ['Item 1'],
    },
]

export interface RowData {
    date: string
    adventure: string
    session: number
    level: number
    gp: number
    downtime: number
    magicItems: string[]
}
