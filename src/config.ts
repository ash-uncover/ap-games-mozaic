import Logger from '@uncover/js-utils-logger'
const LOGGER = new Logger('CONFIG')

const CONFIG: {
  AP_GAMES_MOZAIC_PLUGIN: string
  AP_GAMES_MOZAIC_PUBLIC: string
  AP_GAMES_MOZAIC_ENVIRONMENT: string
} = {
  AP_GAMES_MOZAIC_PLUGIN: 'http://localhost:8083/plugin.json',
  AP_GAMES_MOZAIC_PUBLIC: '',
  AP_GAMES_MOZAIC_ENVIRONMENT: 'local',
}

// Load config from env
try {
  // This cannot be factorized since webpack simply replace the full process.env.[property] strings
  if (process.env.AP_GAMES_MOZAIC_PLUGIN) {
    CONFIG.AP_GAMES_MOZAIC_PLUGIN = process.env.AP_GAMES_MOZAIC_PLUGIN
  }
  if (process.env.AP_GAMES_MOZAIC_PUBLIC) {
    CONFIG.AP_GAMES_MOZAIC_PUBLIC = process.env.AP_GAMES_MOZAIC_PUBLIC
  }
  if (process.env.AP_GAMES_MOZAIC_ENVIRONMENT) {
    CONFIG.AP_GAMES_MOZAIC_ENVIRONMENT = process.env.AP_GAMES_MOZAIC_ENVIRONMENT
  }
} catch (error) {
  LOGGER.warn('Failed to load from process.env')
}

console.log('CONFIG')

Object.keys(CONFIG).forEach((confKey: string) => {
  // @ts-ignore
  console.log(` - ${confKey}: '${CONFIG[confKey]}'`)
})

export default CONFIG
