/**
 * 调试用 plugin
 */
const DebugPlugin = {
    apply (form) {
        form.plugin('after-render-control', function(formBody, control) {
            console.log('[DebugPlugin]:' + formBody)
        })
    }
}

window.DebugPlugin = DebugPlugin
