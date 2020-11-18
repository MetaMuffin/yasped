import { Callback } from "./helper"
import brace from "brace"

export function buildEditor(): HTMLElement {
    var edivmain = document.createElement("div")
    edivmain.classList.add("main")
    var edivcode = buildCodeEditor(() => {

    })
    var edivsheets = document.createElement("div")
    edivsheets.classList.add("sheets-divider")

    edivmain.append(edivsheets,edivcode)
    return edivmain
}

export var editor: brace.Editor

export function buildCodeEditor(onrebuild: Callback): HTMLElement {
    var ediv = document.createElement("div")
    var eedit = document.createElement("div")
    var estatus = document.createElement("div")
    estatus.classList.add("editor-status")
    eedit.classList.add("editor")
    ediv.classList.add("editor-divider")

    editor = brace.edit(eedit)
    editor.getSession().setUseWorker(true);
    editor.setOptions({
        useWrapMode: true,
        highlightActiveLine: true,
        showPrintMargin: false,
        theme: 'ace/theme/dracula',
        mode: 'ace/mode/javascript'
    })


    ediv.append(estatus,eedit)
    return ediv
}
