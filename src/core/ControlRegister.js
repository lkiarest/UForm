/**
 * Register all control types
 */
import FormControl from './FormControl'

class ControlRegister {
    constructor () {
        this.controlTypes = {}
    }

    register (type, control) {
        if (!type) {
            console.error('register control type failed: no params')
            return
        }

        if (Object.getPrototypeOf(control).name !== FormControl.name) {
            console.error('register control type failed: control should be inherited of FormControl')
            return
        }

        const types = this.controlTypes
        if (types[type]) {
            console.warn(`type ${type} already registered`)
            return
        }

        types[type] = control
    }

    getControl (type) {
        return this.controlTypes[type] || null
    }
}

export default ControlRegister
