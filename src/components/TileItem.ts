import images from "../images/images"

export type TileItem = {
    type: string
    n: number
}

export const img = (t: TileItem) => (images as any)[`${t.n}${t.type}`]
