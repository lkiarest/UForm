import FormControl from 'core/FormControl.js'

class Input extends FormControl {
    constructor (schema) {
        super(schema)
        this.placeholder = schema.placeholder || ''
    }

    render(panel) {
        const dom = document.createElement('input')
        dom.className = 'form-control'
        dom.placeholder = this.placeholder

        const label = document.createElement('label')
        label.innerText = this.label

        panel.dataset['name'] = this.name
        panel.appendChild(label)
        panel.appendChild(dom)
    }
}

Input.type = 'input'

export default Input
