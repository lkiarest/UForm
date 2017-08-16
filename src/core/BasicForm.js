/**
 * basic class of all kinds of forms
 */
import IControl from './IControl'
import FormControl from './FormControl'
import ControlRegister from './ControlRegister'
import SchemaPlugin from '../plugins/SchemaPlugin'
import RenderPlugin from '../plugins/RenderPlugin'

const controlReg = new ControlRegister()

class BasicForm extends IControl {
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
                console.error('no control type:' + type)
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
        this.applyPlugins('render', this)
    }

    setValue (value) {
        this.applyPlugins('set-value', value)
    }

    getValue () {
        return this.applyPluginsWaterfall('get-value')
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
