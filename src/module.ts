import { defu } from 'defu'
import { defineNuxtModule, addImportsDir, createResolver } from '@nuxt/kit'

export interface ModuleOptions {
  /**
   * Chisel Parse Server URL
   * @default process.env.PARSE_SERVER_URL
   * @example 'http://localhost:1337'
   * @type string
   */
  parseServerURL: string
  /**
   * Chisel Parse App ID
   * @default process.env.PARSE_APP_ID
   * @type string
   */
  parseAppId: string
  /**
   * Chisel Parse Site ID
   * @default process.env.PARSE_SITE_ID
   * @type string
   */
  siteId?: string
  /**
   * Chisel Parse Site Name ID
   * @default process.env.PARSE_SITE_NAME_ID
   * @example '__Forge'
   * @type string
   */
  siteNameId?: string
}


export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-chisel',
    compatibility: {
      nuxt: '^3.0.0-rc.14',
      bridge: false
    },
    configKey: 'chisel'
  },
  defaults: {
    parseServerURL: process.env.PARSE_SERVER_URL || 'http://localhost:1337',
    parseAppId: process.env.PARSE_APP_ID || '',
    siteId: process.env.PARSE_SITE_ID || '',
    siteNameId: process.env.PARSE_SITE_NAME_ID || ''
  },
  setup (options, nuxt) {
    // Default runtimeConfig
    nuxt.options.runtimeConfig.public.chisel = defu(nuxt.options.runtimeConfig.public.chisel, options)
    nuxt.options.runtimeConfig.chisel = defu(nuxt.options.runtimeConfig.chisel, options)

    const { resolve } = createResolver(import.meta.url)

    // Transpile runtime
    const runtimeDir = resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDir)

    // Add composables
    addImportsDir(resolve(runtimeDir, 'composables'))

  }
})
