/**
 * @interface IForm
 * interface of all basic forms
 */
import Tapable from 'tapable'

class IForm extends Tapable{
    constructor () {
        super()
    }

    init () {}
    setValue () {}
    getValue () {}
    validate () {}
    render () {}
    reset () {}
    destroy () {}
}

export default IForm
