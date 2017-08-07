/**
 * 特殊字符验证
 */

WIS_EMAP_INPUT.extendValidateRule({
    name: 'notSpecialChar',
    alertText: '输入文字不能包含特殊字符',
    func(val) {
        let pattern = /[\!\$\%\^\&\*]/
        if (!pattern.test(val)) {
            return true
        } else {
            return false
        }
    }
})
