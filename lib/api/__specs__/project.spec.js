'use strict'

const BPromise = require('bluebird')
const { expect } = require('chai')

const OctopusClient = require('../../utils/octopus-client')
const Project = require('../project')
const createProject = require('../../../test/mocks/project')
const createProjectRelease = require('../../../test/mocks/project-release')
const sandbox = require('../../../test/sandbox')

const client = new OctopusClient(require('../../../test/client-config'))
const subject = new Project(client)

describe('api/project', () => {
  describe('#find', () => {
    it('finds a project by id', () => {
      const project = createProject()
      sandbox.stub(client, 'get').callsFake(() => BPromise.resolve(project))

      return subject.find(project.id).then(actual => {
        expect(actual).to.eql(project)
        return expect(client.get).to.be.calledWith(`/projects/${project.id}`)
      })
    })

    it('finds a project by slug', () => {
      const project = createProject({ slug: 'abathur' })
      sandbox.stub(client, 'get').callsFake(() => BPromise.resolve(project))

      return subject.find(project.slug).then(actual => {
        expect(actual).to.eql(project)
        return expect(client.get).to.be.calledWith(`/projects/${project.slug}`)
      })
    })
  })

  describe('#getReleasesByProject', () => {
    it('returns releases', () => {
      const projectId = 'hanamura'
      const projectRelease = createProjectRelease({ items: [{ projectId }] })
      sandbox.stub(client, 'get').callsFake(() => BPromise.resolve([projectRelease]))

      return subject.getReleaseByProject(projectId).then(actual => {
        expect(actual).to.eql([projectRelease])
        return expect(client.get).to.be.calledWith(`/projects/${projectId}/releases`)
      })
    })
  })

  describe('#getReleasesByProjectAndVersion', () => {
    it('returns releases', () => {
      const projectId = 'the-nexus'
      const version = '2.0'
      const projectRelease = createProjectRelease({ items: [{ projectId, version }] })
      sandbox.stub(client, 'get').callsFake(() => BPromise.resolve(projectRelease))

      return subject.getReleaseByProjectAndVersion(projectId, version).then(actual => {
        expect(actual).to.eql(projectRelease)
        return expect(client.get).to.be.calledWith(`/projects/${projectId}/releases/${version}`)
      })
    })
  })
})
