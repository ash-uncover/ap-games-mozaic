export interface Plugin {
  name: string
  url: string
  dependencies: string[]

  defines?: PluginDefines
  provides?: PluginProvides
}

export interface PluginDefines {
  [key: string]: PluginDefine
}
export interface PluginDefine {
  properties: PluginDefineProperties
  attributes: PluginDefineAttributes
  viewers: PluginDefineViewers
}
export interface PluginDefineProperties {
  [key: string]: string
}
export interface PluginDefineAttributes {
  [key: string]: string
}
export interface PluginDefineViewers {
  [key: string]: PluginDefineViewer
}
export interface PluginDefineViewer {

}

export interface PluginProvides {
  [key: string]: PluginProvide | PluginProvide[]
}
export interface PluginProvide {
  name: string
  attributes: PluginProvideAttributes
  viewers: PluginProvideViewers
}
export interface PluginProvideAttributes {
  [key: string]: string | string[]
}
export interface PluginProvideViewers {
  [key: string]: PluginProvideViewer
}
export interface PluginProvideViewer {
  url: string
  type: 'iframe' | 'webcomponent' | 'component'
}
