/**
 * basic class of all form controls
 */
import IForm from './IForm'

class FormControl extends IForm {
    constructor (schema) {
        super()

        if (!schema) {
            throw Error('need schema info to create a form control')
        }

        this.schema = schema

        this.type = schema.type
        this.name = schema.name
        this.label = schema.label || ''
        this.elem = null
    }

    getType () {
        return this.type
    }

    getName () {
        return this.name
    }

    getValue () {
        return this.value
    }

    setValue (value) {
        this.value = value
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
}

export default FormControl
