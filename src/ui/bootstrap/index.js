/**
 * render form controls
 */
import UiPlugin from './plugin'

// all ui controls
import Input from './controls/Input'
import Checkbox from './controls/Checkbox'

const controls = [Input, Checkbox]

export default {
    register (UForm) {
        UForm.registerControl(controls.reduce((ret, control) => {
            ret[control.type] = control
            return ret
        }, {}))

        UForm.UiLibPlugin = new UiPlugin()
    }
}
