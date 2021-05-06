import { Callback } from "./helper"
import brace from "brace"
import { rebuildCurrentSheet } from "./sheet_build"

export function buildEditor(): HTMLElement {
    var edivmain = document.createElement("div")
    edivmain.classList.add("main")
    var edivcode = buildCodeEditor(() => {
        edivsheets.innerHTML = ""
        edivsheets.appendChild(rebuildCurrentSheet())
    })
    var edivsheets = document.createElement("div")
    edivsheets.classList.add("sheets-divider")

    edivmain.append(edivsheets, edivcode)
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

    var ebuttonrebuild = document.createElement("input")
    ebuttonrebuild.type = "button"
    ebuttonrebuild.value = "Rebuild"
    ebuttonrebuild.onclick = onrebuild
    estatus.appendChild(ebuttonrebuild)

    setTimeout(() => {
        editor.setValue(`
return {
    main: {
        col_labels: ["A * 2", "A squared"],
        line_labels: y => ({
            v: y,
            color_bg: [(y % 3 == 0) ? 0 : 255, 255, 255]
        }),
        cells: [
            y => y * 2,
            y => y ** 2
        ]
    }
}`)
        // editor.setValue(`
        // return {
        //     main: {
        //         cols: ["A", "A * 2", "A squared"],
        //         cells: [
        //             [1,2,3,4],
        //             [5,6,7,8],
        //             [9,10,11,12]
        //         ]
        //     }
        // }`)
        
        onrebuild()
    }, 500)
    
    ediv.append(estatus, eedit)
    return ediv
}
