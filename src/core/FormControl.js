/**
 * basic class of all form controls
 */
import IForm from './IForm'

class FormControl extends IForm {
    constructor (type, name) {
        super()
        this.type = type
        this.name = name
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

    setValue () {
        return this.value
    }
}

export default FormControl
