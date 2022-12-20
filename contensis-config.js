import { Client } from 'contensis-delivery-api'

let contensisConfig = {
  rootUrl: process.env.CMS_URL,
  accessToken: process.env.ACCESS_TOKEN,
  projectId: process.env.PROJECT_ID
}

export const client = Client.create(contensisConfig)
