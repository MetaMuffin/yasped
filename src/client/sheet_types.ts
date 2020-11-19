
export interface CSheet {
    description?: string,
    col_labels: CellGenerator
    line_labels: CellGenerator
    cells: ColGenerator
}

export type CGeneratorExport = {
    [key: string]: CSheet
}

export interface CellMeta {
    v: string | number
    color_fg?: [number, number, number]
    color_bg?: [number, number, number]
    style?: string
}

export type Cell = string | number | null | CellMeta
export type CellCoordinate = string | number

export type ColGenerator = Array<CellGenerator> | null | ((c: number) => CellGenerator | undefined)
export type CellGenerator = Array<Cell> | null | ((c: number) => Cell | undefined)

