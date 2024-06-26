module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [2, 'always', ['feat', 'fix', 'test', 'chore']],
      'scope-empty': [2, 'never'],
    },
  };
  