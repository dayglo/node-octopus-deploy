'use strict'

const logger = require('../utils/logger')
const octopus = require('../octopus-deploy')

const createReleaseAndDeploy = (releaseParams, deployParams) => {
  const { projectId, releaseVersion, releaseNotes, selectedPackages } = releaseParams
  const params = { projectId, version: releaseVersion, releaseNotes, selectedPackages }

  return octopus.releases.create(params)
    .then(release => {
      logger.info(`Created release '${release.id}'`)
      return octopus.deployments.create(release.id, deployParams)
    })
    .then(deployment => {
      logger.info(`Deployed '${deployment.id}'`)
      return deployment
    })
}

module.exports.execute = createReleaseAndDeploy
