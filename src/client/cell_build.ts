import { Cell } from "./sheet_types";
import { Logger } from "./logger";

export function buildCell(cell: Cell, etype: string = "td"): HTMLElement {
    var ecell = document.createElement(etype)
    if (!cell) ecell.textContent = ""
    if (typeof cell == "number") { ecell.textContent = cell.toString(); return ecell }
    if (typeof cell == "string") { ecell.textContent = cell; return ecell }
    if (!cell) {
        ecell.classList.add("cell-empty")
        ecell.appendChild(document.createElement("div"))
        return ecell
    }

    var style = ""
    if (cell.color_bg) style += `background-color: rgb(${cell.color_bg[0]},${cell.color_bg[1]},${cell.color_bg[2]})`
    if (cell.color_fg) style += `foreground-color: rgb(${cell.color_fg[0]},${cell.color_fg[1]},${cell.color_fg[2]})`
    if (cell.style) style += cell.style
    ecell.setAttribute("style", style)

    if (cell.v === undefined) return buildCellError(cell,`Cell is missing key 'v'`)
    ecell.textContent = cell.v.toString()
    return ecell
}

export function buildCellError(cell: Cell, message: string) {
    Logger.log(["err","cell_builder"],message)
    console.log(cell);
    var ecell = document.createElement("td")
    ecell.classList.add("cell-error")
    ecell.textContent = "ERROR"
    return ecell
}