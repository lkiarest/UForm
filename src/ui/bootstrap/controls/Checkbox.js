import Handlebars from 'handlebars'
import FormControl from 'core/FormControl.js'

const renderer = Handlebars.compile(`
    <label class="checkbox-inline">
        <input type="checkbox"> {{label}}
    </label>
`)

class Checkbox extends FormControl {
    getData () {
        return {
            label: this.label
        }
    }

    getRenderer () {
        return renderer
    }

    setValue (value) {
        $(this.getElement()).find('input[type=checkbox]').prop('checked', !!value)
    }

    getValue () {
        return !!$(this.getElement()).find('input[type=checkbox]').prop('checked')
    }
}

Checkbox.type = 'checkbox'

export default Checkbox
