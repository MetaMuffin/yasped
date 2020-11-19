import { Cell } from "./sheet_types";

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

    ecell.textContent = cell.v.toString()
    return ecell
}