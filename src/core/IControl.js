/**
 * @interface IControl
 * interface of all forms and controls
 */
import Tapable from 'tapable'

class IControl extends Tapable {
    // constructor () {
    //     super()
    // }

    init () {}
    setValue (val) {}
    getValue () {}
    validate () {}
    render () {}
    reset () {}
    destroy () {}
}

export default IControl
