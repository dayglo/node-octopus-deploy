'use strict'

module.exports = class Project {
  constructor(client) {
    this._client = client
  }

  find(idOrSlug) {
    const url = `/projects/${idOrSlug}`
    return this._client.get(url)
  }

  getReleaseByProject(id) {
    const url = `/projects/${id}/releases`
    return this._client.get(url)
  }

  getReleaseByProjectAndVersion(id, version) {
    const url = `/projects/${id}/releases/${version}`
    return this._client.get(url)
  }

  getChannelsByProject(id) {
    const url = `/projects/${id}/channels`
    return this._client.get(url)
  }

  getChannelByProjectAndId(id, chanId) {
    const url = `/projects/${id}/channels/${chanId}`
    return this._client.get(url)
  }

}
