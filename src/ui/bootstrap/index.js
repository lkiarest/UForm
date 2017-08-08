/**
 * render form controls
 */
import CONTROLS from './controls'

class UiPlugin {
    apply (form) {
        form.plugin('register-controls', function(register) {
            for (let type in CONTROLS) {
                register(type, CONTROLS[type])
            }
        })

        form.plugin('before-render-control', function() {
            const panel = document.createElement('div')
            panel.className = 'form-group'
            return panel
        })
    }
}

export default UiPlugin
