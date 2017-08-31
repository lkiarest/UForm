import VueControl from 'ui/VueControl.js'

const renderer = VueControl.makeRenderer(`
    <el-select v-model="form.{{name}}" {{props}} {{events}}>
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
            disabled: false,
            multiple: false, // 可多选
            filterable: false, // 可搜索
            remote: false, // 是否远程搜索
            remoteMethod: null, // 远程搜索方法
            loading: false,
            loadingText: '加载中',
            noMatchText: '无匹配数据',
            noDataText: '无数据'
        }
    }

    allowedEvents () {
        return ['change', 'visibleChange']
    }

    getRenderer () {
        return renderer
    }
}

Select.type = 'select'

export default Select
