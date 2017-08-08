module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  "env": {
    "browser": true //执行环境 浏览器
  },
  "globals": {
    "$": true,                                //jquery / zepto
    "define": true,                           //requirejs
    "require": true,                           //requirejs
    "axios": true,
    "UForm": true
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'indent': ['error', 4, { "SwitchCase": 1 }],
    "quotes": [2, "single", "avoid-escape"],
    "semi": [2, "never"],
    "eqeqeq": [1, "allow-null"],
    "new-cap": [1, { "newIsCap": false, "capIsNew": false }],
    "no-new": [0],
    "one-var": 1,//连续声明
    "space-before-function-paren": [0, "always"]//函数定义时括号前面要不要有空格
  }
}
