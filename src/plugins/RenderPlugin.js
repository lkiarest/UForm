/**
 * render form controls
 */

class RenderPlugin {
    apply (form) {
        form.plugin('before-render', function(options) {
            console.log('[before-render]')
            form.container.innerHtml = '' // clear
        })

        form.plugin('render-control', function(options, control) {
            console.log('[render-control]')
            control.render(form.container)
        })
    }
}

export default RenderPlugin
