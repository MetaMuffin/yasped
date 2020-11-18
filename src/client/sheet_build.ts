import { unsafeEvalContext } from "./helper";
import { editor } from "./editor";
import { CGeneratorExport } from "./sheet_types";

export var code_context: any = {
    y: () => console.log("KEKEKEKKEKEKEEKEKKKEKEKEKEKEKEKK")
};

export function getGeneratorExport(): CGeneratorExport {
    var exports: CGeneratorExport = unsafeEvalContext(editor.getValue(),code_context)()
    return exports
}

export function rebuildSheets(gen: CGeneratorExport): HTMLElement {
    var elist = document.createElement("ul")

    



    return elist
}