import Handlebars from 'handlebars'
import FormControl from 'core/FormControl.js'

const renderer = Handlebars.compile(`
    {{#if label}}<label>{{label}}</label>{{/if}}
    <textarea class="form-control" placeholder="{{placeholder}}" {{readonly}} {{disabled}}></textarea>
`)

class Textarea extends FormControl {
    getData () {
        const schema = this.schema

        return {
            label: this.label,
            placeholder: schema.placeholder || '',
            readonly: schema.readonly ? 'readonly' : '',
            disabled: schema.disabled ? 'disabled' : ''
        }
    }

    getRenderer () {
        return renderer
    }

    setValue (value) {
        if (value === undefined) {
            return
        }

        $(this.getElement()).find('textarea').val(value)
    }

    getValue () {
        return $(this.getElement()).find('textarea').val()
    }
}

Textarea.type = 'textarea'

export default Textarea
