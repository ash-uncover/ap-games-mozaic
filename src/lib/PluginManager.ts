import Logger, { LogLevels } from '@uncover/js-utils-logger'
import {
  Plugin,
  PluginDefine,
  PluginDefineAttributes,
  PluginDefines,
  PluginProvide,
  PluginProvideAttributes,
  PluginProvides,
  PluginProvideViewers
} from './PluginDefintionModel'

interface Plugins {
  [key: string]: Plugin
}

interface PluginDefinitions {
  [key: string]: PluginDefinition
}
interface PluginDefinition {
  properties: PluginDefinitionProperties
  attributes: PluginDefinitionAttributes
  viewers: PluginDefinitionViewers
}
interface PluginDefinitionProperties {
  [key: string]: string
}
interface PluginDefinitionAttributes {
  [key: string]: PluginDefinitionAttribute
}
interface PluginDefinitionAttribute {
  type: string
  mandatory: boolean
  array: boolean
}
interface PluginDefinitionViewers {
  [key: string]: PluginDefinitionViewer
}
interface PluginDefinitionViewer {

}

interface PluginProviders {
  [key: string]: PluginProvider[]
}
interface PluginProvider extends PluginProvide {
  plugin: string
}

const LOGGER = new Logger('PluginManager', LogLevels.DEBUG)

const plugins: Plugins = {}
const definitions: PluginDefinitions = {}
const providers: PluginProviders = {}

export const fetchPlugin = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: new Headers()
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(`[fetchPlugin] Failed to fetch plugin from ${url}: ${error}`)
  }
}

export const checkPlugin = (data: Plugin) => {
  if (!data) {
    throw new Error('[checkPlugin] plugin information is not defined')
  }
  if (!data.name) {
    throw new Error('[checkPlugin] plugin name is missing')
  }
  if (!data.url) {
    throw new Error('[checkPlugin] plugin url is missing')
  }

  if (!data.dependencies) {
    data.dependencies = []
  }
  if (!data.defines) {
    data.defines = {}
  }
  if (!data.provides) {
    data.provides = {}
  }
}

export const loadPluginDefines = (plugin: Plugin) => {
  const defines: PluginDefines = plugin.defines
  Object.keys(defines).forEach((defineId: string) => {
    const definitionId = `${plugin.name}/${defineId}`
    if (definitions[definitionId]) {
      LOGGER.warn(`Define '${definitionId}' from '${plugin.url}' already registered from '${plugins[plugin.name].url}'`)
    } else {
      loadPluginDefine(plugin, defineId)
    }
  })
}
export const loadPluginDefine = (plugin: Plugin, defineId: string) => {
  const definitionId = `${plugin.name}/${defineId}`
  if (definitions[definitionId]) {
    LOGGER.warn(`Define '${definitionId}' from '${plugin.url}' already registered from '${plugins[plugin.name].url}'`)
  } else {
    const define = plugin.defines[defineId]
    definitions[definitionId] = {
      ...define,
      attributes: loadPluginDefineAttributes(define.attributes)
    }
  }
}
export const loadPluginDefineAttributes = (attributes: PluginDefineAttributes) => {
  return Object.keys(attributes).reduce((acc, attributeId) => {
    let attributeName = attributeId
    let attributeType = attributes[attributeId]
    let mandatory = true
    let array = false
    if (attributeName.endsWith('?')) {
      mandatory = false
      attributeName = attributeName.substring(0, attributeName.length - 1)
    }
    if (attributeType.endsWith('[]')) {
      array = true
      attributeType = attributeType.substring(0, attributeType.length - 2)
    }
    acc[attributeName] = {
      type: attributeType,
      mandatory,
      array,
    }
    return acc
  }, {})
}

export const loadPluginProvides = (plugin: Plugin) => {
  const provides: PluginProvides = plugin.provides
  Object.keys(provides).forEach((provideId: string) => {
    if (!definitions[provideId]) {
      LOGGER.warn(`Provide '${provideId}' from '${plugin.url}' is not defined`)
    } else {
      const provide: PluginProvide | PluginProvide[] = provides[provideId]
      providers[provideId] = providers[provideId] || []
      if (Array.isArray(provide)) {
        provide.forEach((prov) => loadPluginProvide(plugin, provideId, prov))
      } else {
        loadPluginProvide(plugin, provideId, provide)
      }
    }
  })
}
export const loadPluginProvide = (plugin: Plugin, provideId: string, provide: PluginProvide) => {
  const provider: PluginProvider = {
    plugin: plugin.name,
    name: provide.name,
    attributes: loadPluginProvideAttributes(plugin, provideId, provide.attributes),
    viewers: loadPluginProvideViewers(plugin, provideId, provide.viewers),
  }
  providers[provideId].push(provider)
}

export const loadPluginProvideAttributes = (
  plugin: Plugin,
  provideId: string,
  attributes: PluginProvideAttributes
) => {
  const attributeTypes = definitions[provideId].attributes
  return Object.keys(attributes).reduce((acc, attributeId) => {
    const attributeType = attributeTypes[attributeId]
    const attributeValue = attributes[attributeId]
    console.log(attributeId + ' - ' + JSON.stringify(attributeType))
    switch (attributeType.type) {
      case 'url': {
        if (attributeType.array && Array.isArray(attributeValue)) {
          acc[attributeId] = attributeValue.map((value) => `${plugin.url}${value}`)
        } else {
          acc[attributeId] = `${plugin.url}${attributeValue}`
        }
        break
      }
      default: {
        acc[attributeId] = attributeValue
        break
      }
    }
    return acc
  }, {})
}
export const loadPluginProvideViewers = (
  plugin: Plugin,
  provideId: string,
  viewers: PluginProvideViewers
) => {
  return { ...viewers }
}

export const loadPluginDependencies = (plugin: Plugin) => {
  return plugin.dependencies.map((dependency: string) => loadPluginInternal(dependency, false))
}

export const loadPluginInternal = async (url: string, master: boolean) => {
  try {
    const data = await fetchPlugin(url)
    checkPlugin(data)
    if (plugins[data.name]) {
      LOGGER.warn(`Plugin '${data.name}' from '${data.url}' already registered from '${plugins[data.name].url}'`)
      // We dont process anything to prevent cyclic loading
      return Promise.resolve()
    }
    plugins[data.name] = data
    loadPluginDefines(data)
    loadPluginProvides(data)
    const dependencyLoaders = loadPluginDependencies(data)
    await Promise.all(dependencyLoaders)

  } catch (error) {
    LOGGER.warn(`Failed to load plugin from '${url}'`)
    LOGGER.warn(String(error))
  }
}

export class PluginManager {
  static async loadPlugin(url: string) {
    await loadPluginInternal(url, true)
  }
  static get plugins() {
    return plugins
  }
  static get definitions() {
    return definitions
  }
  static get providers() {
    return providers
  }

  static getProviders(entity: string) {
    return providers[entity]
  }
}