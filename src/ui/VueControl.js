/**
 * @class VueControl
 * @description basic class of all vue-based controls
 */
import Handlebars from 'handlebars'
import FormControl from 'core/FormControl.js'

class VueControl extends FormControl {
    getData () {
        const props = this.allowedProps()
        const schema = this.schema
        const name = this.name

        if (!props) {
            console.warn('no props specified with control: ' + name)
            return {name, props: []}
        }

        if (schema) {
            Object.keys(props).forEach(key => {
                if (key in schema) {
                    props[key] = schema[key]
                }
            })
        }

        return {
            name,
            props: Object.keys(props).filter(key => {
                return props[key] !== null
            }).map(key => {
                const value = props[key]
                if (typeof value !== 'string') {
                    key = `:${key}`
                }

                return {key, value}
            })
        }
    }

    /**
     * define all allowed properties, to be override
     */
    allowedProps () {
        return null
    }
}

/**
 * make vue render function, process props
 */
VueControl.makeRenderer = (tmpl) => {
    tmpl = tmpl.replace('{{props}}', `
        {{#each props}}
        {{key}}="{{value}}"
        {{/each}}
    `)

    return Handlebars.compile(tmpl)
}

export default VueControl
