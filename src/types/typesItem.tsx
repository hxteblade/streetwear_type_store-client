export interface IGetItems {
    type: string,
    brand: string,
}

export interface IPagination {
    limit: number,
    page: number,
    typeId: number | null,
    brandId: number | null,
}

export interface Item {
    id: number,
    name: string,
    price: number,
    img: string,
    typeId: number,
    brandId: number,
    info?: [] | null | Info[],
    photos?: [] | null | Photo[],
}

export interface CreateItem {
    name: string,
    price: string,
    preview: Blob,
    brandId: string,
    typeId: string,
    info?: Info[],
    photos?: Blob[],
}

export interface Info {
    title: string,
    description: string,
}

interface Photo {
    id: number,
    name: string,
    itemId: number,
}