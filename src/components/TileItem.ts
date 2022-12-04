import images from "../images/images"

export type TileItem = {
    type: string
    n: number
}

export const img = (t: TileItem): any => images[`${t.n}${t.type}`]
