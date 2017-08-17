import VueControl from 'ui/VueControl.js'

const renderer = VueControl.makeRenderer(`
    <el-select v-model="form.{{name}}" {{props}}>
        <el-option
            v-for="item in controls.{{name}}.options"
            :key='item.value'
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
        </el-option>
    </el-select>
`)

class Select extends VueControl {
    constructor (schema) {
        super(schema)
        this.options = schema.options
    }

    allowedProps () {
        return {
            placeholder: '请选择',
            size: null,
            loading: false,
            disabled: false,
            multiple: false, // 可多选
            filterable: false, // 可搜索
            remote: false, // 是否远程搜索
            remoteMethod: null // 远程搜索方法
        }
    }

    getData () {
        let data = super.getData()
        data.options = this.options // more data definition
        return data
    }

    getRenderer () {
        return renderer
    }
}

Select.type = 'select'

export default Select
