'use strict'

const getProject = require('./get-project')
const getSelectedPackages = require('./get-selected-packages')
const logger = require('../utils/logger')
const octopus = require('../octopus-deploy')

const simpleCreateRelease = params => {
  const { projectSlugOrId, releaseVersion, releaseNotes } = params
  const packageVersion = params.packageVersion || releaseVersion

  let projectId

  return getProject.execute(projectSlugOrId)
    .then(project => {
      projectId = project.id

      return getSelectedPackages.execute(project.deploymentProcessId, packageVersion)
    })
    .then(selectedPackages => {
      const releaseParams = { projectId, version: releaseVersion, releaseNotes, selectedPackages }

      return octopus.releases.create(releaseParams)
    }).then(release => {
      logger.info(`Created release '${release.id}'`)
      return release
    })
}

module.exports = simpleCreateRelease
