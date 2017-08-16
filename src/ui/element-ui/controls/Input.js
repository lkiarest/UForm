import Handlebars from 'handlebars'
import FormControl from 'core/FormControl.js'

const renderer = Handlebars.compile(`
    <el-input v-model="form.{{name}}" placeholder='{{placeholder}}' :disabled={{disabled}}></el-input>
`)

class Input extends FormControl {
    getData () {
        const schema = this.schema

        return {
            name: this.name,
            label: this.label,
            placeholder: schema.placeholder || '',
            readonly: schema.readonly ? 'readonly' : '',
            disabled: !!schema.disabled,
            inputType: schema.inputType || 'text'
        }
    }

    getRenderer () {
        return renderer
    }

    setValue (value) {
        if (value === undefined) {
            return
        }
    }

    getValue () {
    }
}

Input.type = 'input'

export default Input
