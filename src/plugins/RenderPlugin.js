/**
 * render form controls
 */

class RenderPlugin {
    apply (form) {
        form.plugin('before-render-form', function(options) {
            form.container.innerHtml = '' // clear
        })
    }
}

export default RenderPlugin
