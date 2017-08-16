class UiPlugin {
    apply (form) {
        form.plugin('render', function() {
            const container = form.container
            const controls = form.controls

            form.applyPlugins('before-render-form', container)
            const formBody = form.applyPluginsWaterfall('form-wrapper', document.createElement('form'))

            controls.forEach(control => {
                const controlPanel = form.applyPluginsWaterfall('before-render-control', null, control) || document.createElement('div')
                formBody.appendChild(controlPanel)
                form.applyPlugins('render-control', control, controlPanel)
                // control.render(controlPanel)
                form.applyPlugins('after-render-control', formBody, control)
            })

            container.appendChild(formBody)
            form.applyPlugins('after-render-form', container, formBody)
        })

        form.plugin('before-render-control', function() {
            const panel = document.createElement('div')
            panel.className = 'form-group'
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

        form.plugin('set-value', function(value) {
            form.controls.forEach(control => {
                control.setValue(value[control.getName()])
            })
        })

        form.plugin('get-value', function() {
            return form.controls.map(control => {
                let value = control.getValue()
                let name = control.getName()

                let typeVal = typeof value
                // value = value === undefined ? '' : value

                if (typeVal === 'function') {
                    return {name, value: value.call(control)}
                } else {
                    return {name, value}
                }
            }).reduce((ret, data) => {
                ret[data.name] = data.value
                return ret
            }, {})
        })
    }
}

export default UiPlugin
