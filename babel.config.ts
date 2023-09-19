/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ConfigAPI } from '@babel/core'

export default function (api: ConfigAPI): { presets: string[] } {
  api.cache(true)

  return {
    presets: ['babel-preset-expo'],
  }
}
