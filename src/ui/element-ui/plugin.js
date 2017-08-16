import VuePlugin from 'plugins/VuePlugin.js'

class UiPlugin {
    apply (form) {
        // first use VuePlugin
        form.apply(new VuePlugin())

        form.plugin('render', function() {
            const container = form.container
            const controls = form.controls

            form.applyPlugins('before-render-form', container)
            const formBody = form.applyPluginsWaterfall('form-wrapper', document.createElement('el-form'))

            controls.forEach(control => {
                const controlPanel = form.applyPluginsWaterfall('before-render-control', null, control) || document.createElement('div')
                formBody.appendChild(controlPanel)
                form.applyPlugins('render-control', control, controlPanel)
                form.applyPlugins('after-render-control', formBody, control)
            })

            form.applyPlugins('after-render-form', container, formBody)
        })

        form.plugin('form-wrapper', function(wrapper) {
            wrapper.setAttribute('v-model', this.formDataName)
            return wrapper
        })

        form.plugin('before-render-control', function(rendered, control) {
            const panel = document.createElement('el-form-item')
            const label = control.label

            if (label) {
                const labelWidth = form.options.labelWidth || '100'
                panel.setAttribute('label', label)
                panel.setAttribute('label-width', labelWidth + 'px')
            }

            return panel
        })

        form.plugin('render-control', function(control, panel) {
            panel.dataset['name'] = control.name
            let renderer = control.getRenderer()

            if (renderer && typeof renderer === 'function') {
                panel.innerHTML = renderer(control.getData())
            }

            control.setElement(panel)
        })
    }
}

export default UiPlugin
