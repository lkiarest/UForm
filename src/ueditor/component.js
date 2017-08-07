import Ueditor from 'vueueditor'
import api from 'api'

UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl
UE.Editor.prototype.getActionUrl = function(action) {
    if (action === 'uploadimage' || action === 'uploadscrawl') {
        return api.IMG_UPLOAD
    } else {
        return this._bkGetActionUrl(action)
    }
}

export default Vue.extend({
    data: () => ({
        content: '',
        editorOpts: {
            initialFrameHeight: 220,
            toolbars: [[
                'fullscreen', 'source', '|', 'undo', 'redo', '|',
                'bold', 'italic', 'underline', 'fontborder', 'removeformat', 'formatmatch', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|', 'indent', '|',
                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                'link', 'unlink', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|', 'simpleupload', '|',
                'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts'
            ]],
            maximumWords: MAX_LEN,
            serverUrl: api.IMG_UPLOAD, // 图片上传路径
            imageActionName: 'uploadimage',
            imageUrlPrefix: location.origin + api.IMG_URL// 图片访问路径
        }
    }),
    methods: {
        getValue () {
            let noticeContent = this.$refs.editor.getContent()
            let count = this.$refs.editor.getContentLength(true)

            return {noticeContent, count}
        },
        setValue (val) {
            // console.log('set files', val)
            if (!val) {
                return
            }

            this.content = val.noticeContent
        }
    },
    components: {Ueditor}
})