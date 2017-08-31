/**
 * @class VueControl
 * @description basic class of all vue-based controls
 */
import Handlebars from 'handlebars'
import FormControl from 'core/FormControl.js'

/**
 * convert camel-case string to line case，
 * 'userName'  => 'user-name'
 */
Handlebars.registerHelper('linecase', function(options) {
    let str = options.fn(this)
    return str.replace(/[A-Z]/g, function(m) {
        return '-' + m.toLowerCase()
    })
})

class VueControl extends FormControl {
    getData () {
        const props = this.allowedProps()
        const schema = this.schema
        const name = this.name

        let events = this.allowedEvents() || []
        const $methods = this.schema.$events || {}

        events = events.filter(event => {
            return !!$methods[event]
        })

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
                this[key] = value
                return {key, value}
            }),
            events
        }
    }

    /**
     * define all allowed properties, to be override
     * @return {Object} properties name list
     */
    allowedProps () {
        return null
    }

    /**
     * defined all events, to be override
     * @return {Array} events name list
     */
    allowedEvents () {
        return null
    }
}

/**
 * make vue render function, process props
 */
VueControl.makeRenderer = (tmpl) => {
    tmpl = tmpl.replace('{{props}}', `
        {{#each props}}
        :{{#linecase}}{{key}}{{/linecase}}="controls.{{../name}}.{{key}}"
        {{/each}}
    `).replace('{{events}}', `
        {{#each events}}
        @{{#linecase}}{{this}}{{/linecase}}="{{../name}}{{this}}"
        {{/each}}
    `)

    return Handlebars.compile(tmpl)
}

export default VueControl
