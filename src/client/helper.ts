
export type Callback = () => void



export function unsafeEvalContext(fn_source:string,context: any): () => any {
    var fn = (new Function(fn_source)).bind(context)
    return fn
}