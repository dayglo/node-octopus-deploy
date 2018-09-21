'use strict'

const Deployment = require('./api/deployment')
const Environment = require('./api/environment')
const Machine = require('./api/machine')
const OctopusClient = require('./utils/octopus-client')
const Package = require('./api/package')
const Project = require('./api/project')
const Process = require('./api/process')
const Release = require('./api/release')
const Variable = require('./api/variable')
const Channel = require('./api/channel')

class OctopusDeploy {
  constructor() {
    this._client = null
  }

  init(config) {
    if (this._client)
      throw new Error('The octopus api client has already been initialized')
    this._client = new OctopusClient(config)
  }

  close() {
    this._client = null
    this._deployments = null
    this._environments = null
    this._machines = null
    this._packages = null
    this._processes = null
    this._projects = null
    this._releases = null
    this._variables = null
    this._channels = null
  }

  _validateClient() {
    if (!this._client)
      throw new Error(`The configuration for the api must be set by calling 'init' before making requests`)
  }

  get deployments() {
    this._validateClient()
    if (!this._deployments)
      this._deployments = new Deployment(this._client)

    return this._deployments
  }
  get environments() {
    this._validateClient()
    if (!this._environments)
      this._environments = new Environment(this._client)

    return this._environments
  }
  get machines() {
    this._validateClient()
    if (!this._machines)
      this._machines = new Machine(this._client)

    return this._machines
  }
  get packages() {
    this._validateClient()
    if (!this._packages)
      this._packages = new Package(this._client)

    return this._packages
  }
  get processes() {
    this._validateClient()
    if (!this._processes)
      this._processes = new Process(this._client)

    return this._processes
  }
  get projects() {
    this._validateClient()
    if (!this._projects)
      this._projects = new Project(this._client)

    return this._projects
  }
  get releases() {
    this._validateClient()
    if (!this._releases)
      this._releases = new Release(this._client)

    return this._releases
  }
  get variables() {
    this._validateClient()
    if (!this._variables)
      this._variables = new Variable(this._client)

    return this._variables
  }

  get channels() {
    this._validateClient()
    if (!this._channels)
      this._channels = new Channel(this._client)

    return this._channels
  }
}

module.exports = new OctopusDeploy()
