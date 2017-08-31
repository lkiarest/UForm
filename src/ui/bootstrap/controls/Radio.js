import Handlebars from 'handlebars'
import FormControl from 'core/FormControl.js'

let cnt = 0

const renderer = Handlebars.compile(`
    {{#if label}}<label>{{label}}</label>{{/if}}
    {{#each options}}
    <div class='radio'>
        <label type="radio">
            <input type="radio" name="{{../inputName}}" value="{{value}}">
            {{name}}
        </label>
    </div>
    {{/each}}
`)

class Radio extends FormControl {
    constructor (schema) {
        super(schema)
        this.inputName = this.getName() + cnt++
    }

    getData () {
        return {
            inputName: this.inputName,
            label: this.label,
            options: this.schema.options
        }
    }

    getRenderer () {
        return renderer
    }

    setValue (value) {
        if (value === undefined) {
            return
        }

        const isArray = Array.isArray(value)

        if (isArray) {
            value = value.map(v => {
                return (v === null || v === undefined) ? '' : '' + v
            })
        } else {
            value = (value === null || value === undefined) ? '' : '' + value
        }

        $(this.getElement()).find('input').each(function() {
            const v = this.value
            this.checked = (isArray && $.inArray(v, value)) || (v === value)
        })
    }

    getValue () {
        return $(this.getElement()).find('input:checked').get(0).value
    }
}

Radio.type = 'radio'

export default Radio
