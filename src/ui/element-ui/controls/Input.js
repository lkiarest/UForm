import VueControl from 'ui/VueControl.js'

const renderer = VueControl.makeRenderer(`
    <el-input v-model="form.{{name}}" {{props}}></el-input>
`)

class Input extends VueControl {
    allowedProps () {
        return {
            type: 'text',
            maxlength: null, // 可选属性设置为 null
            disabled: false,
            inputType: 'text',
            placeholder: null
        }
    }

    getRenderer () {
        return renderer
    }
}

Input.type = 'input'

export default Input
