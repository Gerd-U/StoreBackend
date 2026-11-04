import config from './config.json'

export interface Configuration {
  api: {
    URL: string
  }
}

export const configuration: Configuration = config