

export type CGeneratorExport = {
    [key: string]: {
        cols?: {
            [key: string]: (index: number) => number | string
        }
    }
}