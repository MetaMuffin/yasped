import { buildEditor } from "./editor"







function init() {
    document.body.appendChild(buildEditor())
    console.log("LOAD!");
}

window.onload = init

