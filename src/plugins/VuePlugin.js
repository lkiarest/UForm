/**
 * for vue-based UI lib
 */

class VuePlugin {
    apply (form) {
        form.plugin('before-create', function() {
            this.vm = null
            this.formDataName = 'form' // default data model name
        })

        form.plugin('after-render-form', function(container, formBody) {
            // new vue component
            let FormVm = Vue.extend({
                template: formBody.outerHTML,
                data () {
                    return {
                         // init data model names
                        form: form.options.schema.reduce((ret, item) => {
                            ret[item.name] = ''
                            return ret
                        }, {})
                    }
                }
            })

            this.vm = new FormVm().$mount(container)
        })

        form.plugin('set-value', function(value) {
            this.vm.form = value
        })

        form.plugin('get-value', function() {
            return this.vm.form
        })
    }
}

export default VuePlugin
