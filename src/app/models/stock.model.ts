export interface WAREHOUSE {
    name: string,
    location: string
}
export interface ITEM {
    name: string,
    code: string,
    unit: 'NO' | 'KG' | 'Meter',
    costPrice
}