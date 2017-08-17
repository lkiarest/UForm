/**
 * render form controls
 */
import UiPlugin from './plugin'

// all ui controls
import Input from './controls/Input'
import Checkbox from './controls/Checkbox'
import Textarea from './controls/Textarea'

const controls = [Input, Checkbox, Textarea]

export default {
    register (UForm) {
        UForm.registerControl(controls.reduce((ret, control) => {
            ret[control.type] = control
            return ret
        }, {}))

        UForm.UiLibPlugin = new UiPlugin()

        const extend = function(Vue) {
            Vue.component('uform', Vue.extend({
                data: () => ({
                    form: null
                }),
                template: '<div></div>',
                props: {
                    options: {
                        type: Object,
                        required: true
                    }
                },
                mounted () {
                    this.form = new UForm(this.$el, this.options)
                },
                methods: {
                    setValue (value) {
                        this.form.setValue(value)
                    },
                    getValue () {
                        return this.form.getValue()
                    }
                }
            }))
        }

        // register [uform] as global component for convenience
        if (window.Vue) {
            extend(Vue)
        } else {
            UForm.install = Vue => extend(Vue)
        }
    }
}
