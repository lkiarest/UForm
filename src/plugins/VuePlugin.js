/**
 * for vue-based UI lib
 */

const noop = function() {}

class VuePlugin {
    apply (form) {
        form.plugin('before-create', function() {
            this.vm = null
            this.formDataName = 'form' // default data model name
        })

        form.plugin('form-wrapper', function(wrapper) {
            wrapper.setAttribute('v-model', this.formDataName)
            return wrapper
        })

        form.plugin('after-render-form', function(container, formBody) {
            // prepare events handler
            const methods = {}

            form.controls.forEach(control => {
                let name = control.name
                let events = control.schema.$events
                let usedEvents = control.getData().events

                if (usedEvents && usedEvents.length > 0) {
                    usedEvents.forEach(ae => {
                        let methodName = name + ae
                        if (!methods[methodName]) {
                            let callback = events[ae]
                            methods[methodName] = (function() {
                                return function() {
                                    let args = Array.prototype.slice.call(arguments)
                                    args = args.concat([control, form])
                                    return callback.apply(this, args)
                                }
                            })()
                        }
                    })
                }
            })

            // new vue component
            let FormVm = Vue.extend({
                template: formBody.outerHTML,
                data () {
                    return {
                        // controls
                        controls: form.controls.reduce((ret, item) => {
                            const name = item.name
                            ret[name] = item

                            // inject context into all methods
                            Object.keys(item).forEach(key => {
                                let value = item[key]
                                if (typeof value === 'function') {
                                    item[key] = (function() {
                                        return function() {
                                            let context = this
                                            let args = [].slice.call(arguments)
                                            args = args.concat([form.vm, item, form.vm.form])
                                            return value.apply(context, args)
                                        }
                                    })()
                                }
                            })

                            return ret
                        }, {}),
                         // init data model names
                        form: form.options.schema.reduce((ret, item) => {
                            ret[item.name] = ''
                            return ret
                        }, {})
                    }
                },
                methods
            })

            this.vm = new FormVm().$mount(container)
        })

        form.plugin('set-value', function(value) {
            Object.assign(this.vm.form, value)
        })

        form.plugin('get-value', function() {
            return this.vm.form
        })
    }
}

export default VuePlugin
