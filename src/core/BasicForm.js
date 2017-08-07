/**
 * basic class of all kinds of forms
 */
import IForm from './IForm'
import FormControl from './FormControl'
import SchemaPlugin from '../plugins/SchemaPlugin'
import RenderPlugin from '../plugins/RenderPlugin'

class BasicForm extends IForm {
    constructor (container, options) {
        super()

        if (!container) {
            throw new Error('Form should be created within a container !')
        }

        this.schema = null

        // all controls
        this.controls = []

        if (typeof container === 'string') { // 直接传入选择器或 dom 对象
            container = document.querySelector(container)
        }

        this.container = container
        this.options = options

        this.init()
    }

    /**
     * register default plugins and initialize
     */
    init () {
        // register plugins
        this.apply(new SchemaPlugin(), new RenderPlugin())

        /** create and render form view - without data bind */
        this.create()
    }

    /**
     * prepare form schema and start render
     */
    create () {
        const self = this

        self.applyPluginsAsyncWaterfall('schema', self.options.schema, function(err, value) {
            console.log('schema', value)
            if (err) {
                console.error('get schema failed ', err)
                return
            }

            self.schema = value
            this.applyPlugins('schema-loaded', value)

            self.render()
        })
    }

    addControls (control) {
        if (control instanceof FormControl) {
            this.controls.push(control)
        }
    }

    /**
     * render form controls
     */
    render () {
        this.applyPlugins('before-render', this.options)

        this.controls.forEach(control => {
            this.applyPlugins('render-control', this.options, control)
        })

        this.applyPlugins('after-render', this.options)
    }

    setValue (value) {
        this.controls.forEach(control => {
            control.setValue(value[control.getName()])
        })
    }

    getValue () {
        this.controls.map(control => {
            let value = control.getValue()
            let name = control.getName()

            let typeVal = typeof value
            value = value || ''

            if (typeVal === 'function') {
                return {name, value: value.call(control)}
            } else {
                return {name, value}
            }
        })
    }

    destroy () {
        this.applyPlugins('before-destroy')

        this.controls.map(control => {
            control.destroy()
        })

        this.controls = []
        this.container = null

        this.applyPlugins('after-destroy')
    }
}

export default BasicForm
