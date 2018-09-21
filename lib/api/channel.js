'use strict'

module.exports = class Channel {
  constructor(client) {
    this._client = client
  }

  find(id) {
    const url = `/channels/${id}`
    return this._client.get(url)
  }

  create(data) {
    const url = '/channels'
    return this._client.post(url, data)
  }
}
