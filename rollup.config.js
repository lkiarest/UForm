import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
    entry: 'src/index.js',
    format: 'umd',
    dest: 'dist/index.js',
    moduleName: 'UForm',
    plugins: [
        resolve({jsnext: true, main: true}),
        commonjs(),
        babel({
            exclude: 'node_modules/**'
        })
    ]
}
