/**
 * render form controls
 */
import controls from './controls'

class UiPlugin {
    apply (form) {
        form.plugin('before-render-control', function() {
            const panel = document.createElement('div')
            panel.className = 'form-group'
            return panel
        })
    }
}

export default {
    controls,
    UiPlugin
}
