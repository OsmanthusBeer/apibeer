import type { UserConfig } from '@commitlint/types'

import { RuleConfigSeverity } from '@commitlint/types'

// refs: https://commitlint.js.org/#/reference-configuration?id=typescript
const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  // Add `wip`, `ui` type
  rules: {
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      ['wip', 'ui'].concat(['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']),
    ],
  },
}

export default Configuration
