'use strict'

const getProject = require('./get-project')
const logger = require('../utils/logger')
const octopus = require('../octopus-deploy')

const createChannel = params => {
  const { projectSlugOrId, channelName} = params

  return getProject.execute(projectSlugOrId)
    .then(project => {
      projectId = project.id

      const channelParams = {channelName, projectId}
    
      return octopus.channels.create(channelParams)
      
    }).then(channel => {
      logger.info(`Created channel '${channel.id}'`)
      return channel
    })
}

module.exports = createChannel
