/**
 * 专门打日志
 */
const DebugPlugin = {
    apply (form) {
        form.plugin('after-render-control', function(formBody, control) {
            console.log(formBody)
        })
    }
}

window.DebugPlugin = DebugPlugin
