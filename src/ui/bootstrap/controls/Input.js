import Handlebars from 'handlebars'
import FormControl from 'core/FormControl.js'

const renderer = Handlebars.compile(`
    <label>{{label}}</label>
    <input type="{{attrs.type}}" class="form-control" placeholder="{{placeholder}}" {{readonly}} {{disabeld}}>
`)

class Input extends FormControl {
    getData () {
        const schema = this.schema

        return {
            label: this.label,
            placeholder: schema.placeholder || '',
            readonly: schema.readonly ? 'readonly' : '',
            disabeld: schema.disabeld ? 'disabeld' : ''
        }
    }

    getRenderer () {
        return renderer
    }

    setValue (value) {
        $(this.getElement()).find('input').val(value)
    }

    getValue () {
        return $(this.getElement()).find('input').val()
    }
}

Input.type = 'input'

export default Input
