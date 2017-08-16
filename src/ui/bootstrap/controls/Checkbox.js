import Handlebars from 'handlebars'
import FormControl from 'core/FormControl.js'

const renderer = Handlebars.compile(`
    {{#if label}}<label>{{label}}</label>{{/if}}
    {{#each options}}
    <div class='checkbox'>
        <label type="checkbox">
            <input type="checkbox" value="{{value}}">
            {{name}}
        </label>
    </div>
    {{/each}}
`)

class Checkbox extends FormControl {
    getData () {
        return {
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
        }

        $(this.getElement()).find('input').each(function() {
            const v = this.value
            this.checked = (isArray && $.inArray(v, value)) || (v === value)
        })
    }

    getValue () {
        return $(this.getElement()).find('input:checked').map(function() {
            return this.value
        }).get()
    }
}

Checkbox.type = 'checkbox'

export default Checkbox
