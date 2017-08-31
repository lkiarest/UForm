import VueControl from 'ui/VueControl.js'

const renderer = VueControl.makeRenderer(`
    <el-radio-group v-model="form.{{name}}" {{props}} {{events}}>
        {{#each options}}
            <el-radio
                label="{{name}}"
                name="{{../name}}"
                {{#if disabled}} :disabled='true'{{/if}}
            >
            </el-radio>
        {{/each}}
    </el-radio-group>
`)

class Radio extends VueControl {
    getData () { // options is used within renderer, so need more data
        let data = super.getData()
        data.options = this.schema.options // more data definition
        return data
    }

    getRenderer () {
        return renderer
    }

    allowedProps () {
        return {
            size: null,
            fill: null,
            textColor: null
        }
    }

    allowedEvents () {
        return ['change']
    }
}

Radio.type = 'radio'

export default Radio
