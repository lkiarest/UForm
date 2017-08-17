import Handlebars from 'handlebars'
import FormControl from 'core/FormControl.js'

const renderer = Handlebars.compile(`
    {{#if label}}<label>{{label}}</label>{{/if}}
    <input type="text" class="form-control" placeholder="{{placeholder}}" {{readonly}} {{disabled}}>
`)

class Input extends FormControl {
    getData () {
        const schema = this.schema

        return {
            label: this.label,
            placeholder: schema.placeholder || '',
            readonly: schema.readonly ? 'readonly' : '',
            disabled: schema.disabled ? 'disabled' : '',
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

        $(this.getElement()).find('input').val(value)
    }

    getValue () {
        return $(this.getElement()).find('input').val()
    }
}

Input.type = 'input'

export default Input
