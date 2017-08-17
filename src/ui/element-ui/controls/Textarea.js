import VueControl from 'ui/VueControl.js'

const renderer = VueControl.makeRenderer(`
    <el-input type='textarea' v-model="form.{{name}}"{{props}}></el-input>
`)

class Textarea extends VueControl {
    allowedProps () {
        return {
            maxlength: null, // 可选属性设置为 null
            disabled: false,
            inputType: 'text',
            placeholder: null,
            rows: 3 // 行数
        }
    }

    getRenderer () {
        return renderer
    }
}

Textarea.type = 'textarea'

export default Textarea
