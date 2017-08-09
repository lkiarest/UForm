/**
 * basic class of all kinds of forms
 */
import IForm from './IForm'
import FormControl from './FormControl'
import ControlRegister from './ControlRegister'
import SchemaPlugin from '../plugins/SchemaPlugin'
import RenderPlugin from '../plugins/RenderPlugin'

const controlReg = new ControlRegister()

class BasicForm extends IForm {
    constructor (container, options) {
        super()

        if (!container) {
            throw new Error('form should be created within a container !')
        }

        if (!options) {
            throw new Error('no form options specified !')
        }

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
        // register default plugins
        this.apply(BasicForm.UiLibPlugin, new SchemaPlugin(), new RenderPlugin())

        // user defined plugins
        const plugins = this.options.plugins
        if (plugins && plugins.length > 0) {
            this.apply.apply(this, plugins)
        }

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

/**
 * register control types
 * @param  {String|Array|Object} type    support register by an array, an object or by type/entity
 */
BasicForm.registerControl = function(type, control) {
    if (Array.isArray(type)) { // register controls as a list
        type.forEach(item => {
            item && BasicForm.registerControl(item.type, item.control)
        })

        return
    } else if (typeof type === 'object') {
        BasicForm.registerControl(Object.keys(type).map(t => ({
            type: t,
            control: type[t]
        })))

        return
    }

    controlReg.register(type, control)
}

BasicForm.Control = FormControl

export default BasicForm
