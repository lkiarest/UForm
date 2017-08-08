import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import alias from 'rollup-plugin-alias'
// import flow from 'rollup-plugin-flow'

const UILIB = process.env.UILIB

export default {
    entry: `src/${UILIB}.index.js`,
    format: 'umd',
    dest: `dist/${UILIB}/index.js`,
    moduleName: 'UForm',
    plugins: [
        resolve({jsnext: true, main: true}),
        commonjs(),
        // flow(),
        babel({
            exclude: 'node_modules/**'
        }),
        alias({
            core: 'src/core'
        })
    ]
}
