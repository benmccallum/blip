module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    // 'plugin:vue/vue3-recommended'
  ],
  rules: {
    // override/add rules settings here, such as:
    "vue/script-indent": ["error", 2, {
      "baseIndent": 2,
      "switchCase": 0,
      "ignores": []
    }]
  }
}
