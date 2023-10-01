import type { UserConfig } from '@commitlint/types'

// TODO: Custom some rules
// import { RuleConfigSeverity } from '@commitlint/types'

// refs: https://commitlint.js.org/#/reference-configuration?id=typescript
const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
}

export default Configuration
