'use strict'

const BPromise = require('bluebird')
const { expect } = require('chai')
const sinon = require('sinon')

const subject = require('../get-project').execute
require('../../../test/init-api')
const octopus = require('../../octopus-deploy')
const createProject = require('../../../test/mocks/project')

describe('commands/get-project', () => {
  const project = createProject()

  afterEach(() => {
    octopus.projects.find.restore()
  })

  describe('when the project has required dependencies', () => {
    it('returns the project', () => {
      sinon.stub(octopus.projects, 'find').callsFake(() => BPromise.resolve(project))

      return subject(project.id).then(actual => {
        expect(actual).to.eql(project)
        return expect(octopus.projects.find).to.be.calledWith(project.id)
      })
    })
  })

  describe('when the project is missing a variable set', () => {
    it('rejects with an error', () => {
      const invalidProject = Object.assign({}, project, { variableSetId: null })
      sinon.stub(octopus.projects, 'find').callsFake(() => BPromise.resolve(invalidProject))

      return subject(project.id).catch(err => {
        expect(err.message).to.be.eql(`VariableSetId is not set on project '${project.id}'`)
      })
    })
  })

  describe('when the project is missing a deployment process', () => {
    it('rejects with an error', () => {
      const invalidProject = Object.assign({}, project, { deploymentProcessId: null })
      sinon.stub(octopus.projects, 'find').callsFake(() => BPromise.resolve(invalidProject))

      return subject(project.id).catch(err => {
        expect(err.message).to.eql(`DeploymentProcessId is not set on project '${project.id}'`)
      })
    })
  })
})
