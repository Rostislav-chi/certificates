import { defineFormKitConfig } from '@formkit/vue'
import { defaultConfig } from '@formkit/vue'
import { rootClasses } from './formkit.theme'

export default defineFormKitConfig({
  // rules: {},
  // locales: {},
  // etc. 
  config: {
    rootClasses,
  },
})