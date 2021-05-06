import { unsafeEvalContext } from "./helper";
import { editor } from "./editor";
import { CGeneratorExport, Cell, CellCoordinate, CellGenerator, ColGenerator, CSheet } from "./sheet_types";
import { buildCell } from "./cell_build";

export var code_context: any = {
    y: () => console.log("KEKEKEKKEKEKEEKEKKKEKEKEKEKEKEKK")
};

export function updateGeneratorExport(): CGeneratorExport {
    var exports: CGeneratorExport = unsafeEvalContext(editor.getValue(), code_context)()
    sheetsGenerator = exports
    return exports
}

export var sheetsGenerator: CGeneratorExport
export var sheetsCached: { [key: string]: (Cell)[][] }

export function getCellCached(sheet: string, x: CellCoordinate, y: CellCoordinate): Cell {
    if (typeof x == "string") throw new Error("Unimplemented!");
    if (typeof y == "string") throw new Error("Unimplemented!");

    if (!(sheetsCached[sheet] && sheetsCached[sheet][x])) return null
    var cell = sheetsCached[sheet][x][y]
    return cell
}

export function getCell(sheet: string, x: CellCoordinate, y: CellCoordinate): Cell {
    var cell = null
    //var cell = getValueCached(sheet, x, y)
    //console.log(`getValue(${sheet}, ${x}, ${y})`);
    if (cell !== null) return cell
    cell = generateCell(sheet, x, y)
    return cell
}

export function generateCell(sheet: string, x: CellCoordinate, y: CellCoordinate): Cell {
    var s = sheetsGenerator[sheet]
    if (!s) return null
    var cellgen = invokeColGenerator(s.cells, x)
    var cell = invokeCellGenerator(cellgen, y)
    if (typeof y != "number" || typeof x != "number") return cell

    if (!sheetsCached[sheet]) sheetsCached[sheet] = []
    if (!sheetsCached[sheet][x]) sheetsCached[sheet][x] = []
    sheetsCached[sheet][x][y] = cell
    return cell
}

export function invokeCellGenerator(gen: CellGenerator, coord: CellCoordinate): Cell {
    if (typeof coord == "string") throw new Error("Unimplemented");
    if (!gen) return null
    if (typeof gen == "function") {
        var res = gen(coord)
        if (res === undefined) return null
        return res
    }
    return gen[coord]
}

export function invokeColGenerator(gen: ColGenerator, coord: CellCoordinate): CellGenerator {
    if (typeof coord == "string") throw new Error("Unimplemented");
    if (!gen) return null
    if (typeof gen == "function") {
        var res = gen(coord)
        if (res === undefined) return null
        return res
    }

    return gen[coord]
}

export function rebuildCurrentSheet(): HTMLElement {
    updateGeneratorExport()
    sheetsCached = {}
    var esheet = rebuildSheet("main", sheetsGenerator["main"])
    return esheet
}


export function rebuildSheet(sheetname: string, sheetgen: CSheet): HTMLElement {
    var etable = document.createElement("table")
    var max_x = 0
    var max_y = 0
    var offset_x = (sheetgen.line_labels) ? -1 : 0
    var offset_y = (sheetgen.col_labels) ? -1 : 0


    const appendLine = () => {
        var line = document.createElement("tr")
        for (let x = 0; x < max_x; x++) {
            if (x==0 && max_y == 0) line.appendChild(buildCell(null))
            else if (x == 0 && sheetgen.line_labels) {
                line.appendChild(buildCell(invokeCellGenerator(sheetgen.line_labels, max_y + offset_y), "th"))
            } else if (max_y == 0 && sheetgen.col_labels) {
                line.appendChild(buildCell(invokeCellGenerator(sheetgen.col_labels,x + offset_x)))
            } else {
                
                line.appendChild(buildCell(getCell(sheetname, x + offset_x, max_y + offset_y)))
            }
        }
        etable.appendChild(line)
        max_y++
    }
    const appendCol = () => {
        for (let y = 0; y < max_y; y++) {
            const e = etable.children[y];
            if (y==0 && max_x == 0) e.appendChild(buildCell(null))
            else if (y == 0 && sheetgen.col_labels) {
                e.appendChild(buildCell(invokeCellGenerator(sheetgen.col_labels, max_x + offset_x), "th"))
            } else if (max_x == 0 && sheetgen.line_labels) {
                e.appendChild(buildCell(invokeCellGenerator(sheetgen.line_labels,y + offset_y)))
            } else {
                e.appendChild(buildCell(getCell(sheetname, max_x + offset_x, y + offset_y)))
            }
        }
        max_x++
    }

    const scrollHandler = () => {
        if (!etable.parentElement) return
        while (etable.parentElement.scrollTop + etable.parentElement.offsetHeight + 200 > etable.offsetHeight) appendLine()
        while (etable.parentElement.scrollLeft + etable.parentElement.offsetWidth + 200 > etable.offsetWidth) appendCol()
    }

    setTimeout(() => {
        if (!etable.parentElement) throw new Error("No parent of etable in sheet");
        etable.parentElement.onscroll = scrollHandler
        for (let i = 0; i < 50; i++) appendCol()
        for (let i = 0; i < 50; i++) appendLine()
    }, 0)

    return etable
}
