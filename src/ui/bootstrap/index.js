/**
 * render form controls
 */
import UiPlugin from './plugin'

// all ui controls
import Input from './controls/Input'
import Checkbox from './controls/Checkbox'
import Radio from './controls/Radio'
import Textarea from './controls/Textarea'

const controls = [Input, Checkbox, Radio, Textarea]

export default {
    register (UForm) {
        UForm.registerControl(controls.reduce((ret, control) => {
            ret[control.type] = control
            return ret
        }, {}))

        UForm.UiLibPlugin = new UiPlugin()
    }
}
