/**
 * basic class of all form controls
 */
import IControl from './IControl'

class FormControl extends IControl {
    constructor (schema) {
        super()

        if (!schema) {
            throw Error('need schema info to create a form control')
        }

        this.schema = schema

        this.type = schema.type
        this.name = schema.name
        this.label = schema.label || ''
        // this.disabled = schema.disabled || false
        this.elem = null
    }

    getType () {
        return this.type
    }

    getName () {
        return this.name
    }

    getValue () {
        throw new Error('user defined control should override getValue method')
    }

    setValue (value) {
        throw new Error('user defined control should override setValue method')
    }

    getElement () {
        return this.elem
    }

    setElement (elem) {
        this.elem = elem
    }

    getSchema () {
        return this.schema
    }

    // get data to fill template
    getData () {
    }

    // get render help function
    getRenderer () {}

    destroy () {
        this.elem && this.elem.remove()
        this.elem = null
        this.schema = null
    }
}

export default FormControl
