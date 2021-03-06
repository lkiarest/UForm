import VueControl from 'ui/VueControl.js'

const renderer = VueControl.makeRenderer(`
    <el-checkbox-group v-model="form.{{name}}" {{props}} {{events}}>
        {{#each options}}
            <el-checkbox
                label="{{name}}"
                name="{{../name}}"
                {{#if disabled}} :disabled='true'{{/if}}
            >
            </el-checkbox>
        {{/each}}
    </el-checkbox-group>
`)

class Checkbox extends VueControl {
    getData () { // options is used within renderer, so need more data
        let data = super.getData()
        data.options = this.schema.options // more data definition
        return data
    }

    getRenderer () {
        return renderer
    }

    allowedEvents () {
        return ['change']
    }
}

Checkbox.type = 'checkbox'

export default Checkbox
