/**
 * basic class of all kinds of forms
 */
import IForm from './IForm'
import ControlRegister from './ControlRegister'
// import UiPlugin from '../plugins/UiPlugin'
import SchemaPlugin from '../plugins/SchemaPlugin'
import RenderPlugin from '../plugins/RenderPlugin'

class BasicForm extends IForm {
    constructor (container, options) {
        super()

        if (!container) {
            throw new Error('Form should be created within a container !')
        }

        if (!options) {
            throw new Error('no options specified !')
        }

        // this.schemas = null

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
        this.controlReg = new ControlRegister()

        // register plugins
        const uiLibPlugin = BasicForm.UiLib
        this.apply(new uiLibPlugin(), new SchemaPlugin(), new RenderPlugin())

        /** register control types */
        const controlReg = this.controlReg
        this.applyPlugins('register-controls', function(type, control) {
            controlReg.register(type, control)
        })

        /** create and render form view - without data bind */
        this.create()
    }

    /**
     * prepare form schema and start render
     */
    create () {
        const self = this

        self.applyPlugins('before-create', self)

        self.applyPluginsAsyncWaterfall('schema', self.options.schema, function(err, value) {
            if (err) {
                console.error('get schema failed ', err)
                return
            }

            self.applyPlugins('schema-loaded', value)

            if (value && value.length > 0) { // build from schema list
                self.buildControls(value)
                self.render()
            }
        })
    }

    /**
     * build controls list from schema
     */
    buildControls (schemaList) {
        const controlReg = this.controlReg

        schemaList.forEach(schema => {
            const type = schema.type
            let controlCls = controlReg.getControl(type)

            if (!controlCls) {
                console.error('')
            } else {
                this.addControl(new controlCls(schema))
            }
        })
    }

    addControl (control) {
        this.controls.push(control)
    }

    /**
     * render form controls
     */
    render () {
        const container = this.container,
            controls = this.controls

        this.applyPlugins('before-render-form', container)
        const formBody = this.applyPluginsWaterfall('form-wrapper', document.createElement('form'))

        controls.forEach(control => {
            const controlPanel = this.applyPluginsWaterfall('before-render-control', null, control) || document.createElement('div')
            formBody.appendChild(controlPanel)
            // this.applyPlugins('render-control', control, controlPanel)
            control.render(controlPanel)
            this.applyPlugins('after-render-control', formBody, control)
        })

        container.appendChild(formBody)
        this.applyPlugins('after-render-form', container)
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
